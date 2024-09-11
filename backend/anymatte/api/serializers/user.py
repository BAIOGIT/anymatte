from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import authenticate

from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.response import Response
from rest_framework import status

from ..models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        userprofile = user.userprofile

        # Add custom claims
        token['id'] = user.id
        # token['userprofile'] = userprofile
        token['username'] = userprofile.get_username()
        token['email'] = user.email

        return token

    @classmethod
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            user = authenticate(username=request.data.get('username'), password=request.data.get('password'))
            if user:
                # refresh = RefreshToken.for_user(user)
                # return Response({
                #     'refresh': str(refresh),
                #     'access': str(refresh.access_token),
                # })
                token = serializer.get_token(user)  # Use the custom get_token method
                return Response({
                    'refresh': str(token),
                    'access': str(token.access_token),
                })
            else:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
    # @classmethod
    # def validate(self, attrs):
    #     print(attrs)
    #     username = attrs.get('username')
    #     password = attrs.get('password')

    #     # Check if username is an email
    #     user = None
    #     if '@' in username:
    #         try:
    #             user = User.objects.get(email=username)
    #             username = user.username
    #             user = authenticate(username=user, password=password)
    #         except User.DoesNotExist:
    #             user = None
    #     else:
    #         # Try to authenticate with username
    #         user = authenticate(username=username, password=password)

    #     print(user)
    #     if user is None:
    #         raise serializers.ValidationError('Invalid credentials.')

    #     # If authentication is successful, return the token data
    #     return super().validate(attrs)

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, 
        required=True, 
        validators=[validate_password]
        )
    password2 = serializers.CharField(
        write_only=True, 
        required=True
        )

    class Meta:
        model = User
        fields = ('email', 'username', 'password', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email']
        )

        user.set_password(validated_data['password'])
        user.save()

        return user