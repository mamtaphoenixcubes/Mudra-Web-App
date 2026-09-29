import requests

nidra_id = "ui2phqjaaqub5r1k38gkppko"
profile_id = "nh0p1vtynpr7mge2orest5mt"

endpoints = [
    ("POST", f"http://192.168.1.14:5000/api/v1/web/yoga-nidras/{nidra_id}/complete", {
        "profileDocumentId": profile_id,
        "sessionDuration": 900
    }),
    ("POST", f"http://192.168.1.14:5000/api/v1/mobile/yoga-nidras/{nidra_id}/complete", {
        "profileDocumentId": profile_id,
        "sessionDuration": 900
    })
]

for method, url, payload in endpoints:
    try:
        r = requests.post(url, json=payload, timeout=3)
        print(f"[{r.status_code}] {url} -> {r.text[:150]}")
    except Exception as e:
        print(f"[ERR] {url} -> {e}")
