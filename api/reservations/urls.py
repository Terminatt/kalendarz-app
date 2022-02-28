from reservations.views import ReservationViewSet
from rest_framework.routers import SimpleRouter

router = SimpleRouter()
router.register('reservations', ReservationViewSet)

urlpatterns = router.urls
