import React from 'react'
import classes from './AmountUI.module.css'

const AmountUI = (props) => {
/*este es el primer componente de este estilo que hago, ya que no tiene onchange, le pasé por
props una funcion anonima con un parámetro, eso me permite ejecutar la funcion aquí y almacenar
la información en el parámetro, con ello paso datos de hijo a padre*/
    

    const ChangeAmountBy= (n) =>{
        const result = props.amount + n
        if(result > 0){
            props.alCambiar(result)   
        }  
    }
    return (
        <div className={classes.Container} >
            <button className={classes.Button} onClick={()=> ChangeAmountBy(-1)}> - </button>
            <p className={classes.Number}>{props.amount}</p>
            <button className={classes.Button} onClick={()=> ChangeAmountBy(1)}> + </button>
        </div>
    )
}

export default AmountUI
