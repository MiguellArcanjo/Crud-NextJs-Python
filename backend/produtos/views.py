from rest_framework import viewsets, serializers, filters, status
from produtos.models import Produto, MarcaProduto, CategoriaProduto
from produtos.serializers import ProdutoSerializers, MarcaProdutoSerializers, CategoriaProdutoSerializer
from produtos.pagination import PaginacaoCustomizadaProdutos, PaginacaoCustomizadaCategorias, PaginacaoCustomizadaMarcas
from rest_framework.decorators import api_view
from rest_framework.response import Response


class ProdutoViewSet(viewsets.ModelViewSet):
    queryset = Produto.objects.all()
    serializer_class = ProdutoSerializers
    # pagination_class = PaginacaoCustomizadaProdutos
    filter_backends = [filters.SearchFilter]
    search_fields = ['nome_do_item', 'marca_do_produto__marca', 'categoria_produto__categoria']


    # @api_view(['GET'])
    # def verificar_existencia_produto(request):
    #     nome_do_item = request.GET.get('nome_do_item')
    #     produto_existe = Produto.objects.filter(nome_do_item=nome_do_item).exists()
    #     return Response({'produtoExiste': produto_existe}, status=status.HTTP_200_OK)

    def perform_create(self, serializer): 
        nome_do_item = serializer.validated_data.get('nome_do_item')
        if Produto.objects.filter(nome_do_item=nome_do_item).exists():
            raise serializers.ValidationError("Ja existe um item com esse nome.")
        serializer.save()

class MarcaProdutoViewSet(viewsets.ModelViewSet):
    queryset = MarcaProduto.objects.all()
    serializer_class = MarcaProdutoSerializers
    # pagination_class = PaginacaoCustomizadaMarcas
    filter_backends = [filters.SearchFilter]
    search_fields = ['marca']

    def perform_create(self, serializer): 
        marca = serializer.validated_data.get('marca')
        if MarcaProduto.objects.filter(marca=marca).exists():
            raise serializers.ValidationError("Ja existe uma marca com esse nome.")
        serializer.save()

class CategoriaProdutoViewSet(viewsets.ModelViewSet):
    queryset = CategoriaProduto.objects.all()
    serializer_class = CategoriaProdutoSerializer
    # pagination_class = PaginacaoCustomizadaCategorias
    filter_backends = [filters.SearchFilter]
    search_fields = ['categoria']

    def perform_create(self, serializer): 
        categoria = serializer.validated_data.get('categoria')
        if CategoriaProduto.objects.filter(categoria=categoria).exists():
            raise serializers.ValidationError("Ja existe uma categoria com esse nome.")
        serializer.save()
