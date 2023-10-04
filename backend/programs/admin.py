from django.contrib import admin

from programs.models import Programs, TrainingDay, Workout, Approaches

admin.site.register(Programs)
admin.site.register(TrainingDay)
admin.site.register(Workout)
admin.site.register(Approaches)
