import requests

mudra_id = "ahi75a9qfj8f8btb4u23zrrh"
profile_id = "nh0p1vtynpr7mge2orest5mt"

endpoints = [
    ("POST", "http://192.168.1.14:5000/api/v1/web/yoga-mudra-activity/media-progress", {
        "profileDocumentId": profile_id,
        "mediaType": "AUDIO_SINGLE",
        "mediaDocumentId": "lhardomekpkdpp3d336fc8yn",
        "mudraDocumentId": mudra_id,
        "remainingDuration": 420,
        "sessionDuration": 900
    }),
    ("POST", "http://192.168.1.14:5000/api/v1/web/yoga-mudra-activity/media-complete", {
        "profileDocumentId": profile_id,
        "mediaType": "AUDIO_SINGLE",
        "mediaDocumentId": "lhardomekpkdpp3d336fc8yn",
        "mudraDocumentId": mudra_id,
        "completedDuration": 600
    }),
    ("POST", f"http://192.168.1.14:5000/api/v1/web/mudras/{mudra_id}/progress", {
        "profileDocumentId": profile_id,
        "remainingDuration": 420,
        "sessionDuration": 900
    }),
    ("POST", f"http://192.168.1.14:5000/api/v1/web/mudras/{mudra_id}/complete", {
        "profileDocumentId": profile_id,
        "completedDuration": 600
    })
]

for method, url, payload in endpoints:
    try:
        r = requests.post(url, json=payload, timeout=3)
        print(f"[{r.status_code}] {url} -> {r.text[:150]}")
    except Exception as e:
        print(f"[ERR] {url} -> {e}")
