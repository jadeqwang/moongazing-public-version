#!/usr/bin/env python3
"""tools/char_gen_public.py — character-sheet generator for the public cut.
char_gen_public.py NAME MODEL TAG PROMPTFILE [ref ...] [--size=1536x1024] [--ar=3:2] [--refnote=...] [--nostyle=1]
MODEL: gpt | grok | nbp. Writes media/chars_public/NAME/TAG.<ext> + TAG.json (prompt, refs, model) and appends the
call to media/gen/spend.jsonl.

Privacy guard: every reference image must live under media/chars_public/, and the prompt is refused if it contains a
term listed in work/private_terms.txt (one per line; a local file, never committed)."""
import sys, os, json, re, time
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(ROOT, "tools"))
os.chdir(ROOT)
import cf

CH = "media/chars_public"
SPEND = "media/gen/spend.jsonl"
STYLE = open(os.path.join(CH, "STYLE_BLOCK.txt")).read().strip()
args = [a for a in sys.argv[1:] if not a.startswith("--")]
opts = dict(a[2:].split("=", 1) for a in sys.argv[1:] if a.startswith("--"))
name, model, tag, pfile = args[:4]
refs = args[4:]
prompt = open(pfile).read().strip()
if opts.get("nostyle") != "1":
    prompt = prompt + "\n\n" + STYLE
if refs:
    prompt = ("Reference images are provided: " + opts.get("refnote", "use them for design continuity (character, costume, palette and painting technique) only.") + "\n\n" + prompt)

# ---- privacy guard
for r in refs:
    if not os.path.realpath(r).startswith(os.path.realpath(CH) + os.sep):
        sys.exit(f"REFUSED: reference outside {CH}: {r}")
terms = "work/private_terms.txt"
if os.path.exists(terms):
    for w in (l.strip() for l in open(terms) if l.strip() and not l.startswith("#")):
        if re.search(r"(?<![A-Za-z])" + re.escape(w) + r"(?![A-Za-z])", prompt):
            sys.exit(f"REFUSED: private term in prompt: {w!r}")

outdir = f"{CH}/{name}"
os.makedirs(outdir, exist_ok=True)
MID = {"gpt": "openai/gpt-image-2.5-sunburst", "grok": "xai/grok-imagine-image-2.0", "nbp": "google/nano-banana-pro"}[model]
size = opts.get("size", "1536x1024")
ar = opts.get("ar", "3:2")
if model == "gpt":
    inp = {"prompt": prompt, "quality": opts.get("q", "high"), "size": size, "output_format": "jpeg"}
    if refs:
        inp["images"] = ["file:" + r for r in refs]
elif model == "grok":
    inp = {"prompt": prompt, "aspect_ratio": ar, "resolution": "2k", "response_format": "b64_json"}
    if refs:
        inp["images"] = [{"url": "file:" + r} for r in refs]
else:
    inp = {"prompt": prompt, "aspect_ratio": ar, "image_size": "2K"}
    if refs:
        inp["image_input"] = ["file:" + r for r in refs]
out = f"{outdir}/{tag}.jpg"
est, basis = cf.estimate(MID, inp)
ok, err, paths = True, None, []
try:
    paths = cf.generate(MID, inp, out, tag=f"pub_{name}_{tag}")
except BaseException as e:   # log the attempt either way
    ok, err = False, str(e)[:300]
os.makedirs(os.path.dirname(SPEND), exist_ok=True)
cum = 0.0
if os.path.exists(SPEND):
    for l in open(SPEND):
        try:
            d = json.loads(l); cum += d.get("est_usd", 0) if d.get("ok", True) else 0
        except Exception:
            pass
cum += (est or 0) if ok else 0
with open(SPEND, "a") as f:
    f.write(json.dumps({"ts": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()), "event": "image", "phase": "public-1",
                        "shot": f"chars_public/{name}", "take": tag, "model": MID, "est_usd": est if ok else 0, "basis": basis,
                        "ok": ok, "error": err, "cum_usd": round(cum, 4)}) + "\n")
if not ok:
    sys.exit(f"FAILED: {err}")
json.dump({"model": MID, "prompt": prompt, "refs": refs, "out": paths, "opts": opts},
          open(f"{outdir}/{tag}.json", "w"), ensure_ascii=False, indent=1)
print(paths)
