from django.urls import path
from .views import MovieDetailAPIView, MovieListAPIView, StreamingPlatformDetailAPIView, StreamingPlatformListAPIView

urlpatterns = [
    path('movies/', MovieListAPIView.as_view()),
    path('movies/<int:pk>/', MovieDetailAPIView.as_view()),
    path('platforms/', StreamingPlatformListAPIView.as_view()),
    path('platforms/<int:pk>/', StreamingPlatformDetailAPIView.as_view())
]