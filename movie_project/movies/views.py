from rest_framework import generics, filters
from .models import Movie, StreamingPlatform
from .serializers import MovieSerializer, StreamingPlatformSerializer
from .permissions import IsAdminOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend

class StreamingPlatformListAPIView(generics.ListCreateAPIView):
    
    permission_classes = [IsAdminOrReadOnly]
    queryset = StreamingPlatform.objects.all()
    serializer_class = StreamingPlatformSerializer


class MovieListAPIView(generics.ListCreateAPIView):

    permission_classes = [IsAdminOrReadOnly]
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]

    filterset_fields = [
        'active',
        'platforms',
    ]

    search_fields = [
        'title',
        'storyline',
    ]
    ordering_fields = [
        'avg_rating',
        'number_rating',
        'release_date',
    ]
    
class MovieDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAdminOrReadOnly]
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    
class StreamingPlatformDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAdminOrReadOnly]
    queryset = StreamingPlatform.objects.all()
    serializer_class = StreamingPlatformSerializer