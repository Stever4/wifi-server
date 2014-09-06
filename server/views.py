from django.http import HttpResponse, HttpResponseBadRequest
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from server.models import *

import json
# Create your views here.

def index(request):
    metrics = Metric.objects.all()

    context = {'metrics_len': len(metrics)}
    return render(request, 'server/index.html', context)


@csrf_exempt
def post_metric(request):
    try:
        print("Test:", request.body)
        d = json.loads(request.body.decode('utf8'))
        print("Incoming Post Request:", d)
        for row in d:
            lat = row.get("lat")
            lon = row.get("lon")
            location = Location(latitude = lat, longitude = lon)
            location.save()
            ssid = row.get("ssid")
            security = row.get("security")
            network = Network(ssid = ssid, security = security)
            network.save()
            mac = row.get("mac")
            router = Router(network=network, mac = mac)
            router.save()
            rssi = row.get("rssi")
            metric = Metric(location=location,router=router,rssi=rssi)
            metric.save()
        return HttpResponse("Thanks!")
    except Exception as e:
        print(e)
        return HttpResponseBadRequest("Woops! {}".format(e))

def get_metrics(request):
    metrics = Metric.objects.all()
    data = []
    for metric in metrics:
        row = {}
        row['latitude'] = metric.location.latitude
        row['longitude'] = metric.location.longitude
        row['network'] = metric.router.network.ssid
        row['rssi'] = metric.rssi
        data.append(row)
    return HttpResponse(json.dumps(data))
