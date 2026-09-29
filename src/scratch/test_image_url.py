import requests

url = "http://192.168.1.14:1337/uploads/stress_anxiety_d9b8d48c62.png"
try:
    r = requests.get(url)
    print("STATUS:", r.status_code, "CONTENT TYPE:", r.headers.get("content-type"))
except Exception as e:
    print("ERROR:", e)
