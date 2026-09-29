import requests

base = "http://192.168.1.14:5000/api/v1/web"
mobile_base = "http://192.168.1.14:5000/api/v1/mobile"

# Test common route combinations
nidra_routes = [
    "/yoga-nidras/progress",
    "/yoga-nidras/complete",
    "/yoga-nidras/1/progress",
    "/yoga-nidra/progress",
    "/yoga-nidra/complete",
    "/yoga-nidras-activity/media-progress",
    "/yoga-nidras-activity/media-complete",
    "/yoga-nidra-activity/media-progress",
    "/yoga-nidra-activity/media-complete",
    "/yoga-nidras/media-progress",
    "/yoga-nidras/media-complete",
    "/yoga-nidra-activity/progress",
    "/yoga-nidra-activity/complete",
    "/yoga-nidra-activities/media-progress",
    "/yoga-nidra-activities/media-complete",
    "/yoga-nidras-activities/media-progress",
    "/yoga-nidras-activities/media-complete",
]

payload = {
    "profileDocumentId": "nh0p1vtynpr7mge2orest5mt",
    "mediaType": "AUDIO_SINGLE",
    "mediaDocumentId": "lhardomekpkdpp3d336fc8yn",
    "remainingDuration": 420,
    "sessionDuration": 900,
    "completedDuration": 600
}

print("--- TESTING WEB ENDPOINTS ---")
for r in nidra_routes:
    url = base + r
    try:
        res = requests.post(url, json=payload, timeout=2)
        print(f"[{res.status_code}] POST {url}")
    except Exception as e:
        print(f"[ERR] {url}: {e}")

print("--- TESTING MOBILE ENDPOINTS ---")
for r in nidra_routes:
    url = mobile_base + r
    try:
        res = requests.post(url, json=payload, timeout=2)
        print(f"[{res.status_code}] POST {url}")
    except Exception as e:
        print(f"[ERR] {url}: {e}")
