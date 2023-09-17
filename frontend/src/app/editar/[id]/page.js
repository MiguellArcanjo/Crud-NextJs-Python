"use client"
import React, { useEffect, useState } from 'react';
import Consultar from '@/components/ConsultarCategoria/Consultat';
import ConsultarMarca from '@/components/ConsultarMarca/ConsultarMarca';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import './style.css'

function EditarProduto({params}) {

    const id = params.id
    const apiUrl = "http://127.0.0.1:8000"

    const notify = () => toast.success('Atualizado com Sucesso!')

    const [produto, setProduto] = useState([]);
    const [formData, setFormData] = useState({
        "nome_do_item": "",
        "descricao": "",
        "quantidade": null,
        "preco": null,
        "categoria_produto": null,
        "marca_do_produto": null
    })

    useEffect(() => {
        if (id) {
        fetch(`${apiUrl}/produto/produto/${id}/`)
            .then((response) => response.json())
            .then((data) => {
                setProduto(data)
                setFormData({
                    "nome_do_item": data.nome_do_item,
                    "descricao": data.descricao,
                    "quantidade": data.quantidade,
                    "preco": data.preco,
                    "categoria_produto": data.categoria_produto,
                    "marca_do_produto": data.marca_do_produto
                })
            })
            .catch((error) => console.error('Erro ao buscar produto:', error));
        }
    }, [id]);

    const handleChange = (e, propertyName) => {
        const value = e.target.value;
        setFormData({
          ...formData,
          [propertyName]: value,
        })
    };

    const hanldeSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${apiUrl}/produto/produto/${id}/`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
            });
            if (!response.ok) {
              throw new Error('Não foi possível atualizar o produto.');
            }
    
            console.log('Produto atualizado com sucesso!');
        } catch (error) {
            console.error('Erro ao atualizar produto:', error);
        }
    }

    if (!produto) {
        return <div>Loading...</div>;
    }


  return (
    <div className='background'>
        <form onSubmit={hanldeSubmit} className='form'>
            <div className='divForm'>
                <label htmlFor='nome_do_item'>Nome do produto: </label>
                <input type="text" id='name' name='nome_do_item' value={formData.nome_do_item} onChange={(e) =>handleChange(e, "nome_do_item")}/>
            </div>

            <div className='divForm'>
                <label htmlFor='descricao'>Descrição:</label>
                <input name="descricao" id="descricao" value={formData.descricao} onChange={(e) => handleChange(e, "descricao")}/>
            </div>

            <div className='divForm'>
                <label htmlFor='quantidade'>Quantidade: </label>
                <input type="number" id='quantidade' name='quantidade' value={formData.quantidade} onChange={(e) =>handleChange(e, "quantidade")}/>
            </div>

            <div className='divForm'>
                <label htmlFor='preco'>Preço: </label>
                <input type="number" id='preco' name='preco' value={formData.preco} onChange={(e) =>handleChange(e, "preco")}/>
            </div>

            <div className='divForm'>
                <label htmlFor='categoria'>Categoria: </label>
                <select name="categoria" id="categoria" onChange={(e) =>handleChange(e, "categoria_produto")} className='select'>
                    <option value="">Selecione a categoria do produto</option>
                    <Consultar/>
                </select>
            </div>

            <div className='divForm'>
                <label htmlFor='marca'>Marca: </label>
                <select id='marca' name='marca' onChange={(e) =>handleChange(e, "marca_do_produto")} className='select'>
                    <option value="">Selecione a marca do produto</option>
                    <ConsultarMarca/>
                </select>
            </div>

            <button type='submit' className='button' onClick={notify}>Atualizar</button>
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
            <Link href='/' className='button'>Voltar</Link>
        </form>
    </div>
  )
}

export default EditarProduto