"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from article.views import ArticleModelViewSet
from authentication.views import UserListView, RegisterViewSet, CurrentUserProfile
from rest_framework.routers import DefaultRouter
from django.views.generic import RedirectView
from programs.views import (ProgramsAPIView, ApproachesAPIView, WorkoutAPIView, TrainingDayAPIView,
                            GenerationAPIView, CheckTaskCelery, ProgramsUserAPIView, TrainingDayUserAPIView,
                            WorkoutUserAPIView, ApproachesUserAPIView, UserAllDataView)
from django.conf import settings
from django.conf.urls.static import static

from programs.views import SaveTrainingDay

router = DefaultRouter()
router.register('users', UserListView, basename="users")
router.register('articles', ArticleModelViewSet, basename="articles")
router.register('programs', ProgramsAPIView, basename='programs')
router.register('trainingday', TrainingDayAPIView, basename='trainingday')
router.register('workout', WorkoutAPIView, basename='workout')
router.register('approaches', ApproachesAPIView, basename='approaches')
router.register('auth/register', RegisterViewSet, basename="auth_register")
router.register('programs/get', ProgramsUserAPIView, basename='get_programs')
router.register('trainingday/get', TrainingDayUserAPIView, basename='get_trainingday')
router.register('workout/get', WorkoutUserAPIView, basename='get_workout')
router.register('approach/get', ApproachesUserAPIView, basename='get_approach')
# router.register('programs/get/all', UserAllDataView, basename='get_all')

urlpatterns = [
    path('', RedirectView.as_view(url='api/')),
    path('api/', include(router.urls)),
    path('api/generation', GenerationAPIView.as_view(), name='generation'),
    path('api/check_task', CheckTaskCelery.as_view(), name='check_task'),
    path('api/programs/get/all', UserAllDataView.as_view(), name='get_all_data'),
    path('admin/', admin.site.urls),
    path('api/auth/', include('djoser.urls')),
    path('api/auth/', include('djoser.urls.jwt')),
    path('api/save', SaveTrainingDay.as_view(), name='save_approaches'),
    # path('api/auth/custom-token-create/', CustomTokenCreateView.as_view(), name='custom_token_create')
    # path("user/", UserDetailsView.as_view(), name="rest_user_details"),
    path('api/users/profile', CurrentUserProfile.as_view(), name='profile'),
    path('api/users/profile/update', CurrentUserProfile.as_view(), name='profile_update'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)