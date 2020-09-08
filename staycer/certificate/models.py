from django.db import models
from django.contrib.auth.models import AbstractUser
from phone_field import PhoneField
from user.models import User


class Certificate(models.Model):
    name = models.TextField(unique=True)


class Certification(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='certifications')
    certificate = models.ForeignKey(Certificate, on_delete=models.CASCADE)
    issue_date = models.DateField()
    expiry_date = models.DateField()
    validated = models.BooleanField(default=False)
