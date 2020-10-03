import django_filters
from .models import Certification
from datetime import datetime, timedelta


class NumberInFilter(django_filters.BaseInFilter, django_filters.NumberFilter):
    pass


class CertificationFilter(django_filters.FilterSet):
    expiring_in = django_filters.NumberFilter(
        method='get_expiring_in', field_name="expiry_date")
    expired_only = django_filters.BooleanFilter(
        method='get_expired_only', field_name="expiry_date")
    certificates = NumberInFilter(method="get_certification_for_certificates")

    def get_expiring_in(self, queryset, field_name, value, ):
        if value:
            queryset = queryset.filter(expiry_date__lte=(
                datetime.now() + timedelta(days=int(value))))
            return queryset.filter(expiry_date__gte=(datetime.now()))
        return queryset

    def get_expired_only(self, queryset, field_name, value, ):
        if value:
            return queryset.filter(expiry_date__lte=(datetime.now()))
        return queryset

    def get_certification_for_certificates(self, queryset, field_name, value, ):
        if value:
            return queryset.filter(certificate__id__in=value)
        return queryset

    class Meta:
        model = Certification
        fields = '__all__'
        # since filters do not support Image field, we need to explicitly exclude them
        exclude = ['picture']
