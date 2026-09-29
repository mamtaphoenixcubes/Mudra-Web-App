import urllib.request
import json

url = "http://192.168.1.14:5000/api/v1/web/webmudras/ahi75a9qfj8f8btb4u23zrrh"
try:
    with urllib.request.urlopen(url) as response:
        data = json.loads(response.read().decode('utf-8'))
        print(json.dumps(data, indent=2))
except Exception as e:
    print("Error:", e)
