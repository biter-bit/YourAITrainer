from rest_framework import generics
from django.shortcuts import render
from .models import Programs, Workout, TrainingDay, Approaches
from .serializers import ProgramsSerializer, TrainingDaySerializer, WorkoutSerializer, ApproachesSerializer


class ProgramsAPIView(generics.ListAPIView):
    queryset = Programs.objects.all()
    serializer_class = ProgramsSerializer


class TrainingDayAPIView(generics.ListAPIView):
    queryset = TrainingDay.objects.all()
    serializer_class = TrainingDaySerializer


class WorkoutAPIView(generics.ListAPIView):
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer


class ApproachesAPIView(generics.ListAPIView):
    queryset = Approaches.objects.all()
    serializer_class = ApproachesSerializer

