from datetime import datetime
from django.db.models.query import QuerySet
from django.utils import translation


class PostQuerySet(QuerySet):

    def published(self):
        return self.filter(published_at__lte=datetime.now(), is_published=True).order_by('-published_at')

    def published_by_author(self, author):
        return self.published().filter(author=author)

    def articles_by_author(self, author):
        return self.filter(author__user__username=author)

    def posts_summary(self):
        return self.published().filter(language=translation.get_language())[:3]
