import React, {useEffect, useState} from 'react';
import './style.css'
import Consultar from '@/components/ConsultarCategoria/Consultat';
import ConsultarMarca from '../ConsultarMarca/ConsultarMarca';
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link';


function FormCadastrar() {
    const apiUrl = "http://127.0.0.1:8000"
    const notify = () => toast.success('Produto cadastrado com Sucesso!')
    const erro = () => toast.error("Erro ao cadastrar.")

    const [feedback, setFeedback] = useState(null);
    const [ error, setError ] = useState(null)


    useEffect(() => {
      if (feedback === true) {
        notify();
        setTimeout(() => {
            window.location.reload()
        }, "1000")

      } else if (feedback === false) {
        erro();
      }
    }, [feedback]);

    const [formData, setFormData] = useState({
        "nome_do_item": "",
        "descricao": "",
        "quantidade": null,
        "preco": null,
        "categoria_produto": null,
        "marca_do_produto": null
      });
    
      const handleChange = (e, propertyName) => {
        const value = e.target.value;
        setFormData({
          ...formData,
          [propertyName]: value,
        })
      };


    
      const handleSubmit = async (e) => {
        e.preventDefault();


        try {
          const response = await fetch(`${apiUrl}/produto/produto/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
    
          if (response.status === 400) {
            const errorData = await response.json();
            console.log(errorData)
            setError('Ja existe um item com este nome.');

          } else {
            const data = await response.json(); 
            console.log("Produto cadastrado com sucesso:", data);
            setFeedback(true);
          }
        } catch (error) {
          console.error('Erro ao fazer a requisição:', error);
        }

      }

    return (
        <div className='background'>
            <form onSubmit={handleSubmit} className='form'>
                <h2>Cadastrar Produto</h2>  

                <div className='divForm'>
                    <label htmlFor='nome_do_item'>Nome do produto: </label>
                    <input type="text" id='name' name='nome_do_item' value={formData.nome_do_item} onChange={(e) =>handleChange(e, "nome_do_item")}/>
                    {error !== null ? <p className='error'>{error}</p> : null}
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

                <button type='submit' className='button'>Cadastrar</button>
                <Toaster 
                  position="bottom-left"
                  toastOptions={{
                    // Define default options
                    className: '',
                    duration: 3000,
                    style: {
                      background: '#008000',
                      color: '#fff',
                    },

                    success: {
                      duration: 3000,
                      theme: {
                        primary: 'green',
                        secondary: 'black',
                      },
                    },

                    error: {
                      duration: 3000,
                      style: {
                        background: '#800000',
                        color: '#fff',
                      },
                      theme: {
                        primary: 'red',
                        secondary: 'black',
                      },
                    }
                  }}
                />
                <Link Link href='/' className='button'>Voltar</Link>
            </form>
        </div>
    )
}

export default FormCadastrar