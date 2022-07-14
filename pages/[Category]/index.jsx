import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import classes from 'generalStyles/pageStyles.module.css'
import CategoryPage from "components/Client/CategoryPage/CategoryPage"
import Header from "components/assets/Headers/Header/Header"
import Cart from 'components/Client/Cart/Cart'

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