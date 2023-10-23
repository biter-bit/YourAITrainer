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


class ProgramsUserAPIView(ViewSet, generics.ListAPIView):
    serializer_class = ProgramsSerializer

    def get_queryset(self):
        user = self.request.user.id

        return Program.objects.filter(user_id=user)


class TrainingDayAPIView(ViewSet, generics.ListAPIView):
    queryset = TrainingDay.objects.all()
    serializer_class = TrainingDaySerializer


class TrainingDayUserAPIView(ViewSet, generics.ListAPIView):
    serializer_class = TrainingDaySerializer

    def get_queryset(self):
        program_id = self.request.query_params.get("program_id")
        return TrainingDay.objects.filter(program_id=program_id)


class WorkoutAPIView(ViewSet, generics.ListAPIView):
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer


class WorkoutUserAPIView(ViewSet, generics.ListAPIView):
    serializer_class = WorkoutSerializer

    def get_queryset(self):
        training_day_id = self.request.query_params.get('training_day_id')
        return Workout.objects.filter(training_day_id=training_day_id)


class ApproachesAPIView(ViewSet, generics.ListAPIView):
    queryset = Approach.objects.all()
    serializer_class = ApproachesSerializer


class ApproachesUserAPIView(ViewSet, generics.ListAPIView):
    serializer_class = ApproachesSerializer

    def get_queryset(self):
        workout_id = self.request.query_params.get('workout_id')
        return Approach.objects.filter(workout_id=workout_id)


class UserAllDataView(APIView):
    def get(self, request):
        user_id = request.user.id
        user_programs = Program.objects.filter(user=user_id)
        user_programs_data = ProgramsSerializer(user_programs, many=True).data

        user_training_days = TrainingDay.objects.filter(program__in=user_programs)
        user_training_days_data = TrainingDaySerializer(user_training_days, many=True).data

        user_workouts = Workout.objects.filter(training_day__in=user_training_days)
        user_workouts_data = WorkoutSerializer(user_workouts, many=True).data

        user_approaches = Approach.objects.filter(workout__in=user_workouts)
        user_approaches_data = ApproachesSerializer(user_approaches, many=True).data

        user_data = {
            'programs': user_programs_data,
            'training_days': user_training_days_data,
            'workouts': user_workouts_data,
            'approaches': user_approaches_data
        }

        return Response(user_data)

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
