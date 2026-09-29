import requests

profile_id = "nh0p1vtynpr7mge2orest5mt"

# 1. Mudra detail
r_mudra = requests.get(f"http://192.168.1.14:5000/api/v1/web/webmudras/ahi75a9qfj8f8btb4u23zrrh?profileDocumentId={profile_id}")
print("=== MUDRA DETAIL KEYS ===")
try:
    data = r_mudra.json()
    target = data
    while isinstance(target, dict) and "data" in target and not ("id" in target or "name" in target or "documentId" in target):
        target = target["data"]
    print("Inner keys:", list(target.keys()) if isinstance(target, dict) else type(target))
    if isinstance(target, dict):
        print("userActivity:", target.get("userActivity"))
        print("isLiked:", target.get("isLiked") or target.get("IsLiked"))
except Exception as e:
    print("Err:", e)
