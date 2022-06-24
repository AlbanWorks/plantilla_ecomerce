import React,{useState, useEffect, useContext,Fragment} from 'react'
import classes from './AdminPage.module.css'
import { DataContext } from '../../../provider'
import { useRouter } from 'next/router'
import { handleLogoUpload, setStoreInfo } from '../../../firebase/FirestoreMethods'
import { signOut } from "firebase/auth";
import { auth } from '../../../firebase/firebaseConfig';
import Spinner from '../../Spinner/Spinner'
import LogoTool from './LogoTool/LogoTool'




const AdminPage = () => {
    const {PublicInfo} = useContext(DataContext)
    const [PublicInfoFetched, setPublicInfoFetched] = useState(false)
    const [Name, setName] = useState("Nueva Tienda")
    const [Cellphone, setCellphone] = useState(123456)
    const [OldLogo, setOldLogo] = useState(false)
    const [NewLogo, setNewLogo] = useState(false)
    const [SavingState, setSavingState] = useState("not saved") 
    const router = useRouter() 

    useEffect(() => {

        console.log("rendereo");
    
    
    })

    useEffect(() => {
     console.log("cambia old logo y se detecta desde arriba");
    }, [OldLogo])
    
    
    useEffect(() => {
        if(PublicInfo !== null){
            setName(PublicInfo.StoreName)
            setCellphone(PublicInfo.Cellphone)
            setOldLogo(PublicInfo.Logo)
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
        const logoUrl = await handleLogoUpload(OldLogo,NewLogo)
        const Changes = await setStoreInfo(Name,Cellphone,logoUrl)
        if (Changes.err){
            if(Changes.err.code === "permission-denied")setSavingState("account_error")
            else setSavingState("error")
            
        } 
        else if (Changes.saved){
            setSavingState("saved")
            setName(Name)
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
                <h1 className={classes.Title}>{Name}</h1>
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
                <LogoTool setNewLogo={(photo)=>setNewLogo(photo)} OldLogo={OldLogo}/>
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