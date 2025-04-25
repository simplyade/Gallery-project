from django.urls import path
from gallery.views import ImageView, ImageUploadView,ImageDeleteView,ImageFilterView,ImageListView,ImageSearchView

urlpatterns = [
    path('', ImageView.as_view()),
    path('upload/', ImageUploadView.as_view()),
    path('images/<int:pk>/', ImageDeleteView.as_view()),
    path('images/filter/', ImageFilterView.as_view()),
    path('images/', ImageListView.as_view()),
    path('images/search/', ImageSearchView.as_view()),
]