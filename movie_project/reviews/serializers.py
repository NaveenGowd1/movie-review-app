from rest_framework import serializers
from .models import Review


class ReviewSerializer(serializers.ModelSerializer):

    review_user = serializers.StringRelatedField(
        read_only=True
    )

    class Meta:
        model = Review
        fields = [
            'id',
            'review_user',
            'rating',
            'review_description',
            'created_at'
        ]
        read_only_fields = (
            'review_user',
            'movie',
        )