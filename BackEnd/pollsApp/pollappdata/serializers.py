from rest_framework import serializers
from .models import Question, Choice, Result

class QuestionSerializers(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'
        
class ChoiceSerializers(serializers.ModelSerializer):
  class Meta:
      model = Choice
      fields = '__all__'
      
class ResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = Result
        fields = "__all__"