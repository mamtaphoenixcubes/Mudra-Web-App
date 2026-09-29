import requests

r = requests.get("http://192.168.1.17:3000/Home")
print("STATUS:", r.status_code)
