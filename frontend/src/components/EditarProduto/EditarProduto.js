import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';


function EditarProduto() {
    const router = useRouter();
    const { id } = router.query;
    const apiUrl = "http://127.0.0.1:8000"


    const [produto, setProduto] = useState(null);

    useEffect(() => {
        if (id) {
        fetch(`${apiUrl}/produto/produto/${id}`)
            .then((response) => response.json())
            .then((data) => setProduto(data))
            .catch((error) => console.error('Erro ao buscar produto:', error));
        }
    }, [id]);

    if (!produto) {
        return <div>Loading...</div>;
    }


  return (
    <div>EditarProduto</div>
  )
}

export default EditarProduto