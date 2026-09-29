import requests

r = requests.get("http://192.168.1.17:3000/MudraDetailTemplate?id=ahi75a9qfj8f8btb4u23zrrh")
print("Status:", r.status_code)
