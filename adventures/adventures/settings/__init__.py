import os

from .base import *

if os.getenv('HEROKU'):
    DEBUG = False
else:
    DEBUG = True
