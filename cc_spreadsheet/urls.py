from django.urls import path, include
from rest_framework import routers

from cc_spreadsheet.views import CelebrantViewSet

router = routers.DefaultRouter()
router.register(r'celebrants', CelebrantViewSet, 'celebrants')

urlpatterns = [
    path("", include(router.urls)),

]
