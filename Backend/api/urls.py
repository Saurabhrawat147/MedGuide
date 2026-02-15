from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import register, login, SymptomSessionViewSet

router = DefaultRouter()
router.register(r'sessions', SymptomSessionViewSet)

urlpatterns = [
    path('register/', register, name='register'),
    path('login/', login, name='login'),
    path('', include(router.urls)),
]
