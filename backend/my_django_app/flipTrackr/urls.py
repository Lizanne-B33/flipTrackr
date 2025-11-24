from django.urls import path
from . import views
from .views import hello_world


urlpatterns = [
    # Test React with Django
    path('api/hello/', hello_world),
    # Test JWT
    path('api/home/', views.HomeView.as_view(), name='home'),
    path('api/logout/', views.LogoutView.as_view(), name='logout')
]
