from rest_framework import routers
from .api import ProjectViewSet, ProjectScheduleViewSet

router = routers.DefaultRouter()
router.register('api/v1/projects', ProjectViewSet, 'projects')
router.register(r'api/v1/projects/(?P<project_id>.+)/schedules',
                ProjectScheduleViewSet, 'project_schedules')
urlpatterns = router.urls
