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
from rest_framework import permissions
from rest_framework.schemas import get_schema_view, openapi

# schema_view = get_schema_view(
#     openapi.Info(
#         title='Todo',
#         default_version='v1',
#         description='Documentation to out project',
#         #contact=openapi.Contact(email='admin@admin.local'),
#         license=openapi.License(name='MIT License'),
#
#     ),
#     public=True,
#     permission_classes=[permissions.AllowAny], #права на документацию.IsAuthenticated, IsAdminUser
#
# )

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
]
