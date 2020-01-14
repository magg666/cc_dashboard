from django.urls import path, include
from rest_framework import routers

from .views import RepositoryViewSet

router = routers.DefaultRouter()
router.register(r"projects", RepositoryViewSet, "projects")


urlpatterns = [
    path("", include(router.urls)),

]