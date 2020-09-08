from rest_framework import routers
from .api import UserViewSet

router = routers.DefaultRouter()
router.register('api/v1/users', UserViewSet, 'user')
urlpatterns = router.urls
