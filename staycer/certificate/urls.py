from rest_framework import routers
from .api import CertificationViewSet, CertificateViewSet

router = routers.DefaultRouter()
router.register('api/certificates', CertificateViewSet, 'certificates')
router.register('api/certifications', CertificationViewSet, 'certifications')
urlpatterns = router.urls
