from rest_framework import serializers

from programs.models import Programs, TrainingDay, Workout, Approaches


class ProgramsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Programs
        fields = '__all__'


class TrainingDaySerializer(serializers.ModelSerializer):
    class Meta:
        model = TrainingDay
        fields = '__all__'


class WorkoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workout
        fields = '__all__'


class ApproachesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Approaches
        fields = '__all__'


