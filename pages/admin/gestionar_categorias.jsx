import Head from 'next/head'
import React,{useState} from 'react'
import classes from '../styles/pageStyles.module.css'
import CategoryManagement from "../../components/Admin/CategoryManagement/CategoryManagement"
import Signin from '../../components/Admin/Signin/Signin'

export default function Gestionar_categorias() {

  const[isLoged, setIsLoged] =  useState(false)

  return (
  <div className={classes.PageContainer}>
  <Head>
  <title>Administrador de Categorías</title>
  </Head>
    {
      isLoged ?
        <CategoryManagement/>
      :
        <Signin setLogin={(state)=>setIsLoged(state)}/>
    }
  </div>
  )
}