import React, {useEffect, useState} from 'react';
import './style.css' 
import { MdDeleteForever } from "react-icons/md";
import { BsPencilFill } from "react-icons/bs"
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';

function TabelaProdutos() {

  const deleteSuccess = () => toast.success("Produto Deletado com Sucesso!")

  const apiUrl = "http://127.0.0.1:8000"
  const [ produtos, setProdutos ] = useState([]);
  const [ marcaProduto, setMarcaProduto ] = useState([]);
  const [ categoriaProduto, setCategoriaProduto ] = useState([])


  useEffect(() => {
    fetch(`${apiUrl}/produto/produto`)
      .then((response) => response.json())
      .then((data) => setProdutos(data))
      .catch((error) => console.error("Erro ao buscar a produto", error))
  }, [])

  useEffect(() => {
    fetch(`${apiUrl}/produto/marca`)
      .then((response) => response.json())
      .then((data) => setMarcaProduto(data))
      .catch((error) => console.error("Erro ao buscar a marca", error))
  }, [])
  
  useEffect(() => {
    fetch(`${apiUrl}/produto/categoria`)
    .then((response) => response.json())
    .then((data) => setCategoriaProduto(data))
    .catch((error) => console.error("Erro ao buscar a categoria", error))
  })

  const handleDelete = async (produtoId) => {
    try{
        const response = await fetch(`${apiUrl}/produto/produto/${produtoId}/`, {
            method: 'DELETE',
        })

        if (!response.ok) {
            throw new Error('Não foi possível deletar o produto.');
          }
          
          setProdutos(produtos.filter((produto) => produto.id !== produtoId))
          
        } catch (error) {
          console.error('Erro ao deletar produto:', error);
          setFeedBack(false)
        }

  } 
    

  return (
    <div>
        <table className='tabela'>
        <thead>
          <tr>
            <th>Nome Do Produto</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Preço</th>
            <th>Categoria</th>
            <th>Marca</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {produtos.map((produto) => (
            <tr key={produto.id}>
              <td>{produto.nome_do_item}</td>
              <td>{produto.descricao}</td>
              <td>{produto.quantidade}</td>
              <td>{produto.preco}</td>
              <td>
                {categoriaProduto.map((categoria) => categoria?.id === produto?.categoria_produto ? categoria?.categoria : null)}
              </td>
              <td>
                {marcaProduto.map((marca) => marca?.id === produto?.marca_do_produto ? marca?.marca : null)}
              </td>
              <td className='icons'>
                <Link href={`/editar/${produto.id}/`}>
                  <BsPencilFill size={20} className='editar'/>
                </Link>

                <MdDeleteForever
                  size={30} 
                  className='deletar'
                  onClick={() => {
                    handleDelete(produto.id);
                    deleteSuccess();
                  }}
                
                />

                <Toaster 
                  position="bottom-left"
                  toastOptions={{
        
                    className: '',
                    duration: 5000,
                    style: {
                      background: '#008000',
                      color: '#fff',
                    },
              
                  }}
                />
          
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Link href="/cadastrarProduto" className='linkCadastro'>Cadastrar um novo Produto</Link>
    </div>
  )
}

export default TabelaProdutos;