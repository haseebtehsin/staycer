from rest_framework import routers
from .api import CertificationViewSet, CertificateViewSet, UserCertificationViewSet

router = routers.DefaultRouter()
router.register('api/v1/certificates', CertificateViewSet, 'certificates')
router.register('api/v1/certifications',
                CertificationViewSet, 'certifications')
router.register(r'api/v1/users/(?P<user_id>.+)/certifications',
                UserCertificationViewSet, 'user_certifications')

urlpatterns = router.urls
