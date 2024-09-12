import subprocess
import os
import json
import time
import requests

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
        base_name = os.path.basename(upload_path)
        name_without_extension = os.path.splitext(base_name)[0]
        processed_file_path = f'processed/{name_without_extension}/{base_name}'
        processed_upload_path = os.path.join(media_path, processed_file_path)
        
        # status_file_path = f'processed/{name_without_extension}/status.json'
        
        # api_url = "http://localhost:8188"  # ComfyUI API endpoint

        # # Function to get the current job queue
        # def get_job_queue(api_url):
        #     response = requests.get(f"{api_url}/queue")
            
        #     if response.status_code == 200:
        #         return response.json()  # Returns queue as a list of jobs
        #     else:
        #         raise Exception(f"Failed to retrieve job queue: {response.text}")            

        # # Function to find the job position in the queue
        # def get_job_position(api_url, job_id):
        #     queue = get_job_queue(api_url)
            
        #     # Find the position of the job in the queue (0-indexed, so we add 1)
        #     for position, job in enumerate(queue):
        #         if job.get("job_id") == job_id:
        #             return position + 1  # Return human-readable 1-based position
            
        #     return None  # Job not found in queue

        while True:
            if os.path.exists(processed_upload_path):
                upload.processed_file = processed_file_path
                upload.processed_at = timezone.now()
                upload.status = 'done'
                break
            else:
                # upload.queue_id = get_job_position(api_url, job_id)
                # logger.info(f'sleeping for 3 seconds')
                time.sleep(3)
                # raise Exception("Processed upload file not found")

        logger.info(f'Celery task for upload ID {upload_id} done.')

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
