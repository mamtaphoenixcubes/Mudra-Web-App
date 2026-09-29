import requests
import json

r = requests.get("http://192.168.1.14:5000/api/v1/web/categories")
data = r.json()
items = data.get("data", {}).get("data", [])
print(f"Total items: {len(items)}")
for i, item in enumerate(items):
    print(f"\n--- Item {i} ---")
    print("id:", item.get("id"))
    print("documentId:", item.get("documentId"))
    print("Name:", item.get("Name"))
    print("color:", item.get("color"))
    print("cardText:", item.get("cardText"))
    print("icon:", json.dumps(item.get("icon"), indent=2))
