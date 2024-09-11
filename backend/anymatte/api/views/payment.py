from django.conf import settings

from django.http import JsonResponse, HttpResponse
from django.shortcuts import render

from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404

import json
import stripe

from ..models import *

# Stripe requires you to verify the webhook's signature
stripe.api_key = settings.STRIPE_SECRET_KEY

@csrf_exempt  # Disable CSRF protection for the webhook endpoint
def stripe_webhook(request):
    payload = request.body
    sig_header = request.META.get('HTTP_STRIPE_SIGNATURE')
    endpoint_secret = 'whsec_VTyUWhuSXgXmAW8Fn7anbDD75mWMnC5h'

    try:
        event = stripe.Webhook.construct_event(payload, sig_header, endpoint_secret)
    except ValueError as e:
        return JsonResponse({'error': 'Invalid payload'}, status=400)
    except stripe.error.SignatureVerificationError as e:
        return JsonResponse({'error': 'Invalid signature'}, status=400)

    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']
        unique_session_id = session.get('metadata', {}).get('uniqueSessionId')
        
        # Mark the payment as completed in your database
        payment = Payment.objects.filter(uuid=unique_session_id).first()
        if payment:
            payment.status = 'success'
            payment.save()

            # # Link the payment to the corresponding upload
            # upload = Upload.objects.get(payment=unique_session_id)
            # upload.paid = True
            # upload.payment = payment
            # upload.save()

    return JsonResponse({'status': 'success'}, status=200)

@csrf_exempt
def create_checkout_session(request):
    body = json.loads(request.body)
    unique_session_id = body.get('uniqueSessionId')

    reason = body.get('reason')
    mode = body.get('mode')
    price_id = body.get('price_id')
    quantity = body.get('quantity')

    # Create the Payment object
    payment = Payment.objects.create(
        uuid=unique_session_id,
        reason=reason,
    )

    # Create a checkout session
    session = stripe.checkout.Session.create(
        payment_method_types=['card'],
        line_items=[{
            'price': price_id,  # Replace with your actual price ID
            'quantity': str(quantity),
        }],
        mode=mode,
        # success_url='https://anymatte.com/success?session_id={CHECKOUT_SESSION_ID}',
        success_url=f'{settings.STRIPE_REDIRECT_SERVER}/payment-successful',
        cancel_url=f'{settings.STRIPE_REDIRECT_SERVER}/cancel',
        metadata={'uniqueSessionId': unique_session_id}
    )

    return JsonResponse({'checkoutUrl': session.url})

@csrf_exempt
def check_payment_status(request):
    if request.method == 'GET':
        unique_session_id = request.GET.get('uniqueSessionId')
        
        if not unique_session_id:
            return JsonResponse({'error': 'uniqueSessionId parameter is required'}, status=400)

        try:
            # Check the payment status in your Payment model
            payment = Payment.objects.filter(uuid=unique_session_id).first()
            if payment.status == 'success':
                return JsonResponse({'paid': payment.status})
            else:
                return JsonResponse({'error': 'Payment not found'}, status=404)
        
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
        
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)
    
@csrf_exempt
def add_credit(request):    
    body = json.loads(request.body)
    user_id = body.get('user_id')
    quantity = body.get('quantity')

    # Get the user object, ensure the user is the logged-in user
    user = get_object_or_404(User, id=user_id)

    if request.method == 'POST':
        try:
            user_profile = user.userprofile
            user_profile.credits += int(quantity)
            user_profile.save()

            return JsonResponse({
                'status': 'success',
                'credits': user_profile.credits
            }, status=200)
        except UserProfile.DoesNotExist:
            return JsonResponse({
                'status': 'error',
                'message': 'UserProfile does not exist.'
            }, status=400)
        except Exception as e:
            return JsonResponse({
                'status': 'error',
                'message': str(e)
            }, status=500)
    else:
        return JsonResponse({
            'status': 'error',
            'message': 'Invalid request method.'
        }, status=405)
    
def payment_successful(request):
    # Add logic to handle successful payment here, e.g., updating order status
    # You can render a template or redirect
    return render(request, 'payment_successful.html')

def payment_cancel(request):
    # Add logic to handle canceled payment here
    # You can render a template or redirect
    return render(request, 'payment_cancel.html')

def auto_close(request):
    # Add logic to handle canceled payment here
    # You can render a template or redirect
    return render(request, 'auto_close.html')