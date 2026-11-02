/* =====================================================================
   LESSON TEMPLATE KIT
   A lesson file pushes a function that returns a short spec. T(spec)
   turns it into full board steps:
     pictures (custom drawings) → worked examples → mistake board → summary.
   Specs are functions because layout needs the handwriting font loaded.
   ===================================================================== */
const SPECS=[];
function nsSteps(L){L.steps.forEach((st,i)=>{const ns='s'+(i+1)+'_',f=x=>x&&typeof x==='string'&&x!=='all'?ns+x:x;
  st.actions.forEach(a=>{if(a.id)a.id=ns+a.id;if(a.target)a.target=ns+a.target;if(Array.isArray(a.targets))a.targets=a.targets.map(f)});st.explain.forEach(l=>l.cue=ns+l.cue)});return L}
const tokW=(t,s)=>t&&t.n!==undefined?fracW(t.n,t.d,s):measure(typeof t==='object'?t.t:String(t),s);
const exprW=(toks,s)=>toks.reduce((a,t)=>a+tokW(t,s),0)+.32*s*(toks.length-1);
function fitSize(t,s,maxW,wt=400){while(s>13&&measure(t,s,wt)>maxW)s--;return s}
const fr=(n,d,ink)=>({n,d,ink});
function wseqC(id,cx,y,parts,o={}){const sz=o.size||30,w=parts.reduce((a,p)=>a+measure(p,sz,700),0);return wseq(id,cx-w/2,y,parts,o)}
const nm=v=>v<0?'−'+Math.abs(v):String(v);
/* one line of working: a string, or a row of tokens with fractions */
function LN(id,cx,ym,c,o={}){const maxW=o.maxW||900;let s=o.size||32;
  if(typeof c==='string'){s=fitSize(c,s,maxW,o.weight||400);return [W(id,cx,ym+.32*s,c,{size:s,anchor:'middle',ink:o.ink,weight:o.weight,sync:o.sync,dur:o.dur})]}
  while(s>14&&exprW(c,s)>maxW)s--;return expr(id,cx,ym,c,{size:s,center:true,ink:o.ink,sync:o.sync})}
/* a question: the right answer first, then [text, misunderstanding tag, why] for each wrong one */
function Q(q,ok,...wr){const opts=[{t:ok[0],ok:true,why:ok[1]},...wr.map(w=>({t:w[0],tag:w[1],why:w[2]}))],k=hash(q)%opts.length;return {q,options:opts.slice(k).concat(opts.slice(0,k))}}

function exStep(e,i){const acts=[ER('er')],ex=[],qs=e.qSize||28;
  const ql=wrapText('q',40,64,e.q,880,{size:qs,lh:qs*1.3});acts.push(...ql);ex.push({cue:'q',t:e.say||('**Question:** '+e.q)});
  if(e.acts){acts.push(...e.acts);(e.ax||[]).forEach(([c,t])=>ex.push({cue:c,t}))}
  const qb=64+(ql.length-1)*qs*1.3,y0=e.y0||(qb+66),cx=e.cx||480,maxW=e.maxW||880,n=e.lines.length,gap=n>1?Math.min(e.gap||74,(566-y0)/(n-1)):0,s=e.size||Math.min(32,Math.max(20,Math.round((gap||64)*.48)));
  e.lines.forEach(([c,x,ink],j)=>{acts.push(...LN('l'+j,cx,y0+j*gap,c,{size:s,maxW,ink:ink||(j===n-1&&!e.noAns?'accent2':'main')}));if(x)ex.push({cue:'l'+j,t:x})});
  return {title:e.title||`Worked example ${i+1}`,actions:acts,explain:ex,check:e.check}}
