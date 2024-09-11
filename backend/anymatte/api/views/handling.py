from django.contrib.auth.models import User

from django.shortcuts import get_object_or_404
from django.http import JsonResponse

from rest_framework.decorators import api_view

from ..models import *

@api_view(['GET', 'OPTIONS'])
def get_files(request, user_id):
    # Get the user object, ensure the user is the logged-in user
    user = get_object_or_404(User, id=user_id)

    # Check if the logged-in user is requesting their own files
    if request.user.id != user.id:
        return JsonResponse({'error': 'Unauthorized access'}, status=403)

    # Retrieve the files for the user
    user_files = Upload.objects.filter(user=user)

    # Serialize the data (assuming Upload has 'id', 'file_name', 'file_url' fields)
    files_data = {
        f.id: {
            'file_name': f'{f.file.name.replace('uploads/', '')}',
            'status': f'{f.status.capitalize()}',
            'uploaded_at': f.uploaded_at,
            'processed_at': f.processed_at,
            'paid': f.paid,
            'url': f.processed_file.name,
            'error_message': f.error_message,
        } for f in user_files
    }
    
    # Return the files as JSON response
    return JsonResponse(files_data, status=200)