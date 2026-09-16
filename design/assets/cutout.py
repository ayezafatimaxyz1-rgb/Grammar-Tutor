from PIL import Image
from collections import deque
import os, sys

def cutout(src, out, target_h=820, tol=14, feather=20, quality=80, erode=0):
    im = Image.open(src).convert("RGBA")
    w, h = im.size
    px = im.load()
    corners = [px[0,0], px[w-1,0], px[0,h-1], px[w-1,h-1]]
    bg = tuple(sum(c[i] for c in corners)//4 for i in range(3))

    def dist(p):
        return max(abs(p[0]-bg[0]), abs(p[1]-bg[1]), abs(p[2]-bg[2]))

    seen = bytearray(w*h)
    q = deque()
    def maybe(x, y):
        i = y*w+x
        if seen[i]: return
        if dist(px[x,y]) <= tol:
            seen[i] = 1; q.append((x,y))
    for x in range(w): maybe(x,0); maybe(x,h-1)
    for y in range(h): maybe(0,y); maybe(w-1,y)
    while q:
        x,y = q.popleft()
        for dx,dy in ((1,0),(-1,0),(0,1),(0,-1)):
            nx,ny = x+dx, y+dy
            if 0 <= nx < w and 0 <= ny < h: maybe(nx,ny)

    # Some source art carries a light rim around the product. Feathering cannot
    # remove it because those pixels sit far from the background colour, so the
    # transparent region is grown inward instead.
    for _ in range(erode):
        grow = []
        for y in range(h):
            b = y*w
            for x in range(w):
                if seen[b+x]: continue
                for dx, dy in ((1,0),(-1,0),(0,1),(0,-1)):
                    nx, ny = x+dx, y+dy
                    if 0 <= nx < w and 0 <= ny < h and seen[ny*w+nx]:
                        grow.append(b+x); break
        for i in grow: seen[i] = 1

    cut = sum(seen)
    # feather the anti-aliased ring the flood fill leaves behind, so pale jackets
    # keep their edge but dark ones lose the white halo
    edge = []
    for y in range(h):
        b = y*w
        for x in range(w):
            if seen[b+x]: continue
            for dx,dy in ((1,0),(-1,0),(0,1),(0,-1)):
                nx,ny = x+dx,y+dy
                if 0 <= nx < w and 0 <= ny < h and seen[ny*w+nx]:
                    edge.append((x,y)); break
    for x,y in edge:
        d = dist(px[x,y])
        if d < feather:
            r,g,bl,a = px[x,y]
            px[x,y] = (r,g,bl,int(255*d/feather))
    for y in range(h):
        b = y*w
        for x in range(w):
            if seen[b+x]:
                r,g,bl,a = px[x,y]; px[x,y] = (r,g,bl,0)

    im = im.crop(im.getbbox())
    ratio = target_h/im.size[1]
    im = im.resize((max(1,round(im.size[0]*ratio)), target_h), Image.LANCZOS)
    im.save(out, "WEBP", quality=quality, method=6)
    return bg, cut*100//(w*h), im.size, os.path.getsize(out)
