# Development specific settings
import sys

from .base import *


if 'test' in sys.argv:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': 'testdatabase',
        }
    }
else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql_psycopg2',
            'NAME': 'adventures',
            'USER': 'root',
            'PASSWORD': 'root',
            'HOST': '0.0.0.0',
            'PORT': '',
        }
    }
