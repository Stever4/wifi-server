# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0003_auto_20140906_0556'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='metric',
            name='snr',
        ),
    ]
