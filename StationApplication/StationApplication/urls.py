from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from django.contrib import admin
from django.urls import path, include, re_path
from .views import login

schema_view = get_schema_view(
    openapi.Info(
        title="Station management API",
        default_version='v1',
        description="Station management app",
        contact=openapi.Contact(url='https://github.com/Nguyen021/Station', name="Hà Trường Nguyên - Dương Trung Nguyên"),
        license=openapi.License(name="My Team©2023"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)
urlpatterns = [
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    re_path(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    re_path(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),

    path('', include('Station.urls')),
    path('admin/', admin.site.urls),
    path('o/', include('oauth2_provider.urls',
                       namespace='oauth2_provider')),
    path('login/', login, name='login'),
    # path('logout/', logout, name='logout'),
]
