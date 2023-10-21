from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ViewSet
from .models import Program, Workout, TrainingDay, Approach
from .serializers import ProgramsSerializer, TrainingDaySerializer, WorkoutSerializer, ApproachesSerializer, \
    GenerationSerializer
from .tasks import start_program_generation
from celery.result import AsyncResult


class ProgramsAPIView(ViewSet, generics.ListAPIView):
    queryset = Program.objects.all()
    serializer_class = ProgramsSerializer


class TrainingDayAPIView(ViewSet, generics.ListAPIView):
    queryset = TrainingDay.objects.all()
    serializer_class = TrainingDaySerializer


class WorkoutAPIView(ViewSet, generics.ListAPIView):
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer


class ApproachesAPIView(ViewSet, generics.ListAPIView):
    queryset = Approach.objects.all()
    serializer_class = ApproachesSerializer


class GenerationAPIView(APIView):
    def post(self, request):
        user = request.user
        serializer = GenerationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        # user.gender = data['gender']
        # user.age = data['age']
        # user.weight = data['weight']
        # user.height = data['height']
        # user.training_level = data['training_level']
        # user.purpose_of_training = data['purpose_of_training']
        # user.save()

        result = start_program_generation.delay(
            user_id=user.id,
            gender=data['gender'],
            age=data['age'],
            weight=data['weight'],
            height=data['height'],
            training_level=data['training_level'],
            purpose_of_training=data['purpose_of_training']
        )

        return Response({'status': 'generation_started', 'number_task': result.id})


class CheckTaskCelery(APIView):
    def get(self, request):
        task_id = request.query_params.get('task_id')
        task = AsyncResult(task_id)
        if task.ready():
            if task.successful():
                result = task.result
                return Response({"status": "Success", 'result': result})
            else:
                return Response({"status": "Fail", 'result': 'Task failed'})

        return Response({"status": "Panding"})
