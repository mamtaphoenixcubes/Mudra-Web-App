import requests

url = "http://192.168.1.17:3000/AilmentDetailTemplate?id=ohiyk60qhza1ylkyzcep3npm"
try:
    r = requests.get(url)
    print("STATUS:", r.status_code)
except Exception as e:
    print("ERROR:", e)
