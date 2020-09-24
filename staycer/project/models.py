from django.db import models

# Create your models here.


class Project(models.Model):
    name = models.TextField(unique=True)
