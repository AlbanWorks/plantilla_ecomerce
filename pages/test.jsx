import Head from 'next/head'
import classes from './styles/pageStyles.module.css'
import FanctButton from '../components/Test/FanctButton'
import CategoryFinder from '../components/Test/CategoryFinder'
const test = () => {
  return (
    <div className={classes.PageContainer}>
    <Head>
  <title>TESTING</title>
  </Head>
  <CategoryFinder/>
    </div>
  )
}

export default test