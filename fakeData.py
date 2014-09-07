import requests
import json
import sys
import random

lat = 42.292

print(sys.version)
url = 'http://www.we-fi.me/server/post_metric'

while(lat <= 42.293):
    data = {"lat":lat, "lon": -83.7120, "ssid":"foo", "security":"Foobar",
    "mac":"Hello World!", "rssi":250000}
    requests.post(url, data=json.dumps([data])).text
    lat = lat + .00005


