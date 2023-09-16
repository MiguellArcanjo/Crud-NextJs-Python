from rest_framework import routers
from produtos.views import ProdutoViewSet, CategoriaProdutoViewSet, MarcaProdutoViewSet


routers = routers.DefaultRouter()
routers.register(r'produto', ProdutoViewSet)
routers.register(r'categoria', CategoriaProdutoViewSet)
routers.register(r'marca', MarcaProdutoViewSet)

urlpatterns = routers.urls
