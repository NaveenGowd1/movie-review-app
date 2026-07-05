from django.urls import path
from .views import ReviewListCreateAPIView

urlpatterns = [
    path(
        '<int:movie_pk>/reviews/',
        ReviewListCreateAPIView.as_view()
    ),
]