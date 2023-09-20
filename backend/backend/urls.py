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
from article.views import CurrentUserView, ArticleModelViewSet
from rest_framework.routers import DefaultRouter
from django.views.generic import RedirectView
# from rest_framework.authtoken.views import obtain_auth_token
from programs.views import ProgramsAPIView, ApproachesAPIView, WorkoutAPIView, TrainingDayAPIView

router = DefaultRouter()
router.register('users', CurrentUserView, basename="users")
router.register('articles', ArticleModelViewSet, basename="articles")
router.register('programs', ProgramsAPIView, basename='programs')
router.register('trainingday', TrainingDayAPIView, basename='trainingday')
router.register('workout', WorkoutAPIView, basename='workout')
router.register('approaches', ApproachesAPIView, basename='approaches')

urlpatterns = [
    path('', RedirectView.as_view(url='api/')),
    path('api/', include(router.urls)),
    path('admin/', admin.site.urls),
    path('api/auth/', include('authentication.urls')),
    # path('api-auth/', include('rest_framework.urls')),
    # path('api-token-auth/', obtain_auth_token),
]