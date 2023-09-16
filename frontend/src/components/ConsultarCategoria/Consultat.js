import React, {useEffect, useState} from 'react';

function Consultar() {
    const apiUrl = "http://127.0.0.1:8000"
    const [ categoriaProduto, setCategoriaProduto ] = useState([]);
  
    useEffect(() => {
      fetch(`${apiUrl}/produto/categoria`)
        .then((response) => response.json())
        .then((data) => setCategoriaProduto(data))
        .catch((error) => console.error("Erro ao buscar a categoria", error))
    }, [])


  return (
      <>
        {categoriaProduto.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
            {categoria.categoria}
            </option>
        ))}
      </>            
  )
}

export default Consultar