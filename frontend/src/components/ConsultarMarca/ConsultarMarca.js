import React, {useEffect, useState} from 'react';

function ConsultarMarca() {
    const apiUrl = "http://127.0.0.1:8000"
    const [ marcaProduto, setMarcaProduto ] = useState([]);
  
    useEffect(() => {
      fetch(`${apiUrl}/produto/marca`)
        .then((response) => response.json())
        .then((data) => setMarcaProduto(data))
        .catch((error) => console.error("Erro ao buscar a marca", error))
    }, [])

    console.log(marcaProduto)

  return (
    <>
        {marcaProduto.map((marca) => (
            <option key={marca.id} value={marca.id}>
                {marca.marca}
            </option>
        ))}
    </>  
  )
}

export default ConsultarMarca