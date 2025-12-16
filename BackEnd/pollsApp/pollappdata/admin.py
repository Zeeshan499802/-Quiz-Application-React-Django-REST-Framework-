from django.contrib import admin
from .models import *
# Register your models here.


    
admin.site.register(Question)

class ChoiceAdmin(admin.ModelAdmin):
    list_display = ('choice_text', 'question', 'is_correct')
    
admin.site.register(Choice, ChoiceAdmin)
admin.site.register(Result)