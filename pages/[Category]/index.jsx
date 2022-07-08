import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import classes from '../styles/pageStyles.module.css'
import CategoryPage from "../../components/CategoryPage/CategoryPage"
import Header from "../../components/Headers/Header"
import Cart from '../../components/Cart/Cart'

export default function CategoryPageLoader() {
 
  const router = useRouter()
  const category = router.query.Category
  
  return (
    <div className={classes.PageContainer}>
      <Head>
        <title>{category}</title>
      </Head>
      <Header/>
        {
        router.isReady?( <CategoryPage category={category}/> )
        :(null)
        }
      <Cart/>
    </div>
  )
}