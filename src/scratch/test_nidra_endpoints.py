import requests

base_urls = [
    "http://192.168.1.14:5000/api/v1/web",
    "http://192.168.1.14:5000/api/v1/mobile",
]

routes = [
    "/yoga-nidras-activity/media-progress",
    "/yoga-nidra-activity/media-progress",
    "/yoga-nidra-activity/media-complete",
    "/yoga-nidras-activity/media-complete",
    "/yoga-nidras/activity/media-progress",
    "/yoga-nidra/activity/media-progress",
    "/yoga-nidra/media-progress",
    "/yoga-nidras/media-progress",
]

payload = {
    "profileDocumentId": "nh0p1vtynpr7mge2orest5mt",
    "mediaType": "AUDIO_SINGLE",
    "mediaDocumentId": "lhardomekpkdpp3d336fc8yn",
    "remainingDuration": 420,
    "sessionDuration": 900
}

print("Testing Yoga Nidra Media Progress Endpoints...")
for base in base_urls:
    for route in routes:
        url = base + route
        try:
            r = requests.post(url, json=payload, timeout=3)
            print(f"[{r.status_code}] {url}")
        except Exception as e:
            print(f"[ERR] {url} -> {e}")
