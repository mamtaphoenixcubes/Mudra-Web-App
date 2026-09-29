import requests

profile_id = "nh0p1vtynpr7mge2orest5mt"

# 1. Mudra detail
r1 = requests.get(f"http://192.168.1.14:5000/api/v1/web/webmudras/ahi75a9qfj8f8btb4u23zrrh?profileDocumentId={profile_id}")
data1 = r1.json().get("data", {})
if "data" in data1 and isinstance(data1["data"], dict):
    data1 = data1["data"]

# 2. Yoga Nidra detail
r2 = requests.get(f"http://192.168.1.14:5000/api/v1/web/yoga-nidras/ui2phqjaaqub5r1k38gkppko?profileDocumentId={profile_id}")
data2 = r2.json().get("data", {})

def extract_is_liked(data, p_id):
    if not data:
        return False
    if isinstance(data.get("isLiked"), bool):
        return data["isLiked"]
    if isinstance(data.get("IsLiked"), bool):
        return data["IsLiked"]
    act = data.get("userActivity")
    if isinstance(act, dict):
        if isinstance(act.get("isLiked"), bool):
            return act["isLiked"]
        if isinstance(act.get("IsLiked"), bool):
            return act["IsLiked"]
    acts = data.get("userMudraActivities")
    if isinstance(acts, list) and len(acts) > 0:
        user_act = next((a for a in acts if a.get("user", {}).get("documentId") == p_id or str(a.get("user", {}).get("id")) == str(p_id)), None)
        if not user_act:
            user_act = acts[0]
        if user_act:
            if isinstance(user_act.get("isLiked"), bool):
                return user_act["isLiked"]
            if isinstance(user_act.get("IsLiked"), bool):
                return user_act["IsLiked"]
    return False

print("Mudra extract_is_liked:", extract_is_liked(data1, profile_id))
print("Yoga Nidra extract_is_liked:", extract_is_liked(data2, profile_id))
