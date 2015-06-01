from django.db import models
from model_utils.fields import StatusField
from model_utils.fields import MonitorField
from model_utils import Choices
from ckeditor.fields import RichTextField
from django.utils import timezone

# Create your models here.


class Author(models.Model):
    author_name = models.CharField(max_length=200)
    author_bio = RichTextField()
    picture = models.ImageField()

    def __str__(self):              # __unicode__ on Python 2
        return self.author_name


class Tag(models.Model):
    tag = models.CharField(max_length=200)

    def __str__(self):              # __unicode__ on Python 2
        return self.tag


class Article(models.Model):
    LANGUAGES = Choices('EN', 'RO', 'RU')
    author = models.ForeignKey(Author)
    title_text = models.CharField(max_length=140, blank=True)
    article = RichTextField()
    tags = models.ManyToManyField(Tag)
    languages = StatusField(choices_name='LANGUAGES')
    created_date = models.DateTimeField(auto_now_add=True)
    is_published = models.BooleanField(default=False)
    published_at = MonitorField(monitor='is_published', when=[True])

    def __str__(self):              # __unicode__ on Python 2
        return self.title_text


