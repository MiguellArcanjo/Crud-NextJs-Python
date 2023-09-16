from rest_framework import pagination

class PaginacaoCustomizadaProdutos(pagination.PageNumberPagination):
    page_size=5
    page_size_query_param='count'
    max_page_size=5
    page_query_param = 'p'

class PaginacaoCustomizadaCategorias(pagination.PageNumberPagination):
    page_size=2
    page_size_query_param='count'
    max_page_size=5
    page_query_param = 'p'

class PaginacaoCustomizadaMarcas(pagination.PageNumberPagination):
    page_size=3
    page_size_query_param='count'
    max_page_size=5
    page_query_param = 'p'
