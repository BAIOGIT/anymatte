import json

import logging
# Get the Django logger
logger = logging.getLogger('django')

from django.contrib.auth.models import User

from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.utils.crypto import get_random_string

from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import api_view

from ..tasks import *
from ..models import *
from ..serializers import *

@api_view(['GET', 'OPTIONS'])
def check_upload_permission(request):
    if request.method == 'OPTIONS':
        # Handle OPTIONS request
        return Response({
            'allowed_methods': ['GET']
        }, status=200)
    
    if request.user.is_authenticated:
        # Handle authenticated users
        user_profile = request.user.userprofile
        can_upload = user_profile.can_upload_file()

        upload_mode = user_profile.get_upload_count()

        if upload_mode[0] == 'trial':
            response_data = {
                'mode': upload_mode[0],
                'is_registered': True,
                'can_upload': can_upload,
                'upload_count': upload_mode[1],
                'max_upload_count': upload_mode[2],
            }
        elif upload_mode[0] == 'credits':
            response_data = {
                'mode': upload_mode[0],
                'is_registered': True,
                'can_upload': can_upload,
                'max_upload_count': upload_mode[1],
            }
        elif upload_mode[0] == 'subscription':
            response_data = {
                'mode': upload_mode[0],
                'is_registered': True,
                'can_upload': can_upload,
            }
        elif upload_mode[0] == 'empty':
            response_data = {
                'mode': upload_mode[0],
                'is_registered': True,
                'can_upload': can_upload,
            }
        else:
            pass

    else:
        response_data = {
            'mode': 'standard',
            'is_registered': False,
            'can_upload': True,
            'upload_count': 0,
            'max_upload_count': 1,
        }
    return JsonResponse(response_data)

class UploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def associate_payment(self, file, paymentUuid, paid):

        file = Upload.objects.get(id=file.id)
        file.status = 'processing'

        if paymentUuid != None:
            payment = Payment.objects.get(uuid=paymentUuid)
            file.payment = payment
            
        file.paid = paid
        file.save()

        return file
    
    def post(self, request, *args, **kwargs):
        payment_uuid = request.POST.getlist('paymentUuid')[0]

        upload_file = request.FILES.get('file')
        if not upload_file:
            return Response({"error": "No file provided"}, status=status.HTTP_400_BAD_REQUEST)

        user = request.user if request.user.is_authenticated else None

        if not user:
            # Create a temporary user if not authenticated
            username = get_random_string(length=10)
            password = get_random_string(length=12)  # Temporary password
            user = User.objects.create(username=username, password=password)
            user.set_unusable_password()  # Set unusable password since it's a temporary user
            user.save()

        method = request.POST.get('method')
        args = request.POST.get('args')  # You might get args as a string
        try:
            args_dict = json.loads(args) if args else {}  # Safely parse the args
        except json.JSONDecodeError:
            return Response({"error": "Invalid args format"}, status=status.HTTP_400_BAD_REQUEST)
        
        logger.info(f"-- FILE: {upload_file}")
        logger.info(f"-- METHOD: {method}")
        logger.info(f"-- ARGS: {args_dict}")

        # Create and save the file
        instance_file = Upload.objects.create(user=user, file=upload_file, method=method, args=args_dict)
        
        if payment_uuid != 'null':
            file = self.associate_payment(file=instance_file, paymentUuid=payment_uuid, paid=True)
        else:
            # Handle the case where 'value' is None
            file = self.associate_payment(file=instance_file, paymentUuid=None, paid=True)
        
        # if copy_file_to_share(instance_file.id):
        # Trigger file processing task (Celery or any other background task queue)
        process_upload_task.delay(instance_file.id, method, args_dict)
        
        # If user was not authenticated, return a token or ID to allow retrieval later
        if not request.user.is_authenticated:
            # Return temporary user information
            return Response({
                "message": "File uploaded successfully, processing started.",
                'paymentUuid': payment_uuid,
                "user_id": user.id,
                "file_id": instance_file.id
            }, status=status.HTTP_201_CREATED)

        # Handle authenticated user
        try:
            user_profile = get_object_or_404(UserProfile, user=user)
            if not user_profile.can_upload_file():
                return Response({"error": "Upload limit reached or subscription required"}, status=status.HTTP_403_FORBIDDEN)

            # Update the uploaded file count            
            if user_profile.trial_uploaded_files_count == user_profile.max_upload_count and user_profile.credits != 0:
                user_profile.credits -= 1

            if user_profile.trial_uploaded_files_count <= user_profile.max_upload_count:            
                user_profile.trial_uploaded_files_count += 1
            else:
                user_profile.trial_uploaded_files_count = user_profile.max_upload_count

            user_profile.save()

            return Response({"message": "File uploaded successfully, processing started.",
                'paymentUuid': payment_uuid,
                "user_id": user.id,
                "file_id": instance_file.id
                }, status=status.HTTP_201_CREATED)

        except UserProfile.DoesNotExist:
            return Response({"error": "User profile not found."}, status=status.HTTP_404_NOT_FOUND)
        
