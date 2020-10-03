from rest_framework import viewsets, permissions, filters, status, generics, views
from rest_framework.response import Response
from certificate.models import Certificate, Certification, Trade
from user.models import User
from django.db.models import Q
# from certificate.serializer import CertificationSerializer
import django_filters.rest_framework
from datetime import date, timedelta, datetime
import calendar


def _get_date_and_delta(UNTIL):
    curr_date = date.today()
    for _ in range(UNTIL):
        days_in_current_month = calendar.monthrange(
            curr_date.year, curr_date.month)[1]
        end_of_month_days_delta = days_in_current_month - curr_date.day
        yield (curr_date, end_of_month_days_delta)
        curr_date = curr_date + timedelta(end_of_month_days_delta+1)


class ExpiringCertificationsView(views.APIView):

    def get(self, request):
        certification_qs = Certification.objects.all()
        monthly_expired_certifications = []
        default_until = 6
        until = self.request.query_params.get("months_until")
        until = int(until) if until else default_until
        for curr_date, time_delta in _get_date_and_delta(until):
            expired_certifications = certification_qs.filter(expiry_date__lte=(
                curr_date + timedelta(time_delta))).count()
            monthly_expired_certifications.append(expired_certifications)
        return Response(monthly_expired_certifications)


class TradeCountView(views.APIView):

    def get(self, request):
        trades = Trade.objects.all()
        trade_count = []
        default_until_date = datetime.now() + timedelta(30)
        date_until = self.request.query_params.get("date_until")
        date_until = date_until if date_until else default_until_date
        for trade in trades:
            trade_count_object = []
            trade_count_object.append(trade.name)
            trade_certificates = trade.certificates.all()
            for certificate in trade_certificates:
                user_qs = User.objects.filter(
                    Q(certifications__certificate=certificate) &
                    Q(certifications__expiry_date__gte=date_until))
            trade_count_object.append(user_qs.count())
            trade_count.append(list(trade_count_object))
        return Response(trade_count)
