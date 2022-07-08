import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import classes from '../styles/pageStyles.module.css'
import ProductPage from "../../components/ProductPage/ProductPage"
import Header from "../../components/Headers/Header"
import Cart from '../../components/Cart/Cart'

export default function ProductPageLoader() {
 
  const router = useRouter()
  const Category = router.query.Category
  const ProductName = router.query.ProductName
  
  return (
    <div className={classes.PageContainer}>
      <Head>
        <title>{Category}-{ProductName}</title>
      </Head>
      <Header/>
        {
        router.isReady? 
          <ProductPage category = {Category} name = {ProductName}/> 
        :null
        }
      <Cart/>
    </div>
  )
}