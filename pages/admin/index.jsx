import Head from 'next/head'
import React,{useState} from 'react'
import classes from '../styles/pageStyles.module.css'
import AdminPage from '../../components/Admin/AdminPage/AdminPage'
import Signin from '../../components/Admin/Signin/Signin'

export default function Admin() {

  const[isLoged, setIsLoged] =  useState(false)

  return (
  <div className={classes.PageContainer}>
  <Head>
  <title>Administrador de Tiendas</title>
  </Head>
    {
      isLoged ?
        <AdminPage/>
      :
        <Signin setLogin={(state)=>setIsLoged(state)}/>
    }
  </div>
  )
}