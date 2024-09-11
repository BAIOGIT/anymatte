from django.urls import path

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

from .views import *

urlpatterns = [
    path('status/', get_status, name='status'),
    path('request/', create_request, name='create_request'),

    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='auth_register'),
    
    path('can-upload/', check_upload_permission, name='check_upload_permission'),

    path('webhook/stripe/', stripe_webhook, name='stripe-webhook'),
    path('create-checkout-session/', create_checkout_session, name='create-checkout-session'),
    path('check-payment-status/', check_payment_status, name='check-payment-status'),

    path('add-credit/', add_credit, name='add-credit'),

    path('upload-file/', UploadView.as_view(), name='file-upload'),
    path('status/<int:file_id>/', UploadStatusView.as_view(), name='file-status'),

    path('get-files/<int:user_id>/', get_files, name='get_files'),    

    # path('payment-successful/', payment_successful, name='payment_successful'),
    # path('cancel/', payment_cancel, name='payment_cancel'),
    # path('auto-close/', auto_close, name='auto-close'),

]
