"use client"
import React, {useEffect, useState} from 'react';
import './style.css' 
import FormCadastrar from '@/components/FormCadastrar/FormCadastrar';

function PaginaCadastro() {
  
  return (
    <div className='background'>
      <FormCadastrar/>
    </div>
  )
}

export default PaginaCadastro