from django.conf.urls import url
from. import views
app_name = 'api'
urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^data/$', views.data, name='data'),
    url(r'^load_file/$', views.load_file, name='data')
]
