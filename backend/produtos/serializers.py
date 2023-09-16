from rest_framework import serializers
from produtos.models import Produto, MarcaProduto, CategoriaProduto

class ProdutoSerializers(serializers.ModelSerializer):
    class Meta:
        model = Produto
        fields = '__all__'

class MarcaProdutoSerializers(serializers.ModelSerializer):
    class Meta:
        model = MarcaProduto
        fields = '__all__'
    
class CategoriaProdutoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoriaProduto
        fields = '__all__'