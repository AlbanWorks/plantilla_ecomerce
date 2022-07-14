import React,{useState, useEffect, useContext} from 'react'
import classes from './OrdersUI.module.css'
import { DataContext } from 'provider'
import { useRouter } from 'next/router'
import TicketListener from './TicketListener/TicketListener'
import Button from 'components/assets/Buttons/Button/Button'
import {checkFormat, CreateOrder, SendOrder,  SendWhatsapp, getLocalStorageValues, setLocalStorageValues} from './OrderMethods'
import Input from 'components/assets/Inputs/Input/Input'

const GatewayUI = () => {
    
    const {CartProducts,setCartProducts,PublicInfo} = useContext(DataContext)
    const [Direction, setDirection] = useState("") 
    const [Indications, setIndications] = useState("") 
    const [OrderState, setOrderState] = useState({notSended:"orden aun no enviada"})
    const [Response, setResponse] = useState()  
    const [DirectionTitle, setDirectionTitle] = useState("Dirección *")
    const router = useRouter() 

    useEffect(() => {
        setDirection(getLocalStorageValues("Direction"))
        setIndications(getLocalStorageValues("Indications"))
    }, [])

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
        setDirectionTitle("Coloque una dirección válida 🢃")
        setTimeout(() => {
            setDirectionTitle("Dirección *")
        }, 2000);
    }

    

    useEffect(() => {
        if(OrderState.SuccesfulResponse) SendWhatsapp(Response, PublicInfo.Cellphone)
    }, [OrderState])
    
    return (
        <div className={classes.PageContainer} >
            <div className={classes.Container} >
                <TicketListener info={Response} OrderState={OrderState}  className={classes.TListener}/>{

                OrderState.notSended ?(
                <>
                    <div className={classes.AditionalDataContainer} >
                        <Input 
                            Label={DirectionTitle} 
                            Value={Direction} 
                            alCambiar={(target)=>{setDirection(target.value)}} 
                            error={false}
                        />
                        <Input 
                            Label={"Indicaciónes, ayudanos a encontrarte (opcional)"} 
                            Value={Indications} 
                            alCambiar={(target)=>{setIndications(target.value)}} 
                            error={false}
                        />
                    </div>
                    <div className={classes.Botonera} >
                        {
                            PublicInfo && !PublicInfo.error?
                            <div className={classes.ButtonContainer}>
                                <Button text={"Hacer Pedido"} variant={2} Click={() => InitSendingPorcess()}/>
                            </div>   
                            :null    
                        }
                        <div className={classes.ButtonContainer}>
                            <Button text={"Volver"} variant={1} Click={()=>{router.push('/')}}/>
                        </div> 
                    </div>
                </>)
                :OrderState.waitingResponse ? null
                :OrderState.ErrorResponse ? // ERROR EN LA RESPUESTA 
                    <div className={classes.ButtonContainer}>
                        <Button text={"Volver"} variant={1} Click={()=>{router.push('/')}}/>
                    </div>
                :null//RESPUESTA EXITOSA
                }
           </div>
        </div>
    )
}
export default GatewayUI
