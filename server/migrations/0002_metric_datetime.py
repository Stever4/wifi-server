# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='metric',
            name='datetime',
            field=models.DateTimeField(default=datetime.date(2014, 9, 6)),
            preserve_default=False,
        ),
    ]
