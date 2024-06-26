from django.db import models

# Create your models here.


class Item(models.Model):
    checked = models.BooleanField()
    description = models.CharField(max_length=200, blank=True)

    def __str__(self):
        return self.description
