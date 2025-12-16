from django.db import models

# Create your models here.


class Question(models.Model):
    question_text = models.CharField(max_length=300)
    

    def __str__(self):
        return self.question_text
      
class Choice(models.Model):
  question = models.ForeignKey(Question, on_delete=models.CASCADE)
  choice_text = models.CharField(max_length=200)
  is_correct = models.BooleanField(default=False)
 
  
  def __str__(self):
     return self.choice_text
   

class Result(models.Model):
    total_questions = models.IntegerField()
    correct_answers = models.IntegerField()
    incorrect_answers = models.IntegerField()
    passed = models.BooleanField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.correct_answers}/{self.total_questions}"