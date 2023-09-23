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
from dj_rest_auth.jwt_auth import get_refresh_view
# from dj_rest_auth.registration.views import RegisterView
# from dj_rest_auth.views import LoginView, LogoutView, UserDetailsView
# from djoser.views import TokenCreateView
from rest_framework_simplejwt.views import TokenVerifyView
from authentication.views import CustomUserViewSet

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
    path('api/auth/', include('djoser.urls')),
    path('api/auth/token/', include('djoser.urls.jwt')),
    path("api/auth/token/verify/", TokenVerifyView.as_view(), name="token_verify"),
    path("api/auth/token/refresh/", get_refresh_view().as_view(), name="token_refresh"),
    # path("register/", RegisterView.as_view(), name="rest_register"),
    # path("login/", LoginView.as_view(), name="rest_login"),
    # path("logout/", LogoutView.as_view(), name="rest_logout"),
    # path("user/", UserDetailsView.as_view(), name="rest_user_details"),
]