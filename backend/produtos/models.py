from django.db import models

class CategoriaProduto(models.Model):
    categoria = models.CharField(max_length=100)

    def __str__(self) -> str:
        return f'{self.categoria}'
    
class MarcaProduto(models.Model):
    marca = models.CharField(max_length=50)

    def __str__(self) -> str:
        return f'{self.marca}'

class Produto(models.Model):
    nome_do_item = models.CharField(max_length=100)
    descricao = models.CharField(max_length=100)
    quantidade = models.IntegerField()
    preco = models.FloatField()

    categoria_produto = models.ForeignKey(
        CategoriaProduto,
        max_length=100,
        on_delete=models.CASCADE
    )

    marca_do_produto = models.ForeignKey(
        MarcaProduto,
        max_length=50,
        on_delete=models.CASCADE

    )