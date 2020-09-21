from rest_framework import routers
from .api import CertificationViewSet, CertificateViewSet, UserCertificationViewSet, InstituteViewSet, InstituteCertificateViewSet, TradeViewSet, TradeCertificateViewSet

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
router.register('api/v1/trades',
                TradeViewSet, 'trades')
router.register(r'api/v1/trades/(?P<trade_id>.+)/certificates',
                TradeCertificateViewSet, 'trade_certificates')

urlpatterns = router.urls
