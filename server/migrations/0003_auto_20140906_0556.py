# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0002_metric_datetime'),
    ]

    operations = [
        migrations.AlterField(
            model_name='metric',
            name='datetime',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
