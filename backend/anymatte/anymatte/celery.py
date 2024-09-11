from __future__ import absolute_import, unicode_literals
import os
from celery import Celery  # Fixed import statement

from .settings import INSTALLED_APPS

# Set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'anymatte.settings')

# Create an instance of Celery
app = Celery('anymatte')
app.conf.broker_connection_retry_on_startup = True

# Use a string here to ensure the worker does not have to serialize the configuration object to child processes.
app.config_from_object('django.conf:settings', namespace='CELERY')

# Load task modules from all registered Django app configs.
app.autodiscover_tasks(lambda: INSTALLED_APPS)  # Updated to use lambda function to retrieve settings

# Optional: Add this line if you want to ensure that tasks are registered.
@app.task(bind=True)
def debug_task(self):
    print(f'Request: {self.request!r}')

