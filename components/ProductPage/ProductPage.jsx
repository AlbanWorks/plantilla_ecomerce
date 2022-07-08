import {React, useState, useEffect,useContext, Fragment} from 'react'
import { DataContext } from '../../provider'
import classes from './ProductPage.module.css'
import {getProductByTitle} from "../../firebase/FirestoreMethods"
import Spinner from '../Spinner/Spinner'
import AmountUI from '../AmountUI/AmountUI'

const ProductPage = ({category, name}) => {

    const [FetchState , SetFetchState] = useState("no fetched")
    const [Product , SetProduct] = useState([])
    const {CartProducts} = useContext(DataContext)
    const {setCartProducts} = useContext(DataContext)
    const [amount, setAmount] = useState(1)
    const [ButtonText, setButtonText] = useState("Agregar al Carrito")

useEffect(() => {
const fetchData = async () =>{
	const rawProducts = await getProductByTitle(category, decodeURIComponent(name))
    // puede existir mas de 1 producto con el mismo nombre, el metodo trae a todos, aqui solo agarro el primero, mejorar.
    // tambien si no hay stock no lo muestro..
    if(rawProducts[0] && rawProducts[0]["stock"] ){
      SetProduct(rawProducts[0])
      SetFetchState("fetched")
    }
    else SetFetchState("error")
  }
  fetchData()
}, [category, name]) 

const AddToCart = (product) => {
    //el set timeout es para dar una sensacion de trabajo
    setButtonText("Agregando...")
    //Reinicio el contador por temas de UX
    setAmount(1)
    setTimeout(() => {
        //ver si el producto ya existe
        const IndexProd = CartProducts.indexOf(product)
        //si indexof da -1 no existe un producto igual
        if( IndexProd === -1){
            //le creo una propiedad que indique cuantos productos hay del mismo tipo
            product["amount"] = amount
            setCartProducts([ ... CartProducts, product ])
        }
        else{
            //el producto ya existe, solo le sumo ammont ++
            CartProducts[IndexProd]["amount"] += amount 
            setCartProducts([...CartProducts])
        }  
        setButtonText("¡Listo!")
    }, 700);

    setTimeout(() => {
        setButtonText("Agregar al Carrito")
    }, 1600);
}

  return (
    <div className={classes.Container}>
      {
      FetchState === "fetched" ?
        <div className={classes.ProductContainer} >
          <div className={classes.ImgContainer} >
                <img className={classes.Img} src={Product["picUrl"]} alt="" width="100%"/>
          </div>
            <div className={classes.InfoContainer} >
                <h3 className={classes.Title} >{Product["title"]}</h3>
                <div className={classes.Price}  >${Product["price"]}</div>
                <div className={classes.UIContainer} >
                    <AmountUI amount={amount} alCambiar={(n)=>setAmount(n)}  />
                    <button onClick={()=>AddToCart(Product)} className={classes.Button} >
                        {ButtonText}
                    </button>
               </div>
            </div>
        </div> 
       
      :FetchState === "error" ?
        <div className={classes.ErrorContainer}>
          Producto no existente o agotado
        </div>
      :
      <div className={classes.SpinnerContainer} > <Spinner/> </div>
      }
    </div>
  )
}

export default ProductPage
