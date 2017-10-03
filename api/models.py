from django.db import models

class Pole(models.Model):
    owner = models.CharField(max_length=200)
    lat = models.FloatField()
    lon = models.FloatField()
    pole_id = models.CharField(max_length=200)
    light_type = models.CharField(max_length=200)
    pole_mfg = models.CharField(max_length=200)
    fixture_mfg = models.CharField(max_length=200)
    tech = models.CharField(max_length=200)
    nema = models.CharField(max_length=200)
    fiber = models.CharField(max_length=200)
    wireless = models.CharField(max_length=200)
    energy_use = models.TextField()
    lumens = models.CharField(max_length=200)
    past_energy_use = models.TextField()
    misc = models.TextField()

    def __str__(self):
        return "Placeholder"
    def to_dict(self):
        keys = [field.name for field in self._meta.fields + self._meta.many_to_many]
        model_dict = {}
        for key in keys:
            model_dict[key]=getattr(self, key)
        return model_dict