from rest_framework import routers
from .api import CertificationViewSet, CertificateViewSet, UserCertificationViewSet, InstituteViewSet, InstituteCertificateViewSet

router = routers.DefaultRouter()
router.register('api/v1/certificates', CertificateViewSet, 'certificates')
router.register('api/v1/certifications',
                CertificationViewSet, 'certifications')
router.register(r'api/v1/users/(?P<user_id>.+)/certifications',
                UserCertificationViewSet, 'user_certifications')
router.register('api/v1/institutes',
                InstituteViewSet, 'institutes')
router.register(r'api/v1/institutes/(?P<institute_id>.+)/certificates',
                InstituteCertificateViewSet, 'insititute_certificates')

urlpatterns = router.urls
