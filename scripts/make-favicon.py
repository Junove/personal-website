#!/usr/bin/env python3
"""Regenerate src/app/favicon.ico: the site monogram's "N" on the accent badge.

Usage: python3 scripts/make-favicon.py

The N is drawn as three polygons (left stem, right stem, diagonal) instead of
set in a font: Poppins is only loaded from the CDN at runtime, and its N is a
uniform-stroke geometric sans that polygons reproduce exactly. Light-theme
colours only -- an .ico cannot follow data-theme.
"""

from pathlib import Path

from PIL import Image, ImageDraw

BG = (0x4A, 0x5C, 0x26)  # --accent-primary
FG = (0xFF, 0xFF, 0xFF)  # --accent-contrast
S = 2048  # supersampled canvas; Pillow LANCZOS-downsamples it per .ico size
RADIUS = 0.19  # rounded-md at 32px, as a fraction of the side
SIZES = [(16, 16), (32, 32), (48, 48)]
OUT = Path(__file__).resolve().parent.parent / "src/app/favicon.ico"

# Geometry is in 16ths so every stem and margin lands on a whole pixel at 16x16
# (and so at 32 and 48): off-grid edges turn to grey mush at favicon sizes.
pad = 2 / 16 * S  # optical margin inside the badge
h = S - 2 * pad  # cap height
w = 10 / 16 * S  # Poppins-ish N proportions
stem = 2 / 16 * S  # bold stem weight
x, y = (S - w) / 2, pad
diag = stem * ((w**2 + h**2) ** 0.5) / h  # horizontal thickness of the diagonal

color = Image.new("RGB", (S, S), BG)
draw = ImageDraw.Draw(color)
draw.rectangle([x, y, x + stem, y + h], fill=FG)
draw.rectangle([x + w - stem, y, x + w, y + h], fill=FG)
draw.polygon([(x, y), (x + diag, y), (x + w, y + h), (x + w - diag, y + h)], fill=FG)

mask = Image.new("L", (S, S), 0)
ImageDraw.Draw(mask).rounded_rectangle([0, 0, S - 1, S - 1], radius=RADIUS * S, fill=255)

icon = color.convert("RGBA")
icon.putalpha(mask)  # RGB stays green outside the mask, so no dark fringe when downsampled
icon.save(OUT, format="ICO", sizes=SIZES)

with Image.open(OUT) as check:
    assert sorted(check.info["sizes"]) == SIZES, check.info["sizes"]
    for size in SIZES:
        check.size = size
        frame = check.convert("RGBA")
        # <=16/255: LANCZOS leaves a trace of ringing in the clipped corners.
        assert frame.getpixel((0, 0))[3] <= 16, f"{size} corner not transparent"
        assert frame.getpixel((size[0] // 2, size[1] // 2))[3] == 255, f"{size} centre not opaque"
print(f"wrote {OUT} {SIZES}")
