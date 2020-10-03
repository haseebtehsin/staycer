
from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from .api import ExpiringCertificationsView, TradeCountView


urlpatterns = [
    url('api/v1/metrics/expiring-certifications/',
        ExpiringCertificationsView.as_view()),
    url('api/v1/metrics/trade-count/', TradeCountView.as_view())]

# urlpatterns = format_suffix_patterns(urlpatterns)
