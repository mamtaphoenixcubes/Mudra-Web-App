import requests

urls = [
    "http://192.168.1.17:3000/YogaNidraSessionDetail?id=ui2phqjaaqub5r1k38gkppko",
    "http://192.168.1.17:3000/MudraDetailTemplate?id=ahi75a9qfj8f8btb4u23zrrh",
    "http://192.168.1.17:3000/PlaySession?id=ui2phqjaaqub5r1k38gkppko&type=yoganidra"
]

for url in urls:
    try:
        r = requests.get(url)
        print(f"[{r.status_code}] {url}")
    except Exception as e:
        print(f"[ERR] {url} -> {e}")
