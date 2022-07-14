import React,{useState, useEffect, useRef, useContext} from 'react'
import { useRouter } from 'next/router'
import classes from './Cart.module.css'
import { DataContext } from 'provider'
import CartProduct from './CartProduct/CartProduct'
import CartButton from './CartButton/CartButton'
import AltButton from 'components/assets/Buttons/AltButton/AltButton'

const Cart = () => {

    const {CartProducts} = useContext(DataContext)
    const {setCartProducts} = useContext(DataContext)
    const [Total, setTotal] = useState(0)  
    const [active, setActive] = useState(false) 
    const [EmptyCartAlert, setEmptyCartAlert] = useState(true)  
    const router = useRouter()
    const containerRef = useRef()

const CalcularTotal = ()=>{
        let Precio = 0;
        CartProducts.forEach(product => {
            Precio += parseInt(product.price, 10) * product.amount;
        });
        setTotal(Precio)
    }    

useEffect(() => {
    CalcularTotal()
    if(CartProducts.length > 0) setEmptyCartAlert(false)
}, [CartProducts, CalcularTotal])



const IniciarCompra= () =>{
    if(CartProducts.length > 0) router.push('/pedidos')
    else setEmptyCartAlert(true)
}
const closeCart = (e) => {
    if(e.target === containerRef.current) setActive(false)
}

    return (
        <div>{
         active ? (
            <div className={classes.CartContainer} ref={containerRef} onClick={(e)=> closeCart(e)} >
                <div className={classes.Cart} >
                    <h2 className={classes.Titulo} >Carrito de Compras</h2>
                   <div className={classes.ProductBill} >
                        {CartProducts.map((item,index)=>
                            <CartProduct key ={index} thisProdIndex= {index} product = {item}/>
                        )} {EmptyCartAlert ? (
<p>-El carrito está vacío...</p>
                        ):(
<></>
                        ) }
                   </div>
                   <h3 className={classes.Total}>Total ${Total}</h3>
                    <div className={classes.Botonera} >
                        <div className={classes.ButtonContainer}>
                            <AltButton 
                                text={"Vaciar Carrito"} 
                                variant={1} 
                                Click={() => setCartProducts([])} 
                            />
                        </div>
                        <div className={classes.ButtonContainer}>
                            <AltButton 
                                text={"Iniciar Compra"} 
                                variant={2} 
                                Click={() => IniciarCompra()} 
                            />
                        </div>
                        <div className={classes.ButtonContainer}>
                            <AltButton 
                                text={"Cerrar"} 
                                variant={3} 
                                Click={()=>setActive(false)} 
                            />
                        </div>
                    </div>
                </div> 
            </div>
         ):(
            <CartButton alClickar={()=>setActive(true)}/>
         )
        }</div> 
    )
}


export default Cart

/*
<h2>ESTE ES EL CARRITO</h2>
            {CartProducts.map((item,index)=>
               <CartProduct key ={index} thisProdIndex= {index} product = {item}/>
            )} 
            <h3>Total ${Total}</h3>
            <button onClick={() => setCartProducts([])}>Vaciar Carrito</button>
            <button onClick={() => EnviarListaDeCompra()} >Comprar</button> 
*/