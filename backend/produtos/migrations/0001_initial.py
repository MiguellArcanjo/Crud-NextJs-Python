# Generated by Django 4.2.4 on 2023-09-02 02:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CategoriaProduto',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('categoria', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='MarcaProduto',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('marca', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Produto',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=100)),
                ('descricao', models.CharField(max_length=100)),
                ('quantidade', models.IntegerField()),
                ('preco', models.FloatField()),
                ('categoria_produto', models.ForeignKey(max_length=100, on_delete=django.db.models.deletion.CASCADE, to='produtos.categoriaproduto')),
                ('marca_do_produto', models.ForeignKey(max_length=50, on_delete=django.db.models.deletion.CASCADE, to='produtos.marcaproduto')),
            ],
        ),
    ]
