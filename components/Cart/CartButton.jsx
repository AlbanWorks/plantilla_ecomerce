import React,{useState, useEffect,useContext,Fragment,useRef} from 'react'
import { DataContext } from '../../provider'
import classes from './CartButton.module.css'

const CartButton = (props) => { 
    /*
    en este usé la misma tecnica para pasar info del hijo al padre, pasar una funcion como prop,
    a falta de una convención que conozca, estas propiedades las pondré en español en el padre para
    distinguirlas de los metodos nativos
    */ 
    const {CartProducts} = useContext(DataContext)
    const [TotalProducts, setTotalProducts] = useState(0) 
    

    useEffect(() => {
        let total = 0
        CartProducts.forEach(product => {
            total += product.amount
        });
        setTotalProducts(total)
    }, [CartProducts])

    return (
    <Fragment>
        <button onClick={()=>props.alClickar()} className={classes.CartButton}>
            <i className={"fas fa-shopping-cart"}></i>
            {
                TotalProducts > 0 ?(
                    <p className={classes.Notification}>{TotalProducts}</p>
                ):(
                    <></>
                )
            }
        </button>
       {
           TotalProducts > 0 ?(
            <button onClick={()=>props.alClickar()} className={classes.AuxCartButton}>Ver Carrito</button>)
            :(<></>)
       } 
    </Fragment>
        
    )
}

export default CartButton
// <p className={classes.Notification}>{TotalProducts}</p> 

/*

.CartButton{
    position: fixed;
    top: 5px;
    right:20px;
    outline: none;
    border: none;
    background-color: transparent;
    border-radius: 50%;
    padding: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 35px;
    color:rgb(236, 238, 243);
    text-shadow: 2px 3px 5px rgba(59, 59, 59, 0.329);
}

.AuxCartButton{
    outline: none;
    border: none;
    position: fixed;
    bottom: 0px;
    width: 100%;
    height: 50px;
    font-size: 18px;
    font-family: sans-serif;
    color: rgb(65, 65, 65);
    background-color: rgba(127, 241, 127, 0.92);
    padding: 5px 10px 5px 10px;
    box-shadow: 0 0 5px rgb(197, 197, 197);
}

.Button:active{
    color: rgb(0, 0, 0);
    background-color: rgb(99, 214, 99);
}



.Notification{
    position: absolute;
    font-family: sans-serif;
    font-size: 10px;
    color: rgb(238, 238, 238);
    border-radius: 50%;
    height: 18px;
    width: 18px;
    background-color: rgb(233, 23, 23);
    margin-left:30px ;
    margin-top:30px ;
    display: flex;
    align-items: center;
    justify-content: center;
}


*/