import requests

ports = [5000, 1337, 3000]
bases = [
    "http://192.168.1.14:{port}/api/v1/web",
    "http://192.168.1.14:{port}/api/v1/mobile",
    "http://192.168.1.14:{port}/api/v1",
    "http://192.168.1.14:{port}/api",
    "http://192.168.1.14:{port}",
]

routes = [
    "/yoga-mudra-activity/media-progress",
    "/yoga-nidra-activity/media-progress",
    "/yoga-nidras-activity/media-progress",
    "/yoga-nidras/progress",
    "/yoga-nidras/media-progress",
]

payload = {
    "profileDocumentId": "nh0p1vtynpr7mge2orest5mt",
    "mediaType": "AUDIO_SINGLE",
    "mediaDocumentId": "lhardomekpkdpp3d336fc8yn",
    "remainingDuration": 420,
    "sessionDuration": 900
}

for port in ports:
    for base_template in bases:
        base = base_template.format(port=port)
        for route in routes:
            url = base + route
            try:
                r = requests.post(url, json=payload, timeout=1.5)
                if r.status_code != 404:
                    print(f"!!! FOUND [{r.status_code}] -> {url}")
                else:
                    print(f"[404] {url}")
            except Exception as e:
                pass
