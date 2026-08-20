from pathlib import Path
import json
import requests
from PIL import Image
from io import BytesIO

base = "https://github.com/sheikhrashel47-stack/jibonke-notun-kore-dekho/releases/download/store-assets-six-books-v1"
assets = ["book1_001.webp", "book1_002.webp", "book1_003.webp", "book1_004.webp", "book1_005.webp", "book1_006.webp", "book1_007.webp", "book1_008.webp", "book1_009.webp", "book1_010.webp", "book2_cover.webp", "book3_cover.webp", "book4_cover.webp", "book5_cover.webp", "book6_cover.webp"]
routes = {
    "visual": "/jibonke-notun-kore-dekho/store/book/visual",
    "presence": "/jibonke-notun-kore-dekho/store/book/presence",
    "habit": "/jibonke-notun-kore-dekho/store/book/habit",
    "wealth": "/jibonke-notun-kore-dekho/store/book/wealth",
    "communication": "/jibonke-notun-kore-dekho/store/book/communication",
    "brain": "/jibonke-notun-kore-dekho/store/book/brain",
}

report = {"assets": [], "routes": []}
for name in assets:
    url = f"{base}/{name}"
    response = requests.get(url, timeout=30)
    item = {"filename": name, "url": url, "status": response.status_code, "bytes": len(response.content)}
    if response.ok:
        image = Image.open(BytesIO(response.content))
        item["width"], item["height"] = image.size
    report["assets"].append(item)

for book_id, path in routes.items():
    url = f"https://sheikhrashel47-stack.github.io{path}"
    response = requests.get(url, timeout=30)
    report["routes"].append({"book_id": book_id, "url": url, "status": response.status_code, "spa_fallback": response.status_code == 404, "contains_root": "id=\"root\"" in response.text})

output = Path("/home/ubuntu/jibonke-notun-kore-dekho/docs/book-asset-coverage.json")
output.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
print(json.dumps({"asset_count": len(report["assets"]), "route_count": len(report["routes"]), "asset_failures": [x for x in report["assets"] if x["status"] != 200], "route_failures": [x for x in report["routes"] if x["status"] not in (200, 404)], "spa_fallback_routes": [x for x in report["routes"] if x["spa_fallback"]]}, ensure_ascii=False, indent=2))