function misStep(m){const acts=[ER('er'),D('dv',{kind:'line',x1:480,y1:36,x2:480,y2:340},{ink:'muted',sw:1.6,dur:400}),
    W('mL',240,70,'The mistake',{size:28,anchor:'middle',ink:'trouble',weight:700}),D('mX',{kind:'cross',x:240,y:108,s:12},{ink:'trouble',sw:3.5,dur:300})];
  m.wrong.forEach((c,j)=>acts.push(...LN('w'+j,240,172+j*62,c,{size:28,maxW:420,ink:'trouble'})));
  acts.push(W('mR',720,70,'The right way',{size:28,anchor:'middle',ink:'accent2',weight:700}),D('mT',{kind:'tick',x:720,y:108,s:13},{ink:'accent2',sw:3.5,dur:300}));
  m.right.forEach((c,j)=>acts.push(...LN('r'+j,720,172+j*62,c,{size:28,maxW:420,ink:'accent2'})));
  acts.push(...wrapText('why',480,420,m.why,880,{size:25,anchor:'middle'}));
  return {title:m.title||'Why not the other way?',actions:acts,explain:[{cue:'mL',t:m.ex[0]},{cue:'mR',t:m.ex[1]},{cue:'why',t:m.ex[2]}],check:m.check}}
function sumStep(sp){const acts=[ER('er'),W('h',480,64,'Remember',{size:32,anchor:'middle',ink:'accent',weight:700})],ex=[{cue:'h',t:'The whole lesson in a few lines.'}];
  sp.rules.forEach((r,j)=>{acts.push(...rule('s'+j,j+1,80,148+j*78,r,{size:fitSize(r,27,800)}));ex.push({cue:'s'+j,t:r})});
  if(sp.sumLine){acts.push(...LN('m',480,sp.rules.length>4?532:505,sp.sumLine,{size:32,maxW:880,ink:'accent2'}));ex.push({cue:'m',t:sp.sumSay||'One example to remember it by.'})}
  return {title:'Remember',actions:acts,explain:ex}}
function T(sp){const steps=[];
  (sp.pics||[]).forEach(p=>steps.push({title:p.title,actions:[ER('er'),...p.acts],explain:p.ex.map(([cue,t])=>({cue,t})),check:p.check}));
  (sp.ex||[]).forEach((e,i)=>steps.push(exStep(e,i)));if(sp.mis)steps.push(misStep(sp.mis));steps.push(sumStep(sp));
  return prepare(nsSteps({id:sp.id,phase:sp.ph,title:sp.title,summary:sp.sum,objectives:sp.obj,steps,practice:sp.prac}))}

/* ---------- drawing helpers ---------- */
function NL(id,x,y,w,a,b,o={}){const st=o.step||1,lb=o.lab||st,X=v=>x+(v-a)*w/(b-a),segs=[];
  for(let v=a;v<=b+1e-9;v+=st)segs.push([X(v),y-9,X(v),y+9]);
  const acts=[D(id+'.ln',{kind:'arrow',x1:x-22,y1:y,x2:x+w+32,y2:y,head:12},{dur:o.dur||700}),D(id+'.tk',{kind:'lines',segs},{sw:2.2,dur:500})];
  let first=true;for(let v=a;v<=b+1e-9;v+=lb){acts.push(W(`${id}.v${acts.length}`,X(v),y+38,nm(Math.round(v*100)/100),{size:o.size||22,anchor:'middle',ink:'muted',dur:350,sync:!first}));first=false}
  return {acts,X}}
function JUMP(id,X1,X2,y,label,ink='accent',below=false){const k=below?1:-1,h=k*(28+Math.abs(X2-X1)*.12),pts=range(0,13).map(i=>{const t=i/12;return [X1+(X2-X1)*t,y+k*8+h*Math.sin(Math.PI*t)]}),p=pts[12],q=pts[10];
  return [D(id,{kind:'poly',pts,amp:.3},{ink,sw:3,dur:600}),D(id+'.h',{kind:'arrow',x1:q[0],y1:q[1],x2:p[0],y2:p[1],head:11},{ink,sw:3,dur:120}),W(id+'.t',(X1+X2)/2,below?y+k*8+h+30:y+k*8+h-10,label,{size:24,anchor:'middle',ink,dur:300})]}
