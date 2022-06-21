import React,{useContext} from 'react'
import { DataContext } from '../../provider'
import classes from'./CartProduct.module.css'

const CartProduct = ({ thisProdIndex, product}) => {
    const {CartProducts} = useContext(DataContext)
    const {setCartProducts} = useContext(DataContext)

    const CambiarCantidad = (n) =>{
      CartProducts[thisProdIndex]["amount"] += n
      if(CartProducts[thisProdIndex]["amount"] <= 0) BorrarProducto()
      setCartProducts([ ... CartProducts])
    }
    const BorrarProducto = () =>{
      CartProducts.splice( CartProducts.indexOf(product), 1)
      setCartProducts([ ... CartProducts])
      }

    return (
        <div className={classes.Container} >
            { product["amount"] + " " + product["title"] }
           <div className={classes.Botonera} >
            <button onClick={ () => CambiarCantidad(-1) } className={classes.Button} >-</button>
            <button onClick={ () => CambiarCantidad(1) } className={classes.Button} >+</button>
            <button onClick={ () => BorrarProducto() } className={classes.ButtonTrash} >
              <i className={"fas fa-trash"}></i>
            </button>
           </div>
        </div>
    )
}

export default CartProduct
