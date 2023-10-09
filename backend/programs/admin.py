from django.contrib import admin

from programs.models import Program, TrainingDay, Workout, Approach

admin.site.register(Program)
admin.site.register(TrainingDay)
admin.site.register(Workout)
admin.site.register(Approach)
