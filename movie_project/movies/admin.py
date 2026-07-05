from django.contrib import admin
from .models import StreamingPlatform, Movie


# Register your models here.
admin.site.register(StreamingPlatform)
admin.site.register(Movie)