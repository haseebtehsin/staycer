from django.apps import apps
from django.contrib import admin
models = apps.get_models()

# Automatically register all models with admin
for model in models:
    try:
        admin.site.register(model)
    except admin.sites.AlreadyRegistered:
        pass
