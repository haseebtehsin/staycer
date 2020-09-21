from rest_framework import routers
from .api import UserViewSet, PositionViewSet

router = routers.DefaultRouter()
router.register('api/v1/users', UserViewSet, 'user')
router.register('api/v1/positions', PositionViewSet, 'position')
urlpatterns = router.urls
