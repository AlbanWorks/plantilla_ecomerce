import Head from 'next/head'
import React,{useState} from 'react'
import classes from '../styles/pageStyles.module.css'
import ProductManagement from "../../components/Admin/ProductManagement/ProductManagement"
import Signin from '../../components/Admin/Signin/Signin'

export default function ProductAdmin() {

  const[isLoged, setIsLoged] =  useState(false)

  return (
  <div className={classes.PageContainer}>
  <Head>
  <title>Administrador de Tiendas</title>
  </Head>
    {
      isLoged ?
        <ProductManagement/>
      :
        <Signin setLogin={(state)=>setIsLoged(state)}/>
    }
  </div>
  )
}