import requests

profile_id = "nh0p1vtynpr7mge2orest5mt"
mudra_id = "ahi75a9qfj8f8btb4u23zrrh"

# 1. Check current IsLiked status
r1 = requests.get(f"http://192.168.1.14:5000/api/v1/web/webmudras/{mudra_id}?profileDocumentId={profile_id}")
d1 = r1.json().get("data", {})
if "data" in d1 and isinstance(d1["data"], dict):
    d1 = d1["data"]
acts1 = d1.get("userMudraActivities", [])
user_act1 = next((a for a in acts1 if a.get("user", {}).get("documentId") == profile_id), None)
print("BEFORE MUDRA LIKE - isLiked:", user_act1.get("isLiked") if user_act1 else None)

# 2. Call like endpoint
r_like = requests.post(f"http://192.168.1.14:5000/api/v1/web/mudras/{mudra_id}/like", json={"profileDocumentId": profile_id})
print("MUDRA LIKE RESPONSE:", r_like.json())

# 3. Check status after like call
r2 = requests.get(f"http://192.168.1.14:5000/api/v1/web/webmudras/{mudra_id}?profileDocumentId={profile_id}")
d2 = r2.json().get("data", {})
if "data" in d2 and isinstance(d2["data"], dict):
    d2 = d2["data"]
acts2 = d2.get("userMudraActivities", [])
user_act2 = next((a for a in acts2 if a.get("user", {}).get("documentId") == profile_id), None)
print("AFTER MUDRA LIKE - isLiked:", user_act2.get("isLiked") if user_act2 else None)
