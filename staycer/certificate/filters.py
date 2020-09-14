import django_filters
from .models import Certification
from datetime import datetime, timedelta


class CertificationFilter(django_filters.FilterSet):
    expiring_in = django_filters.NumberFilter(
        method='get_expired', field_name='expiry_date')

    def get_expired(self, queryset, field_name, value, ):
        print (value)
        if value:
            return queryset.filter(expiry_date__lte=(datetime.now() + timedelta(days=int(value))))
        return queryset

    class Meta:
        model = Certification
        fields = '__all__'
        # since filters do not support Image field, we need to explicitly exclude them
        exclude = ['picture']
