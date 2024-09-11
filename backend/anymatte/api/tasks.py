import subprocess
import os
import json
import time

import logging
# Get the Django logger
logger = logging.getLogger('django')

from django.utils import timezone
from celery import shared_task

from .models import *
    
@shared_task(queue='process')
def process_upload_task(upload_id, method, args_dict):
    try:
        upload = Upload.objects.get(id=upload_id)

        media_path = './media'

        upload_path = upload.file.path

        try_count = 0
        while True:
            if not os.path.isfile(upload_path):
                try_count += 1
                time.sleep(2)
                if try_count > 10:
                    raise Exception("Source upload file not found")
            else:
                break

        # # Path to the shell script
        # comfyui_script_path = '../core/workflows/BiRefNet_Hugo_simple/execute.sh'        
        # result = subprocess.run([comfyui_script_path, upload_path], capture_output=True, text=True)

        if method == 'text': 
            comfyui_script_path = '../core/workflows/BiRefNet_Hugo_simple/execute.sh'
        elif method == 'pick': 
            comfyui_script_path = '../core/workflows/BiRefNet_Hugo_simple/execute.sh'
        elif method == 'human': 
            comfyui_script_path = '../core/workflows/BiRefNet_Hugo_simple/execute.sh'
        elif method == 'face': 
            comfyui_script_path = '../core/workflows/BiRefNet_Hugo_simple/execute.sh'
        else:
            raise Exception("method not found")
        
        args_json = json.dumps(args_dict)

        logger.info(f'Running celery task for upload ID {upload_id}, using method {method} with args {args_json}')

        result = subprocess.run([comfyui_script_path, upload_path, args_json], capture_output=True, text=True)
        if result.returncode != 0:
            raise Exception(f"Script failed with output: {result.stderr}")

        # Assuming the processed upload is saved with the same name but in a different directory
        processed_upload_path = os.path.join(media_path, upload_path)
        
        if os.path.exists(processed_upload_path):
            base_name = os.path.basename(upload_path)
            name_without_extension = os.path.splitext(base_name)[0]
            upload.processed_file = f'processed/{name_without_extension}/{base_name}'
            upload.processed_at = timezone.now()
            upload.status = 'done'
        else:
            raise Exception("Processed upload file not found")

    except Exception as e:
        upload.status = 'failed'
        print(f"Error processing upload {upload_id}: {e}")

    upload.save()

# @shared_task(queue='process')
# def process_file_task(upload_id):
#     try:
#         # Path to the shell script
#         comfyui_script_path = '../core/workflows/BiRefNet_Hugo_simple/execute.sh'

#         upload = Upload.objects.get(id=upload_id)

#         media_path = './media'

#         upload_path = upload.file.path

#         try_count = 0
#         while True:
#             if not os.path.isfile(upload_path):
#                 try_count += 1
#                 time.sleep(2)
#                 if try_count > 10:
#                     raise Exception("Source upload file not found")
#             else:
#                 break
        
#         result = subprocess.run([comfyui_script_path, upload_path], capture_output=True, text=True)
#         if result.returncode != 0:
#             raise Exception(f"Script failed with output: {result.stderr}")

#         # Assuming the processed upload is saved with the same name but in a different directory
#         processed_upload_path = os.path.join(media_path, upload_path)
        
#         if os.path.exists(processed_upload_path):
#             base_name = os.path.basename(upload_path)
#             name_without_extension = os.path.splitext(base_name)[0]
#             upload.processed_file = f'processed/{name_without_extension}/{base_name}'
#             upload.processed_at = timezone.now()
#             upload.status = 'done'
#         else:
#             raise Exception("Processed upload file not found")

#     except Exception as e:
#         upload.status = 'failed'
#         print(f"Error processing upload {upload_id}: {e}")

#     upload.save()
