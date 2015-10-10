
import os

DEBUG = True

DATABASES = {
    "default": {
        # Ends with "postgresql_psycopg2", "mysql", "sqlite3" or "oracle".
        "ENGINE": "django.db.backends.mysql",
        # DB name or path to database file if using sqlite3.
        "NAME": "uplus",
        # Not used with sqlite3.
        "USER": "root",
        # Not used with sqlite3.
        "PASSWORD": "changeit!",
        # Set to empty string for localhost. Not used with sqlite3.
        "HOST": "localhost",
        # Set to empty string for default. Not used with sqlite3.
        "PORT": "3306",
    }
}

ROOT_PATH=os.getcwd()+'/uplus/'
BASE_PATH=os.path.dirname(ROOT_PATH) + '/'
LOGIN_URL = '/backend/login/'
LOGIN_REDIRECT_URL = '/backend/'

DB_TYPE = 'mysql'
DB_STRING='localhost/3306/root/changeit!/uplus'
DB_TABEL_PREFIX='mz_'