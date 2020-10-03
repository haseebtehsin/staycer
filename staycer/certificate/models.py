from django.db import models
from django.contrib.auth.models import AbstractUser
from phone_field import PhoneField
from user.models import User, Address


class Institute(models.Model):
    name = models.TextField(unique=True)
    address = models.OneToOneField(
        Address, on_delete=models.CASCADE, null=True, blank=True)


class Certificate(models.Model):
    name = models.TextField(unique=True)
    institute = models.ForeignKey(
        Institute, on_delete=models.CASCADE, related_name='certificates',
        null=True, blank=True)


class Certification(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='certifications')
    certificate = models.ForeignKey(Certificate, on_delete=models.CASCADE)
    issue_date = models.DateField()
    expiry_date = models.DateField()
    tracking = models.BooleanField(default=True)
    picture = models.ImageField(max_length=255, null=True, blank=True)


class Trade(models.Model):
    name = models.TextField(unique=True, max_length=30)
    certificates = models.ManyToManyField(
        Certificate, related_name='trades')
