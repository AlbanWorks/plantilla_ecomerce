import Head from 'next/head'
import classes from './styles/pageStyles.module.css'
import OrdersUI from '../components/Orders/OrdersUI'

const pedidos = () => { 
    
    return (
        <div className={classes.PageContainer} >
             <Head>
                <title>Pedidos</title>
            </Head>
            <OrdersUI/>
        </div>
    )
}

export default pedidos
