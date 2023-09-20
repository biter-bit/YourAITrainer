from rest_framework import generics
from rest_framework.viewsets import ViewSet
# from django.shortcuts import render
from .models import Programs, Workout, TrainingDay, Approaches
from .serializers import ProgramsSerializer, TrainingDaySerializer, WorkoutSerializer, ApproachesSerializer


class ProgramsAPIView(ViewSet, generics.ListAPIView):
    queryset = Programs.objects.all()
    serializer_class = ProgramsSerializer


class TrainingDayAPIView(ViewSet, generics.ListAPIView):
    queryset = TrainingDay.objects.all()
    serializer_class = TrainingDaySerializer


class WorkoutAPIView(ViewSet, generics.ListAPIView):
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer


class ApproachesAPIView(ViewSet, generics.ListAPIView):
    queryset = Approaches.objects.all()
    serializer_class = ApproachesSerializer

