from rest_framework import routers
from .api import ProjectViewSet

router = routers.DefaultRouter()
router.register('api/v1/projects', ProjectViewSet, 'projects')
urlpatterns = router.urls
