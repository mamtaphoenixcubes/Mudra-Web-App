import urllib.request
import json

profile_id = "nh0p1vtynpr7mge2orest5mt"
get_url = f"http://192.168.1.14:5000/api/v1/web/audio-playlists/profile/{profile_id}"
all_url = "http://192.168.1.14:5000/api/v1/web/audio-playlists"

print("GET USER PLAYLISTS:")
try:
    with urllib.request.urlopen(get_url) as response:
        data = json.loads(response.read().decode('utf-8'))
        print(json.dumps(data, indent=2))
except Exception as e:
    print("Error user playlists:", e)

print("\nGET ALL PLAYLISTS:")
try:
    with urllib.request.urlopen(all_url) as response:
        data = json.loads(response.read().decode('utf-8'))
        print(json.dumps(data, indent=2))
except Exception as e:
    print("Error all playlists:", e)
