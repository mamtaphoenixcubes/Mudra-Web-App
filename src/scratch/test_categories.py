import requests
import json

try:
    r = requests.get("http://192.168.1.14:5000/api/v1/web/categories")
    print("STATUS:", r.status_code)
    data = r.json()
    print("DATA KEYS:", data.keys() if isinstance(data, dict) else type(data))
    print(json.dumps(data, indent=2)[:2000])
except Exception as e:
    print("ERROR:", e)
