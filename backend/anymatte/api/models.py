import uuid as uuid_lib

from django.db import models
from django.contrib.auth.models import User

class Request(models.Model):
    user = models.CharField(max_length=255, blank=True, null=True)  # Assuming 'user' is the name
    email = models.EmailField(max_length=255, blank=True, null=True)
    subject = models.CharField(max_length=255, blank=True, null=True)
    message = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=50, default='pending')  # 'pending', 'succeeded', 'failed'
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)  # Automatically updates when the object is saved

    def __str__(self):
        return f'Request {self.id} - {self.status}'
    
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    trial_uploaded_files_count = models.PositiveIntegerField(default=0)
    max_upload_count = 3
    has_subscription = models.BooleanField(default=False)
    stripe_customer_id = models.CharField(max_length=255, blank=True, null=True)
    stripe_subscription_id = models.CharField(max_length=255, blank=True, null=True)
    stripe_subscription_status = models.BooleanField(default=False)
    credits = models.PositiveIntegerField(default=0)


    def __str__(self):
        return self.user.username
    
    def get_username(self):
        return self.user.username
    
    def can_upload_file(self):
        return self.trial_uploaded_files_count < self.max_upload_count or self.credits > 0 or self.has_subscription
    
    def get_upload_count(self):
        if self.trial_uploaded_files_count < self.max_upload_count:
            return 'trial', self.trial_uploaded_files_count, self.max_upload_count
        elif self.credits > 0:
            return 'credits', self.credits        
        elif self.has_subscription:
            return 'subscription'       
        else:
            return 'empty'
    
class Payment(models.Model):
    uuid = models.CharField(max_length=255, unique=True, blank=True, null=True)
    status = models.CharField(max_length=50, default='pending')  # 'pending', 'succeeded', 'failed'
    reason = models.CharField(max_length=50, default='')  # 'generation', 'credit', 'subscription'
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    # def save(self, *args, **kwargs):
    #     if self.uuid == None:
    #         self.uuid = str(uuid_lib.uuid4())
    #     super().save(*args, **kwargs)
    
    def __str__(self):
        if self.uuid == None:
            return 'none'
        else:
            return self.uuid
    
    def get_uuid(self):
        return self.uuid
    
    
class Upload(models.Model):
    user = models.ForeignKey(User, null=True, on_delete=models.CASCADE)    
    file = models.FileField(upload_to='uploads/', max_length=500)
    method = models.CharField(max_length=50, default='', blank=True) # 'text', 'pick', 'human', 'face'
    args = models.JSONField(default=dict, blank=True)
    processed_file = models.FileField(upload_to='processed/', null=True, blank=True, max_length=500)
    status = models.CharField(max_length=50, default='pending') # 'pending', 'processing', 'done', 'failed'    
    uploaded_at = models.DateTimeField(auto_now_add=True)  # Timestamp when the file is uploaded
    processed_at = models.DateTimeField(null=True, blank=True)  # Timestamp when processing is completed    
    error_message = models.TextField(null=True, blank=True)  # Stores any error messages if processing fails  
    payment = models.ForeignKey(Payment, on_delete=models.CASCADE, null=True, blank=True)  
    paid = models.BooleanField(default=False)
    
    def __str__(self):
        return f'{self.file.name} - {self.status}'
