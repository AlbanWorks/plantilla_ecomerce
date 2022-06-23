import React,{useState, useEffect, useContext,Fragment} from 'react'
import classes from './AdminPage.module.css'
import { DataContext } from '../../../provider'
import { useRouter } from 'next/router'
import Spinner from '../../Spinner/Spinner'
import { setStoreInfo } from '../../../firebase/FirestoreMethods'
import { signOut } from "firebase/auth";
import { auth } from '../../../firebase/firebaseConfig';




const AdminPage = () => {
    const {PublicInfo} = useContext(DataContext)
    const [PublicInfoFetched, setPublicInfoFetched] = useState(false)
    const [Name, setName] = useState("Nueva Tienda")
    const [Cellphone, setCellphone] = useState(123456)
    const [SavingState, setSavingState] = useState("not saved")
    const [Title, setTitle] = useState("Nueva Tienda")
    const router = useRouter() 
    
    useEffect(() => {
        if(PublicInfo !== null){
            setName(PublicInfo.StoreName)
            setTitle(PublicInfo.StoreName)
            setCellphone(PublicInfo.Cellphone)
            setPublicInfoFetched(true)
        }
    }, [PublicInfo])

    const checkInputName = (target) => {
        if(target.value ==="") target.className = classes.InputError
        else{
            target.className = classes.Input
            setName(target.value)
        } 
    }
    const checkInputCellphone = (target) => {
        if(target.value ==="") target.className = classes.InputError
        else {
            target.className = classes.Input
            setCellphone(target.value)
        }
    }
    
    const saveChanges = async (e) => {
        e.preventDefault()
        setSavingState("saving")
        const Changes = await setStoreInfo(Name,Cellphone)
        if (Changes.err){
            if(Changes.err.code === "permission-denied")setSavingState("account_error")
            else setSavingState("error")
            
        } 
        else if (Changes.saved){
        setSavingState("saved")
            setTitle(Name)
           
            
        } 
    }

    const signOutUser = () =>{
        signOut(auth).then(() => {
            router.reload(window.location.pathname)
        }).catch((error) => {
            alert(error)
        });
    }

return (
    <Fragment>{
        PublicInfoFetched ?
        <div className={classes.Container}>
            <header className={classes.TitleContainer}>
                <h1 className={classes.Title}>{Title}</h1>
                <button 
                    className={classes.SignoutButton} 
                    onClick={()=> signOutUser()}>
                        Cerrar Sesión
                </button>
            </header>
            <button 
                className={classes.Button}
                onClick={()=> router.push("/admin/gestionar_categorias")}>
                    Administrar Categorías
            </button>
            <button
                className={classes.Button} 
                onClick={()=> router.push("/admin/gestionar_productos")}>
                    Administrar Productos
            </button>
            <h3 className={classes.StoreInfo}>Información de la tienda</h3>
            <form className={classes.Form} onSubmit={(e)=>saveChanges(e)}>
                <label className={classes.Label}>Nombre de la Tienda</label>
                <input
                    className={classes.Input} 
                    type="text" 
                    defaultValue={Name} 
                    onChange={(e)=>checkInputName(e.target)}
                />
                <label className={classes.Label}>Teléfono sin Espacios (debe tener Whatsapp)</label>
                <input
                    className={classes.Input} 
                    type="number" 
                    defaultValue={Cellphone} 
                    onChange={(e)=>checkInputCellphone(e.target)} 
                />
                <button className={classes.SaveButton} >Guardar Cambios</button>
                <div>{
                    SavingState ==="saving" ?
                    <div className={classes.SpinnerContainer}>
                        <Spinner/>
                    </div>
                    :SavingState ==="saved" ?
                    <div className={classes.ChangeStateContainer}>
                        <h4 className={classes.ChangeStateSuccess}>Cambios Guardados</h4>
                    </div>
                    :SavingState ==="error" ?
                    <div className={classes.ChangeStateContainer}>
                        <h4 className={classes.ChangeStateError}>Error al Guardar...</h4>
                    </div>
                    :SavingState ==="account_error" ?
                    <div className={classes.ChangeStateContainer}>
                        <h4 className={classes.ChangeStateError}>Acceso denegado</h4>
                        <p className={classes.ChangeStateErrorSubtitle}>intente cerrar sesión e ingresar con la cuenta adecuada, si el problema persiste comuníquese con nosotros</p>
                    </div>
                    :null
                }
                </div>
            </form>
            <div className={classes.Ball}/>         
        </div>
        :
        <div className={classes.MainSpinnerContainer} >
            <Spinner/>
        </div>
        
    }
    </Fragment>
  )
}

export default AdminPage