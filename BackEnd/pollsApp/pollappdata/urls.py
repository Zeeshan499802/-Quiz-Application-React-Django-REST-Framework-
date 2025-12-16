from django.urls import path
from .views import *
urlpatterns = [
    path('QuestionAPIView/', QuestionAPIView, name='question-list'),
    path('QuestionAPIView/<int:pk>/', QuestionAPIView, name='question-detail'),  
    path('ChoiceAPIView/', ChoiceAPIView, name='choice-list'),  
    path("ResultAPIView/", ResultAPIView, name='result-test'),
]
