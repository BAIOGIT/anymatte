from django.http import JsonResponse
from django.shortcuts import render

from rest_framework import generics, status
from rest_framework.response import Response

from rest_framework.decorators import api_view

from ..models import *


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token/',
        '/api/register/',
        '/api/token/refresh/'
    ]
    return Response(routes)

@api_view(['GET', 'OPTIONS'])
def get_status(request):
    if request.method == 'OPTIONS':
        # Handle OPTIONS request
        return Response({
            'allowed_methods': ['GET']
        }, status=200)
    
    response_data = {
        'status': 'active',
    }

    return JsonResponse(response_data)

@api_view(['POST'])
def create_request(request):
    try:
        # Extract data from request
        user = request.data.get('user', '')
        email = request.data.get('email', '')
        subject = request.data.get('subject', '')
        message = request.data.get('message', '')
        status_value = request.data.get('status', 'pending')

        # Create new Requests object
        new_request = Request.objects.create(
            user=user,
            email=email,
            subject=subject,
            message=message,
            status=status_value,
        )

        # Return a success response
        return Response({'message': 'Request created successfully!'}, status=status.HTTP_201_CREATED)
    
    except Exception as e:
        # Return an error response
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    