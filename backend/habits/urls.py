from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import HabitViewSet, CheckInViewSet, login_view, register_view

router = DefaultRouter()
router.register(r'habits', HabitViewSet, basename='habit')
router.register(r'checkins', CheckInViewSet, basename='checkin')

urlpatterns = [
    path('api/', include(router.urls)),
    path('login/', login_view, name='login'),
    path('register/', register_view, name='register'),
]
