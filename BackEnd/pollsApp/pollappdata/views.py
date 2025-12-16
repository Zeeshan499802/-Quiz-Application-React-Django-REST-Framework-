from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializers import *


@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def QuestionAPIView(request, pk=None):

    # ---------- GET ----------
    if request.method == 'GET':
        if pk:
            try:
                question = Question.objects.get(id=pk)
            except Question.DoesNotExist:
                return Response(
                    {"error": "Question not found"},
                    status=status.HTTP_404_NOT_FOUND
                )

            serializer = QuestionSerializers(question)
            return Response(serializer.data)

        questions = Question.objects.all()
        serializer = QuestionSerializers(questions, many=True)
        return Response(serializer.data)




@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def ChoiceAPIView(request):
    if request.method == 'GET':
        choices = Choice.objects.all()
        serializer = ChoiceSerializers(choices, many=True)
        return Response(serializer.data)




@api_view(['POST', 'GET'])
def ResultAPIView(request):

    if request.method == 'POST':
        answers = request.data.get("answers", [])

        total_questions = len(answers)
        correct_answers = 0
        incorrect_answers = 0

        for ans in answers:
            try:
                choice = Choice.objects.get(
                    id=ans["choice"],
                    question_id=ans["question"]
                )
                if choice.is_correct:
                    correct_answers += 1
                else:
                    incorrect_answers += 1
            except Choice.DoesNotExist:
                incorrect_answers += 1

        passed = correct_answers >= (total_questions * 0.5)  # 50% pass

        result = Result.objects.create(
            total_questions=total_questions,
            correct_answers=correct_answers,
            incorrect_answers=incorrect_answers,
            passed=passed
        )

        serializer = ResultSerializer(result)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    # ---------- GET ALL RESULTS ----------
    if request.method == 'GET':
        results = Result.objects.all().order_by('-created_at')
        serializer = ResultSerializer(results, many=True)
        return Response(serializer.data)
