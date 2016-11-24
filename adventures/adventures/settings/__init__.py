import os

if os.getenv('HEROKU'):
    from .production_settings import *
else:
    from .development_settings import *