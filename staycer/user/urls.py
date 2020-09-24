from rest_framework import routers
from .api import UserViewSet, PositionViewSet, UserScheduleViewSet

router = routers.DefaultRouter()
router.register('api/v1/users', UserViewSet, 'user')
router.register('api/v1/positions', PositionViewSet, 'position')
router.register(r'api/v1/users/(?P<user_id>.+)/schedule',
                UserScheduleViewSet, 'user_schedule')
urlpatterns = router.urls
