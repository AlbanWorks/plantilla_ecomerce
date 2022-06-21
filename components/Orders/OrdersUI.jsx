import React,{useState, useEffect, useContext,useRef} from 'react'
import classes from './OrdersUI.module.css'
import { DataContext } from '../../provider'
import { useRouter } from 'next/router'
import TicketListener from './TicketListener/TicketListener'
import {checkFormat, CreateOrder, SendOrder,  SendWhatsapp, getLocalStorageValues, setLocalStorageValues} from './OrderMethods'


const GatewayUI = () => {
    
    const {CartProducts,setCartProducts,PublicInfo} = useContext(DataContext)
    const [Direction, setDirection] = useState("") 
    const [Indications, setIndications] = useState("") 
    const [OrderState, setOrderState] = useState({notSended:"orden aun no enviada"})
    const [Response, setResponse] = useState()  
    const [DirectionTitle, setDirectionTitle] = useState("Dirección *")
    const DirectionRef =useRef()
    const router = useRouter() 

    useEffect(() => {
        setDirection(getLocalStorageValues("Direction"))
        setIndications(getLocalStorageValues("Indications"))
    }, [])

    useEffect(() => {
        if(OrderState.SuccesfulResponse) SendWhatsapp(Response, PublicInfo.Cellphone)
    }, [OrderState])

    const InitSendingPorcess = async () =>{
        const formatChecking = checkFormat(Direction,Indications)
        if(formatChecking.notPassed){
            alertInputError()
            return
        }
       
        const Order = CreateOrder(CartProducts,Direction,Indications)
        
        setOrderState({waitingResponse:"esperando respuesta del server"})
        const res = await SendOrder(Order)
        setResponse(res)
        if(res.err){
            setOrderState({ErrorResponse:"el server ha respondido con un error"})
            return
        }
        setOrderState({SuccesfulResponse:"el server ha respondido exitosamente"})
        setCartProducts([])
        setLocalStorageValues(Direction, Indications)
    }

    const alertInputError= ()=>{
        DirectionRef.current.style.color = "rgb(255, 113, 113)"
        setDirectionTitle("Coloque una dirección válida 🢃")
        setTimeout(() => {
            if(DirectionRef.current !== null) DirectionRef.current.style.color = "rgb(68, 68, 68)"
            setDirectionTitle("Dirección *")
        }, 2000);
    }
    
    return (
        <div className={classes.PageContainer} >
            <div className={classes.Container} >
                <TicketListener info={Response} OrderState={OrderState}  className={classes.TListener}/>{

                OrderState.notSended ?(
                <>
                    <div className={classes.AditionalDataContainer} >
                        <p className={classes.Direction} ref={DirectionRef}>{DirectionTitle}</p>
                        <input 
                            type="text" 
                            onChange={(e)=>{setDirection(e.target.value)}} 
                            className={classes.InputText}
                            defaultValue={Direction}
                        />
                        <p className={classes.Indications} >Indicaciónes, ayudanos a encontrarte (opcional)</p>
                        <input 
                            type="text" 
                            placeholder='Tu nombre, la descripción de tu casa, etc.' 
                            onChange={(e)=>{setIndications(e.target.value)}}
                            className={classes.InputText}
                            defaultValue={Indications}
                        />
                    </div>
                    <div className={classes.Botonera} >
                        {
                            PublicInfo && !PublicInfo.error?
                                <button 
                                    onClick={() => InitSendingPorcess()} 
                                    className={classes.ButtonComprar}> 
                                        Hacer Pedido 
                                </button>
                            : null    
                        }
                        <button 
                            onClick={()=>{router.push('/')}} 
                            className={classes.ButtonVolver}
                        > Volver </button>
                    </div>
                </>)

                :OrderState.waitingResponse ?(

                <>
                    
                </>)
                :OrderState.ErrorResponse ?( // ERROR EN LA RESPUESTA 
                <>
                     <button 
                            onClick={()=>{router.push('/')}} 
                            className={classes.ButtonVolver}
                    > Volver </button>
                </>)
                :(//RESPUESTA EXITOSA
                <>
                </>
                )
                }
           </div>
        </div>
    )
}
export default GatewayUI
