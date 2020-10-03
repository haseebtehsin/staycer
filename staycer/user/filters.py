import django_filters
from django.db.models import Q
from datetime import datetime, timedelta
from .models import User
from certificate.models import Certification


def _strip_date_from_value(value):
    # Since DateFromToRange Filter gives us a slice in datetime format
    # we HAVE to do following. There might be a better way around this
    availability_start = value.start.strftime("%Y-%m-%d")
    availability_end = value.stop.strftime("%Y-%m-%d")
    return availability_start, availability_end


class UserFilter(django_filters.FilterSet):
    availability = django_filters.DateFromToRangeFilter(
        method="get_user_in_available_dates")
    certifications = django_filters.CharFilter(
        method='get_certifications', field_name="expiry_date")

    def get_certifications(self, queryset, field_name, value):
        if value:

            availability_start = self.request.query_params.get(
                "availability_after")
            availability_end = self.request.query_params.get(
                "availability_before")

            # Could make this more efficient
            # Use SQL to filter rather than looping
            certification_list = value.split(",")
            for certification in certification_list:
                if availability_start and availability_end:
                    # Following lines of code ensures that we only select
                    # those certification which are valid for
                    # selected dates (if the dates are provided)
                    queryset = queryset.filter(
                        (Q(certifications__issue_date__lte=availability_start) &
                         Q(certifications__expiry_date__gte=availability_end)) &
                        Q(certifications__certificate__name__exact=certification) &
                        Q(certifications__tracking=True))
                else:
                    queryset = queryset.filter(
                        certifications__certificate__name__exact=certification &
                        Q(certifications__tracking=True))
                if len(queryset) == 0:
                    break
            return queryset
        return queryset

    def get_user_in_available_dates(self, queryset, field_name, value, ):
        if value:

            availability_start, availability_end = _strip_date_from_value(
                value)
            return queryset.filter(~((Q(user_schedules__start_date__lte=availability_start) &
                                      Q(user_schedules__end_date__gte=availability_start)) |
                                     (Q(user_schedules__start_date__lte=availability_end) &
                                      Q(user_schedules__end_date__gte=availability_end)) |
                                     (Q(user_schedules__start_date__gte=availability_start) &
                                      Q(user_schedules__end_date__lte=availability_end))))
        return queryset

    class Meta:
        model = User
        fields = '__all__'
        # since filters do not support Image field, we need to explicitly exclude them
        exclude = ['picture']
