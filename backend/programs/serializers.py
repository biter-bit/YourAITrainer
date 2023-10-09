from rest_framework import serializers

from programs.models import Program, TrainingDay, Workout, Approach


class ProgramsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Program
        fields = '__all__'


class TrainingDaySerializer(serializers.ModelSerializer):
    programs_id = ProgramsSerializer()

    class Meta:
        model = TrainingDay
        fields = '__all__'


class WorkoutSerializer(serializers.ModelSerializer):
    training_day_id = TrainingDaySerializer()

    class Meta:
        model = Workout
        fields = '__all__'


class ApproachesSerializer(serializers.ModelSerializer):
    workout_id = WorkoutSerializer()

    class Meta:
        model = Approach
        fields = '__all__'


class GenerationSerializer(serializers.Serializer):
    gender = serializers.ChoiceField(choices=['m', 'f'])
    age = serializers.IntegerField()
    weight = serializers.FloatField()
    height = serializers.IntegerField()
    training_level = serializers.ChoiceField(choices=['beginner', 'amateur', 'pro'])
    purpose_of_training = serializers.ChoiceField(choices=['weight_loss', 'relief', 'muscle_mass', 'endurance'])
