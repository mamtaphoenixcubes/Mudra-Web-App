import requests

profile_id = "nh0p1vtynpr7mge2orest5mt"
r = requests.get(f"http://192.168.1.14:5000/api/v1/web/webmudras/ahi75a9qfj8f8btb4u23zrrh?profileDocumentId={profile_id}")
data = r.json()
target = data
while isinstance(target, dict) and "data" in target and not ("id" in target or "name" in target or "documentId" in target):
    target = target["data"]

print("userMudraActivities:", target.get("userMudraActivities"))
print("userActivity:", target.get("userActivity"))
