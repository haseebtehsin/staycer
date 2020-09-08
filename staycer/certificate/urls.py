from rest_framework import routers
from .api import CertificationViewSet, CertificateViewSet

router = routers.DefaultRouter()
router.register('api/v1/certificates', CertificateViewSet, 'certificates')
router.register('api/v1/certifications',
                CertificationViewSet, 'certifications')
urlpatterns = router.urls
