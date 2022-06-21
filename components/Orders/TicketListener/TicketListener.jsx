import React from 'react'
import classes from './TicketListener.module.css'
import Link from 'next/link'
import Spinner from '../../Spinner/Spinner'


const TicketListener = ({info, OrderState}) => {
    
return (
<div className={classes.Container} >{
     OrderState.notSended ? (
        <div className={classes.InfoContainer} > 
            <h2 className={classes.InfoTitle}>
                Danos algo de información antes de hacer tu pedido
            </h2>
            <p className={classes.Info}>
                Si olvidaste algo podés <Link href="/">volver</Link> y revisar tu carrito. 
            </p>
            <p className={classes.Info}>
                se creará un mensaje de tu parte para el vendedor por Whatsapp, solo tienes que enviarlo y acordar la entrega de tus productos.
            </p>
        </div>
     ) 
     : OrderState.ErrorResponse ? (
        <div className={classes.ErrorContainer} >
            <p className={classes.ErrorMessage}>
               Algo salió mal y tu pedido no se realizó, podés <Link href="/">volver</Link> e intentarlo de nuevo.<br /><br /> 
              Error: <b>{info.err}</b>
            </p>
            <i className={"fas fa-cogs"}></i>
        </div>    
     )
     : OrderState.waitingResponse ? (
            <Spinner/>
         ):(
        null
     )


    }</div>)
}

export default TicketListener
