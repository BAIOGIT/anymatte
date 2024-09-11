from django.contrib import admin

from .models import *

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'trial_uploaded_files_count', 'credits', 'has_subscription')
    search_fields = ('user__username',)

@admin.register(Upload)
class UploadAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'method', 'args', 'status', 'paid', 'payment', 'file', 'uploaded_at', 'processed_file', 'processed_at')
    search_fields = ('user__username', 'file', 'paid')
    list_filter = ('status',)
    ordering = ('-uploaded_at',)

@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ('id', 'reason', 'uuid', 'status', 'created_at', 'updated_at')
    search_fields = ('id', 'uuid', 'status', 'created_at')
    list_filter = ('status',)
    ordering = ('-created_at',)

@admin.register(Request)
class RequestAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'email', 'subject', 'status', 'created_at')
    search_fields = ('id', 'user', 'email', 'status')
    list_filter = ('status',)
    ordering = ('-created_at',)
