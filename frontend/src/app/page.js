"use client"
import React, {useEffect, useState} from 'react';
import '../styles/style.css' 
import TabelaProdutos from '@/components/TabelaProdutos/TabelaProdutos';

function Principal() {
  

  return (
    <div className='background'>
      <TabelaProdutos />
    </div>
  )
}

export default Principal