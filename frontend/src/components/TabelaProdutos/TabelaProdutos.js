import React, {useEffect, useState} from 'react';
import './style.css' 
import { MdDeleteForever } from "react-icons/md";
import { BsPencilFill } from "react-icons/bs"
import Link from 'next/link';

function TabelaProdutos() {
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

  console.log(produtos)

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
                <MdDeleteForever size={30} className='deletar'/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Link href="/cadastrar" className='linkCadastro'>Cadastrar um novo Produto</Link>
    </div>
  )
}

export default TabelaProdutos;