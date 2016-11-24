import os

if os.getenv('HEROKU') is not None:
    from .production_settings import *
else:
    from .development_settings import *