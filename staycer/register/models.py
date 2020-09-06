from django.db import models
from django.contrib.auth.models import AbstractUser
from phone_field import PhoneField


class Address(models.Model):
    street = models.TextField()
    city = models.TextField()
    province = models.TextField()
    country = models.TextField()


class Company(models.Model):
    name = models.TextField()
    phone = PhoneField(blank=True, help_text='Contact phone number')
    address = models.OneToOneField(
        Address, on_delete=models.CASCADE, null=True, blank=True)


class User(AbstractUser):
    HUMAN_RESOURCE = "HR"
    ROLE_CHOICES = (
        (HUMAN_RESOURCE, 'Human_Resource'),
    )
    role = models.CharField(max_length=2,
                            choices=ROLE_CHOICES,
                            default=HUMAN_RESOURCE,
                            blank=True)
    phone = PhoneField(blank=True, help_text='Contact phone number')
    address = models.OneToOneField(
        Address, on_delete=models.CASCADE, null=True, blank=True)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
