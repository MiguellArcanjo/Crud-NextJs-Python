import React, {useEffect, useState} from 'react';
import './style.css'
import Consultar from '@/components/ConsultarCategoria/Consultat';
import ConsultarMarca from '../ConsultarMarca/ConsultarMarca';
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link';


function FormCadastrar() {
    const apiUrl = "http://127.0.0.1:8000"
    const notify = () => toast.success('Marca cadastrada com Sucesso!')
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
        "marca": "",
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
          const response = await fetch(`${apiUrl}/produto/marca/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
    
          if (response.status === 400) {
            const errorData = await response.json();
            console.log(errorData)
            setError('Ja existe uma marca com este nome.');  // Definindo o erro no estado

          } else {
            const data = await response.json(); // Obtém os dados da resposta
            console.log("Marca cadastrado com sucesso:", data);
            setFeedback(true);
          }
        } catch (error) {
          console.error('Erro ao fazer a requisição:', error);
        }

      }

    return (
        <div className='background'>
            <form onSubmit={handleSubmit} className='form'>
                <h2>Cadastrar Marca</h2>  

                <div className='divForm'>
                    <label htmlFor='marca'>Nome da marca: </label>
                    <input type="text" id='marca' name='marca' value={formData.marca} onChange={(e) =>handleChange(e, "marca")}/>
                    {error !== null ? <p className='error'>{error}</p> : null}
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