from rest_framework import generics, viewsets
from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated

from .models import Programs, Workout, TrainingDay, Approaches
from .serializers import ProgramsSerializer, TrainingDaySerializer, WorkoutSerializer, ApproachesSerializer


class ProgramsViewSet(viewsets.ModelViewSet):
    queryset = Programs.objects.all()
    serializer_class = ProgramsSerializer
    permission_classes = (IsAuthenticated, )


class TrainingDayViewSet(viewsets.ModelViewSet):
    queryset = TrainingDay.objects.all()
    serializer_class = TrainingDaySerializer
    permission_classes = (IsAuthenticated, )


class WorkoutViewSet(viewsets.ModelViewSet):
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer
    permission_classes = (IsAuthenticated, )


class ApproachesViewSet(viewsets.ModelViewSet):
    queryset = Approaches.objects.all()
    serializer_class = ApproachesSerializer
    permission_classes = (IsAuthenticated, )
