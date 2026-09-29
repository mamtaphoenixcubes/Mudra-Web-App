import requests

profile_id = "nh0p1vtynpr7mge2orest5mt"
nidra_id = "ui2phqjaaqub5r1k38gkppko"

# 1. Check current IsLiked status
r1 = requests.get(f"http://192.168.1.14:5000/api/v1/web/yoga-nidras/{nidra_id}?profileDocumentId={profile_id}")
d1 = r1.json().get("data", {})
act1 = d1.get("userActivity", {})
print("BEFORE LIKE - IsLiked:", act1.get("IsLiked"))

# 2. Call like endpoint
r_like = requests.post(f"http://192.168.1.14:5000/api/v1/web/yoga-nidras/{nidra_id}/like", json={"profileDocumentId": profile_id})
print("LIKE RESPONSE:", r_like.json())

# 3. Check IsLiked status after like call
r2 = requests.get(f"http://192.168.1.14:5000/api/v1/web/yoga-nidras/{nidra_id}?profileDocumentId={profile_id}")
d2 = r2.json().get("data", {})
act2 = d2.get("userActivity", {})
print("AFTER LIKE - IsLiked:", act2.get("IsLiked"))
