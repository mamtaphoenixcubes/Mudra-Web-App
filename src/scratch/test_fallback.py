import requests

url = "http://192.168.1.14:5000/api/v1/web/yoga-nidras/ui2phqjaaqub5r1k38gkppko/progress"
payload = {
    "profileDocumentId": "nh0p1vtynpr7mge2orest5mt",
    "remainingDuration": 120,
    "sessionDuration": 300
}

r = requests.post(url, json=payload)
print(f"Status Code: {r.status_code}")
print(f"Response: {r.json()}")
