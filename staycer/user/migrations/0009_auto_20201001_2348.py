# Generated by Django 3.1.1 on 2020-10-02 03:48

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('project', '0001_initial'),
        ('user', '0008_auto_20200925_2028'),
    ]

    operations = [
        migrations.AlterField(
            model_name='schedule',
            name='project',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='project_schedules', to='project.project'),
        ),
        migrations.AlterField(
            model_name='schedule',
            name='user',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='user_schedules', to=settings.AUTH_USER_MODEL),
        ),
    ]
