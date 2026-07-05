from django.db import models


class StreamingPlatform(models.Model):
    name = models.CharField(max_length=100, unique=True)
    website = models.URLField()
    logo = models.URLField(blank=True)
    subscription_price = models.DecimalField(
        max_digits=6,
        decimal_places=2,
        null=True,
        blank=True
    )

    def __str__(self):
        return self.name
    
class Movie(models.Model):
    title = models.CharField(max_length=255)
    storyline = models.TextField()
    poster = models.ImageField(
        upload_to='movies/posters/',
        null=True,
        blank=True
    )
    release_date = models.DateField()
    

    avg_rating = models.FloatField(default=0)
    number_rating = models.PositiveIntegerField(default=0)

    active = models.BooleanField(default=True)

    platforms = models.ManyToManyField(
        StreamingPlatform,
        related_name='movies'
    )

    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title