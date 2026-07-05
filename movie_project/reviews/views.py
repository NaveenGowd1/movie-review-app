from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import Review
from .serializers import ReviewSerializer
from movies.models import Movie
from rest_framework.exceptions import ValidationError
from .permissions import IsReviewUserOrReadOnly

class ReviewListCreateAPIView(
    generics.ListCreateAPIView
):
    serializer_class = ReviewSerializer

    def get_queryset(self):
        movie_pk = self.kwargs['movie_pk']

        return Review.objects.filter(
            movie=movie_pk
        )

    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsAuthenticated()]

        return []
    
    def perform_create(self, serializer):

        movie_pk = self.kwargs['movie_pk']

        movie = Movie.objects.get(pk=movie_pk)

        review_user = self.request.user

        if Review.objects.filter(
            movie=movie,
            review_user=review_user
        ).exists():

            raise ValidationError(
                'You have already reviewed this movie.'
            )
            
        serializer.save(
            movie=movie,
            review_user=review_user
        )
        
        if movie.number_rating == 0:
            movie.avg_rating = serializer.validated_data['rating']
        else:
            movie.avg_rating = (
                (movie.avg_rating) * movie.number_rating + serializer.validated_data['rating']
            ) / (movie.number_rating + 1)

        movie.number_rating += 1
        movie.save()

        

class ReviewRetrieveUpdateDestroyAPIView(
    generics.RetrieveUpdateDestroyAPIView
):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

    permission_classes = [
        IsAuthenticated,
        IsReviewUserOrReadOnly
    ]  
    
    def perform_update(self, serializer):
        

        movie = serializer.instance.movie

        old_rating = serializer.instance.rating

        review = serializer.save()

        new_rating = review.rating

        total_rating = movie.avg_rating * movie.number_rating

        total_rating = total_rating - old_rating + new_rating

        movie.avg_rating = total_rating / movie.number_rating

        movie.save()
         
    def perform_destroy(self, instance):
        movie = instance.movie

        old_rating = instance.rating

        instance.delete()

        if movie.number_rating == 1:
            movie.avg_rating = 0
            movie.number_rating = 0
        else:
            total_rating = movie.avg_rating * movie.number_rating
            total_rating -= old_rating
            movie.number_rating -= 1
            movie.avg_rating = total_rating / movie.number_rating

        movie.save()
        
