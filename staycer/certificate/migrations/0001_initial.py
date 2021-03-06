# Generated by Django 3.1.1 on 2020-09-13 13:39

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Certificate',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField(unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Certification',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('issue_date', models.DateField()),
                ('expiry_date', models.DateField()),
                ('validated', models.BooleanField(default=False)),
                ('picture', models.ImageField(blank=True, max_length=255, null=True, upload_to='')),
                ('certificate', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='certificate.certificate')),
            ],
        ),
    ]
