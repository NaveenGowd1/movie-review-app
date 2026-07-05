from rest_framework import serializers
from .models import StreamingPlatform, Movie
from django.db.models import Avg
from reviews.serializers import ReviewSerializer


class StreamingPlatformSerializer(serializers.ModelSerializer):

    class Meta:
        model = StreamingPlatform
        fields = '__all__'
        


class MovieSerializer(serializers.ModelSerializer):
    
    platforms = StreamingPlatformSerializer(many=True, read_only=True)
    reviews = ReviewSerializer(many=True, read_only=True)

    class Meta:
        model = Movie
        fields = '__all__'
        read_only_fields = (
            'avg_rating',
            'number_rating',
        )