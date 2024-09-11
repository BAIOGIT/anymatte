from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from django.core.files.uploadedfile import SimpleUploadedFile
from django.contrib.auth.models import User
from api.models import *
import os

class VideoUploadTestCase(TestCase):
    def setUp(self):
        # Initialize the API client
        self.client = APIClient()

        # Create a user and profile
        self.user = User.objects.create_user(username='asd@asd.asd', password='asdasdasd')
        self.user_profile, created = UserProfile.objects.get_or_create(user=self.user)
        self.client.force_authenticate(user=self.user)

        # Path to your actual video file
        self.video_file_path = '/home/swell/Scaricati/short_demo.mp4'

        # Check if the video file exists
        if not os.path.exists(self.video_file_path):
            raise FileNotFoundError(f'The video file at path {self.video_file_path} does not exist.')

    def test_upload_video(self):
        # Open the actual video file in binary mode
        with open(self.video_file_path, 'rb') as video_file:
            # Create a SimpleUploadedFile object
            video = SimpleUploadedFile('short_demo.mp4', video_file.read(), content_type='video/mp4')

            # Make a POST request to the video upload endpoint
            response = self.client.post(
                reverse('video-upload'),  # Ensure this matches your URL pattern name
                {'video': video},
                format='multipart'
            )

            # Check that the response status code is 201 Created
            self.assertEqual(response.status_code, status.HTTP_201_CREATED)

            # Check that the response contains the expected message
            self.assertEqual(response.data['message'], 'Video uploaded successfully, processing started.')

            # Verify the video was created in the database
            video = Upload.objects.first()
            self.assertIsNotNone(video)
            self.assertEqual(video.user, self.user)
            self.assertTrue(video.video.name.startswith('videos/short_demo'))

            # Verify the uploaded video count increased
            self.user_profile.refresh_from_db()
            self.assertEqual(self.user_profile.uploaded_videos_count, 1)

    def tearDown(self):
        # Clean up the created user and profile if necessary
        User.objects.filter(username='asd@asd.asd').delete()
        UserProfile.objects.filter(user=self.user).delete()
