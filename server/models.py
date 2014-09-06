__all__ = ["Location", "Network", "Router", "Metric"]
from django.db import models

# Create your models here.
class Location(models.Model):
    latitude = models.FloatField()
    longitude = models.FloatField()

    def __str__(self):
        return "({},{})".format(self.latitude, self.longitude)

class Network(models.Model):
    ssid = models.CharField(max_length=32)
    security = models.CharField(max_length=32)

    def __str__(self):
        return self.ssid

class Router(models.Model):
    network = models.ForeignKey(Network)
    mac = models.CharField(max_length=17)

    def __str__(self):
        return "{}:{}".format(self.network, self.mac)

class Metric(models.Model):
    location = models.ForeignKey(Location)
    router = models.ForeignKey(Router)
    rssi = models.SmallIntegerField()
    snr = models.SmallIntegerField()
    datetime = models.DateTimeField(auto_now_add=True, blank=True)
