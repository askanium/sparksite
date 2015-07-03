from django.db import models
from model_utils.fields import StatusField
from model_utils.fields import MonitorField
from model_utils import Choices
from model_utils.models import TimeStampedModel
from ckeditor.fields import RichTextField
from django.template.defaultfilters import slugify
from django.contrib.auth.models import User
from model_utils.managers import PassThroughManager
from blog.managers import PostQuerySet

# Create your models here.


# class Author(models.Model):
#     user = models.OneToOneField(User)
#     bio = models.CharField(max_length=200)
#     picture = models.ImageField(upload_to='authors/')
#
#     def __str__(self):              # __unicode__ on Python 2
#         return '{}'.format(self.user)
#
#
# class Tag(models.Model):
#     name = models.CharField(max_length=20)
#
#     def __str__(self):              # __unicode__ on Python 2
#         return self.name
#
#
# class Article(TimeStampedModel):
#     LANGUAGES = Choices('EN', 'RO', 'RU')
#     author = models.ForeignKey(Author)
#     title = models.CharField(max_length=140, blank=True)
#     content = RichTextField()
#     tags = models.ManyToManyField(Tag)
#     language = StatusField(choices_name='LANGUAGES')
#     is_published = models.BooleanField(default=False)
#     published_at = MonitorField(monitor='is_published', when=[True])
#     slug = models.SlugField(default='', blank=True)
#     call_to_action = models.CharField(max_length=150, blank=True)
#     summary = models.CharField(max_length=500, blank=True)
#
#     objects = PassThroughManager.for_queryset_class(PostQuerySet)()
#
#     def __str__(self):              # __unicode__ on Python 2
#         return self.title
#
#     def save(self):
#         self.slug = slugify(self.title)
#         super(Article, self).save()

