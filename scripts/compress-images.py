from pathlib import Path
import os

from PIL import Image, ImageOps


ROOT = Path(__file__).resolve().parents[1]
SKIP = {"node_modules", ".git", "dist", "projet-inte-site"}
SMALL = (
    "twoboys", "women-shocked", "greg-guillotin", "burger", "produit-",
    "/personnages/", "/acteurs/", "acteur_", "pi_corps", "/porte.png",
    "cadre porte", "cadre_porte", "head_crop", "/jean.png", "/matt.png",
    "/raphael.png", "/taylor.png", "/timothee.png", "michel.png",
)


def candidates():
    files = [ROOT / "Michel.png"]
    for group in sorted(ROOT.glob("G[0-2][0-9]")):
        files.extend(group.rglob("*"))
    return [p for p in files if p.is_file()
            and p.suffix.lower() in {".png", ".jpg", ".jpeg"}
            and p.stat().st_size > 150 * 1024
            and not (set(p.parts) & SKIP)
            and "favicon" not in p.name.lower() and "icon" not in p.name.lower()]


converted = []
for source in candidates():
    relative = source.relative_to(ROOT).as_posix()
    target = source.with_suffix(".webp")
    temporary = target.with_suffix(".webp.tmp")
    before = source.stat().st_size
    with Image.open(source) as opened:
        image = ImageOps.exif_transpose(opened)
        alpha = "A" in image.getbands() and image.getchannel("A").getextrema()[0] < 255
        image = image.convert("RGBA" if alpha else "RGB")
        limit = 1600 if any(marker in f"/{relative.lower()}" for marker in SMALL) else 2000
        image.thumbnail((limit, limit), Image.Resampling.LANCZOS)
        image.save(temporary, "WEBP", quality=80, method=6)
    after = temporary.stat().st_size
    if after <= before * 0.8:
        os.replace(temporary, target)
        converted.append((relative, before, after))
        print(f"OK   {relative}: {before} -> {after}")
    else:
        temporary.unlink()
        print(f"KEEP {relative}: {before} -> {after} (gain < 20%)")

cleanup = ROOT / ".cleanup" / "to-delete.txt"
cleanup.parent.mkdir(exist_ok=True)
cleanup.write_text("".join(f"{path} # {before} B -> {after} B\n"
                           for path, before, after in converted))