const DOT=(id,x,y,ink='trouble',r=9)=>D(id,{kind:'circle',cx:x,cy:y,r},{ink,fill:ink,fillOp:.85,dur:300});
function DOTS(id,x,y,rows,cols,gap,ink='accent',r=9){const cs=[];for(let i=0;i<rows;i++)for(let j=0;j<cols;j++)cs.push([x+j*gap,y+i*gap,r]);return D(id,{kind:'circles',cs},{ink,fill:ink,fillOp:.55,sw:2,dur:Math.min(1400,250+cs.length*35)})}
function ANG(id,cx,cy,r,a1,a2,label,ink='accent'){const pts=range(0,13).map(i=>{const a=(a1+(a2-a1)*i/12)*Math.PI/180;return [cx+r*Math.cos(a),cy-r*Math.sin(a)]}),m=((a1+a2)/2)*Math.PI/180,acts=[D(id,{kind:'poly',pts,amp:.3},{ink,sw:2.6,dur:400})];
  if(label)acts.push(W(id+'.t',cx+(r+28)*Math.cos(m),cy-(r+28)*Math.sin(m)+8,label,{size:24,anchor:'middle',ink,dur:300}));return acts}
const RAY=(id,cx,cy,len,deg,o={})=>D(id,{kind:'line',x1:cx,y1:cy,x2:cx+len*Math.cos(deg*Math.PI/180),y2:cy-len*Math.sin(deg*Math.PI/180)},{ink:o.ink||'main',sw:o.sw||3,dur:o.dur||450});
const POLY=(id,pts,o={})=>D(id,{kind:'poly',pts,closed:true},{ink:o.ink||'main',fill:o.fill,fillOp:o.fillOp??.15,dur:o.dur||800});
function LABELS(id,pairs,o={}){return pairs.map(([x,y,t],i)=>W(`${id}.${i}`,x,y,t,{size:o.size||24,anchor:'middle',ink:o.ink||'main',dur:250,sync:i>0}))}
function AXES(id,x0,y0,w,h,xs,ys,o={}){const X=v=>x0+v*w/xs,Y=v=>y0-v*h/ys,st=o.step||1,acts=[];
  if(o.grid)acts.push(D(id+'.g',{kind:'lines',segs:[...range(1,Math.floor(xs/st)+1).map(i=>[X(i*st),y0,X(i*st),y0-h]),...range(1,Math.floor(ys/st)+1).map(i=>[x0,Y(i*st),x0+w,Y(i*st)])]},{ink:'#dfe3ec',sw:1.2,dur:500}));
  acts.push(D(id+'.x',{kind:'arrow',x1:x0,y1:y0,x2:x0+w+28,y2:y0,head:12},{dur:500}),D(id+'.y',{kind:'arrow',x1:x0,y1:y0,x2:x0,y2:y0-h-28,head:12},{dur:500}));
  acts.push(...range(1,Math.floor(xs/st)+1).map((i,k)=>W(`${id}.xl${i}`,X(i*st),y0+30,String(i*st),{size:20,anchor:'middle',ink:'muted',dur:200,sync:k>0})));
  acts.push(...range(1,Math.floor(ys/st)+1).map((i,k)=>W(`${id}.yl${i}`,x0-16,Y(i*st)+7,String(i*st),{size:20,anchor:'end',ink:'muted',dur:200,sync:k>0})));
  acts.push(W(id+'.o',x0-14,y0+26,'0',{size:20,anchor:'end',ink:'muted',dur:150}));
  if(o.xl)acts.push(W(id+'.xn',x0+w+20,y0+32,o.xl,{size:22,anchor:'end',ink:'accent'}));if(o.yl)acts.push(W(id+'.yn',x0+8,y0-h-30,o.yl,{size:22,ink:'accent'}));
  return {acts,X,Y}}
