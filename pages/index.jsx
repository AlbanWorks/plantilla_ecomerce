
import Head from 'next/head'
import classes from './styles/pageStyles.module.css'
import MainHeader from "../components/Headers/MainHeader"
import CategoryMenu from '../components/CategoryMenu/CategoryMenu'

export default function Home() {

  return (
    <div className={classes.PageContainer}>
       <Head>
    <title>Mi Tienda</title>
      </Head>
      <MainHeader/> 
      <CategoryMenu/>
    </div>
  )
}
//<CategoryFinder/>