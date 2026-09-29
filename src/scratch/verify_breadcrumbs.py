import requests

urls = [
    "http://192.168.1.17:3000/",
    "http://192.168.1.17:3000/MudraLibrary",
    "http://192.168.1.17:3000/YogaNidraLibrary"
]

for url in urls:
    try:
        r = requests.get(url)
        print(f"[{r.status_code}] {url}")
    except Exception as e:
        print(f"[ERR] {url} -> {e}")
