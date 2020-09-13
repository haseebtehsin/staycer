from django.utils.translation import gettext_lazy as _
from django.contrib.auth.base_user import BaseUserManager
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import AbstractBaseUser
from phone_field import PhoneField
from django.utils import timezone


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


class UserManager(BaseUserManager):
    def create_user(
            self, email, first_name, last_name, password=None,
            commit=True):
        """
        Creates and saves a User with the given email, first name, last name
        and password.
        """
        if not email:
            raise ValueError(_('Users must have an email address'))

        user = self.model(
            email=self.normalize_email(email),
            first_name=first_name,
            last_name=last_name,
        )

        user.set_password(password)
        if commit:
            user.save(using=self._db)
        return user

    def create_superuser(self, email, password, first_name="", last_name=""):
        """
        Creates and saves a superuser with the given email, first name,
        last name and password.
        """

        # TODO: Create company "staycer" if it doesn't exist and then add superuser
        # for that company
        user = self.create_user(
            email,
            password=password,
            first_name=first_name,
            last_name=last_name,
            commit=False,
        )
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser, PermissionsMixin):
    HUMAN_RESOURCE = "HR"
    WORKER = "WK"
    ROLE_CHOICES = (
        (HUMAN_RESOURCE, 'Human_Resource'),
        (WORKER, 'Worker'),
    )
    role = models.CharField(max_length=2,
                            choices=ROLE_CHOICES,
                            default=HUMAN_RESOURCE,
                            blank=True)
    # password field supplied by AbstractBaseUser
    # last_login field supplied by AbstractBaseUser

    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    email = models.EmailField(
        verbose_name=_('email address'), max_length=255, unique=True
    )

    is_active = models.BooleanField(
        _('active'),
        default=True,
        help_text=_(
            'Designates whether this user should be treated as active. '
            'Unselect this instead of deleting accounts.'
        ),
    )
    is_staff = models.BooleanField(
        _('staff status'),
        default=False,
        help_text=_(
            'Designates whether the user can log into this admin site.'
        ),
    )
    # is_superuser field provided by PermissionsMixin
    # groups field provided by PermissionsMixin
    # user_permissions field provided by PermissionsMixin

    date_joined = models.DateTimeField(
        _('date joined'), default=timezone.now
    )

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def get_full_name(self):
        """
        Return the first_name plus the last_name, with a space in between.
        """
        full_name = '%s %s' % (self.first_name, self.last_name)
        return full_name.strip()

    def __str__(self):
        return '{} <{}>'.format(self.get_full_name(), self.email)

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True


class Profile(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, null=True, blank=True, related_name='profile')
    first_name = models.CharField(_('first name'), max_length=30, blank=True)
    last_name = models.CharField(_('last name'), max_length=150, blank=True)
    phone = PhoneField(blank=True, help_text='Contact phone number')
    address = models.OneToOneField(
        Address, on_delete=models.CASCADE, null=True, blank=True)
    picture = models.ImageField(max_length=255, null=True, blank=True)
