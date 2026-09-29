import urllib.request
import json

url = "http://192.168.1.14:5000/api/v1/web/webmudras/ahi75a9qfj8f8btb4u23zrrh"
try:
    with urllib.request.urlopen(url) as response:
        data = json.loads(response.read().decode('utf-8'))
        actual = data["data"]["data"]
        print("Root keys:", actual.keys())
        print("mediaType:", actual.get("mediaType"))
        print("audioSingleSessions keys:", [x.keys() for x in actual.get("audioSingleSessions", [])])
        print("audioSingleSessions IDs:", [x.get("id") for x in actual.get("audioSingleSessions", [])])
        print("audioSingleSessions docIDs:", [x.get("documentId") for x in actual.get("audioSingleSessions", [])])
        print("audio_playlists keys:", [x.keys() for x in actual.get("audio_playlists", [])])
except Exception as e:
    print("Error:", e)
