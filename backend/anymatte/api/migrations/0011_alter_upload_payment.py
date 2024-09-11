# Generated by Django 5.1 on 2024-09-03 15:32

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_remove_payment_stripe_payment_intent_id_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='upload',
            name='payment',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='api.payment', unique=True),
        ),
    ]