function VENN(id,cx,cy,r,dx,la,lb){return [D(id+'.a',{kind:'circle',cx:cx-dx,cy,r},{ink:'accent',fill:'accent',fillOp:.12,dur:700}),D(id+'.b',{kind:'circle',cx:cx+dx,cy,r},{ink:'accent2',fill:'accent2',fillOp:.12,dur:700}),
  W(id+'.la',cx-dx-r*.55,cy-r-12,la,{size:24,anchor:'middle',ink:'accent',weight:700}),W(id+'.lb',cx+dx+r*.55,cy-r-12,lb,{size:24,anchor:'middle',ink:'accent2',weight:700})]}
function BARS(id,x0,y0,w,h,vals,labs,max,o={}){const n=vals.length,bw=w/n*.6,acts=[D(id+'.base',{kind:'line',x1:x0,y1:y0,x2:x0+w,y2:y0},{dur:400})];
  vals.forEach((v,i)=>{const bx=x0+w/n*(i+.2),bh=v/max*h;acts.push(D(`${id}.b${i}`,{kind:'rect',x:bx,y:y0-bh,w:bw,h:bh},{ink:o.ink||'accent',fill:o.ink||'accent',fillOp:.3,dur:450}),
    W(`${id}.v${i}`,bx+bw/2,y0-bh-10,String(v),{size:22,anchor:'middle',ink:o.ink||'accent',dur:200,sync:true}),W(`${id}.l${i}`,bx+bw/2,y0+30,labs[i],{size:21,anchor:'middle',ink:'muted',dur:200,sync:true}))});return acts}
function CUBOID(id,x,y,w,h,d,o={}){const dx=d*.6,dy=d*.45;return [D(id+'.f',{kind:'rect',x,y,w,h},{ink:o.ink||'main',fill:o.fill||'accent',fillOp:.12,dur:600}),
  D(id+'.t',{kind:'lines',segs:[[x,y,x+dx,y-dy],[x+w,y,x+w+dx,y-dy],[x+dx,y-dy,x+w+dx,y-dy],[x+w,y+h,x+w+dx,y+h-dy],[x+w+dx,y-dy,x+w+dx,y+h-dy]]},{ink:o.ink||'main',dur:600})]}
function TANK(id,x,y,w,h,frac,o={}){return [D(id+'.w',{kind:'rect',x:x+4,y:y+h*(1-frac)+2,w:w-8,h:h*frac-6},{stroke:false,fill:'accent',fillOp:.35,dur:500}),D(id+'.box',{kind:'poly',pts:[[x,y],[x,y+h],[x+w,y+h],[x+w,y]]},{ink:'main',dur:600})]}
function CLOCK(id,cx,cy,r,H,M){const am=(90-6*M)*Math.PI/180,ah=(90-30*(H%12)-.5*M)*Math.PI/180;return [D(id+'.c',{kind:'circle',cx,cy,r},{dur:600}),
  D(id+'.tk',{kind:'lines',segs:range(0,12).map(i=>{const a=i*Math.PI/6;return [cx+Math.cos(a)*r*.86,cy+Math.sin(a)*r*.86,cx+Math.cos(a)*r*.97,cy+Math.sin(a)*r*.97]})},{sw:2.4,dur:400}),
  D(id+'.h',{kind:'line',x1:cx,y1:cy,x2:cx+Math.cos(ah)*r*.5,y2:cy-Math.sin(ah)*r*.5},{ink:'trouble',sw:5,dur:300}),D(id+'.m',{kind:'line',x1:cx,y1:cy,x2:cx+Math.cos(am)*r*.8,y2:cy-Math.sin(am)*r*.8},{ink:'accent',sw:3.5,dur:300})]}
