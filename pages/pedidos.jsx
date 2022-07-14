import Head from 'next/head'
import classes from 'generalStyles/pageStyles.module.css'
import OrdersUI from 'components/Client/Orders/OrdersUI'

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
