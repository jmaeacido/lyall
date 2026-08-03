"""Compress brand-guidelines.pdf under Cloudflare Workers' 25 MiB asset limit.

Reads the full-resolution original from assets/ (kept out of Workers deploy)
and writes a sharp web-safe PDF to public/brand-guidelines.pdf.
"""
from __future__ import annotations

from pathlib import Path

import fitz

ROOT = Path(__file__).resolve().parents[1]
ORIGINAL = ROOT / "assets" / "brand-guidelines-original.pdf"
OUT = ROOT / "public" / "brand-guidelines.pdf"

# High enough for on-screen brand review; far under the 25 MiB Workers cap.
MAX_WIDTH = 3200
JPEG_QUALITY = 92


def compress(max_width: int = MAX_WIDTH, jpeg_quality: int = JPEG_QUALITY) -> Path:
    if not ORIGINAL.exists():
        raise SystemExit(f"missing original PDF: {ORIGINAL}")

    src = fitz.open(ORIGINAL)
    out = fitz.open()
    for page in src:
        zoom = min(max_width / page.rect.width, 4.0)
        pix = page.get_pixmap(matrix=fitz.Matrix(zoom, zoom), alpha=False)
        img_bytes = pix.tobytes("jpeg", jpg_quality=jpeg_quality)
        new_page = out.new_page(width=page.rect.width, height=page.rect.height)
        new_page.insert_image(page.rect, stream=img_bytes)
        print(
            f"page -> {pix.width}x{pix.height} jpeg "
            f"{len(img_bytes) / 1024 / 1024:.2f} MiB q={jpeg_quality}"
        )

    tmp = OUT.with_suffix(".pdf.tmp")
    OUT.parent.mkdir(parents=True, exist_ok=True)
    out.save(tmp, deflate=True, garbage=4, clean=True)
    out.close()
    src.close()
    tmp.replace(OUT)

    size = OUT.stat().st_size / 1024 / 1024
    print(f"wrote {OUT.relative_to(ROOT)} ({size:.2f} MiB)")
    if size >= 24.5:
        raise SystemExit(f"still too large for Workers (need <25 MiB): {size:.2f} MiB")
    return OUT


if __name__ == "__main__":
    compress()