function TABLE(id,x,y,cws,rh,rows,o={}){const tw=cws.reduce((a,b)=>a+b,0),th=rh*rows.length,segs=[];let cx=x;
  for(let i=0;i<=rows.length;i++)segs.push([x,y+i*rh,x+tw,y+i*rh]);for(let j=0;j<=cws.length;j++){segs.push([cx,y,cx,y+th]);cx+=cws[j]||0}
  const acts=[D(id+'.g',{kind:'lines',segs},{ink:'muted',sw:2,dur:600})];
  rows.forEach((r,i)=>{let xx=x;r.forEach((c,j)=>{if(c!==''&&c!=null)acts.push(W(`${id}.${i}_${j}`,xx+cws[j]/2,y+i*rh+rh*.66,String(c),{size:o.size||24,anchor:'middle',ink:i===0&&o.head!==false?'accent':'main',weight:i===0&&o.head!==false?700:400,dur:220,sync:!(i===0&&j===0)}));xx+=cws[j]})});return acts}
function PERSON(id,x,y,o={}){const ink=o.ink||'main';return [D(id+'.h',{kind:'circle',cx:x,cy:y,r:15},{ink,dur:300}),D(id+'.b',{kind:'lines',segs:[[x,y+15,x,y+75],[x-24,y+38,x+24,y+38],[x,y+75,x-18,y+118],[x,y+75,x+18,y+118]]},{ink,dur:500})]}
function CAR(id,x,y,w,o={}){const k=w/220,P=pts=>pts.map(([a,b])=>[x+a*k,y+b*k]),ink=o.ink||'main';return [
  D(id+'.b',{kind:'poly',closed:true,pts:P([[0,80],[0,45],[50,40],[85,5],[175,5],[210,40],[220,45],[220,80]])},{ink,fill:o.fill||'accent',fillOp:.14,dur:700}),
  D(id+'.w',{kind:'circles',cs:[[x+50*k,y+84*k,17*k],[x+175*k,y+84*k,17*k]]},{ink,dur:350})]}

/* ---------- misunderstandings used across the course ---------- */
Object.assign(TAGS,{
  'misread':'Reading the question wrongly','wrong-op':'Choosing the wrong operation','place-value':'Mixing up place values','carry':'Forgetting to carry or borrow',
  'order-ops':'Doing the operations in the wrong order','sign':'Getting a plus or minus sign wrong','factor-multiple':'Mixing up factors and multiples','hcf-lcm':'Mixing up HCF and LCM',
  'remainder':'Getting the remainder wrong','frac-concept':'Not seeing a fraction as equal parts of a whole','frac-op':'Using the wrong rule for fractions','decimal-point':'Putting the decimal point in the wrong place',
  'rounding':'Rounding the wrong way','pct-base':'Taking the percentage of the wrong amount','pct-reverse':'Working forwards in a reverse-percentage question','ratio-parts':'Forgetting to add up the parts of a ratio',
  'proportion':'Mixing up direct and inverse proportion','money-base':'Using the wrong base price','interest':'Mixing up simple and compound interest','algebra-like':'Adding unlike terms',
  'algebra-balance':'Not doing the same thing to both sides','algebra-form':'Forming the equation wrongly','angle-fact':'Using the wrong angle fact','area-perim':'Mixing up area and perimeter',
  'units':'Using the wrong units','radius-diam':'Mixing up radius and diameter','pyth':'Using Pythagoras the wrong way round','coord-order':'Mixing up the x and y coordinates',
  'read-graph':'Reading the graph or table wrongly','mean-median':'Mixing up mean, median and mode','sort-first':'Forgetting to sort before finding the median','total-trick':'Not using total = mean × count',
  'venn-double':'Counting the overlap twice','sample':'Mixing up population and sample','prob':'Getting the probability fraction wrong','speed-avg':'Averaging speeds instead of total distance ÷ total time',
  'rel-speed':'Adding speeds when they should be subtracted, or the other way round','work-add':'Adding times instead of rates','series-rule':'Choosing a rule that does not fit every term',
  'code-rule':'Applying the code rule wrongly','logic-extra':'Using outside knowledge or assuming too much','logic-converse':'Reversing an if-then statement','arrange':'Breaking one of the conditions',
  'direction':'Turning the wrong way','clock':'Forgetting the hour hand moves too','multiply-op':'Multiplying when you should add, or the other way round'});