class UploadStatusView(APIView):
    def get(self, request, file_id):
        file = get_object_or_404(Upload, id=file_id)

        response_data = {
            "status": file.status,
        }

        if file.processed_file and file.status == 'done':
            response_data["processed_file_url"] = file.processed_file.url
        else:
            response_data["processed_file_url"] = None

        return Response(response_data, status=status.HTTP_200_OK)


# class UploadView(APIView):
#     parser_classes = (MultiPartParser, FormParser)

#     def associate_payment(self, file, paymentUuid, paid):

#         file = Upload.objects.get(id=file.id)
#         file.status = 'processing'

#         if paymentUuid:
#             payment = Payment.objects.get(uuid=paymentUuid)
#             file.payment = payment

#         file.paid = paid
#         file.save()

#         return file
    
#     def post(self, request, *args, **kwargs):
#         payment_uuid = request.POST.getlist('paymentUuid')[0]


#         upload_file = request.FILES.get('file')
#         if not upload_file:
#             return Response({"error": "No file provided"}, status=status.HTTP_400_BAD_REQUEST)

#         user = request.user if request.user.is_authenticated else None

#         if not user:
#             # Create a temporary user if not authenticated
#             username = get_random_string(length=10)
#             password = get_random_string(length=12)  # Temporary password
#             user = User.objects.create(username=username, password=password)
#             user.set_unusable_password()  # Set unusable password since it's a temporary user
#             user.save()

#         # Create and save the file
#         instance_file = Upload.objects.create(user=user, file=upload_file)

#         if payment_uuid != 'null':
#             file = self.associate_payment(file=instance_file, paymentUuid=payment_uuid, paid=True)
#         else:
#             # Handle the case where 'value' is None
#             file = self.associate_payment(file=instance_file, paid=True)
        
#         # Trigger file processing task (Celery or any other background task queue)
#         process_upload_task.delay(instance_file.id)  # Uncomment this line if using Celery
        
#         # If user was not authenticated, return a token or ID to allow retrieval later
#         if not request.user.is_authenticated:
#             # Return temporary user information
#             return Response({
#                 "message": "File uploaded successfully, processing started.",
#                 # 'paymentUuid': payment_uuid,
#                 "user_id": user.id,
#                 "file_id": instance_file.id
#             }, status=status.HTTP_201_CREATED)

#         # Handle authenticated user
#         try:
#             user_profile = get_object_or_404(UserProfile, user=user)
#             if not user_profile.can_upload_file():
#                 return Response({"error": "Upload limit reached or subscription required"}, status=status.HTTP_403_FORBIDDEN)

#             # Update the uploaded file count
#             user_profile.trial_uploaded_files_count += 1
#             user_profile.save()

#             return Response({"message": "File uploaded successfully, processing started.",
#                 # 'paymentUuid': payment_uuid,
#                 "user_id": user.id,
#                 "file_id": instance_file.id
#                 }, status=status.HTTP_201_CREATED)

#         except UserProfile.DoesNotExist:
#             return Response({"error": "User profile not found."}, status=status.HTTP_404_NOT_FOUND)
        