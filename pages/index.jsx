import Head from 'next/head'
import classes from 'generalStyles/pageStyles.module.css'
import MainHeader from "components/assets/Headers/MainHeader/MainHeader"
import CategoryMenu from 'components/Client/CategoryMenu/CategoryMenu'
import SpecialButtonBar from 'components/assets/SpecialButtonBar/SpecialButtonBar'


export default function Home() {

  return (
    <div className={classes.PageContainer}>
      <Head>
        <title>Mi Tienda</title>
      </Head>
      <MainHeader/> 
      <CategoryMenu/>
      <SpecialButtonBar/> 
    </div>
  )
}
//<CategoryFinder/>