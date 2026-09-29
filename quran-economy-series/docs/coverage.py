"""Check that every inventory ID in 01-inventory-audit.md is covered by a scene in 02-episode-plan.md."""
import re, pathlib, sys
here = pathlib.Path(__file__).parent
inv = set(re.findall(r"^\| (P\d\d\.\d+) \|", (here / "01-inventory-audit.md").read_text(), re.M))
covered = {}
for scene, block in re.findall(r"### (E\d\.S\d+).*?\n(.*?)(?=\n### |\n# |\Z)", (here / "02-episode-plan.md").read_text(), re.S):
    m = re.search(r"\*\*Covers:\*\* (.*)", block)
    for pid in re.findall(r"P\d\d\.\d+", m.group(1) if m else ""):
        covered.setdefault(pid, []).append(scene)
missing = sorted(inv - covered.keys(), key=lambda s: (int(s[1:3]), int(s.split('.')[1])))
unknown = sorted(covered.keys() - inv)
print(f"inventory points: {len(inv)}  covered: {len(inv & covered.keys())}  scenes: {len(set(s for v in covered.values() for s in v))}")
if missing: print("MISSING:", ", ".join(missing))
if unknown: print("UNKNOWN IDs in plan:", ", ".join(unknown))
sys.exit(1 if missing or unknown else 0)
