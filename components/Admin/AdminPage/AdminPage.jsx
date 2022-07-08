import React,{useState, useEffect, useContext,Fragment} from 'react'
import classes from './AdminPage.module.css'
import { DataContext } from '../../../provider'
import { useRouter } from 'next/router'
import { handleLogoUpload, setStoreInfo } from '../../../firebase/FirestoreMethods'
import { signOut } from "firebase/auth";
import { auth } from '../../../firebase/firebaseConfig';
import Spinner from '../../Spinner/Spinner'
import Input from './Input/Input'
import LogoTool from './LogoTool/LogoTool'
import ShowSavingState from './ShowSavingState/ShowSavingState'




const AdminPage = () => {
    const {PublicInfo} = useContext(DataContext)
    const [PublicInfoFetched, setPublicInfoFetched] = useState(false)
    const [Name, setName] = useState("Nueva Tienda")
    const [Cellphone, setCellphone] = useState(123456)
    const [Facebook, setFacebook] = useState("")
    const [Instagram, setInstagram] = useState("")
    const [OldLogo, setOldLogo] = useState(false)
    const [NewLogo, setNewLogo] = useState(false)
    const [SavingState, setSavingState] = useState("not saved") 
    const router = useRouter() 
    
    useEffect(() => {
        if(PublicInfo !== null){
            setName(PublicInfo.StoreName)
            setCellphone(PublicInfo.Cellphone)
            setFacebook(PublicInfo.SocialMedia.facebook)
            setInstagram(PublicInfo.SocialMedia.instagram)
            setOldLogo(PublicInfo.Logo)
            setPublicInfoFetched(true)
        }
    }, [PublicInfo])

    const checkName = (target) => {
        if(target.value ==="" || target.value.length > 20) target.error= true
        else{
            target.error = false
            setName(target.value)
        } 
    }
    const checkCellphone = (target) => {
        if(target.value ==="") target.error= true
        else {
            target.error= false
            setCellphone(target.value)
        }
    }
    const checkFacebook = (target) => {
        if(target.value ==="") target.error= true
        else {
            target.error= false
            setFacebook(target.value)
        }
    }
    const checkInstagram = (target) => {
        if(target.value ==="") target.error= true
        else {
            target.error= false
            setInstagram(target.value)
        }
    }
    
    const saveChanges = async (e) => {
        e.preventDefault()
        setSavingState("saving")
        const logoUrl = await handleLogoUpload(OldLogo,NewLogo)
        const Changes = await setStoreInfo(Name,Cellphone,Facebook,Instagram,logoUrl)
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
                <Input 
                    Label={"Nombre de la Tienda"} 
                    Value={Name} 
                    alCambiar={(target)=>{checkName(target)}} 
                    error={false}
                />
                <Input 
                    Label={"Teléfono sin espacios, debe tener Whatsapp"} 
                    Value={Cellphone} 
                    alCambiar={(target)=>{checkCellphone(target)}} 
                    error={false}
                />
                <Input 
                    Label={"Facebook de la Tienda (opcional)"} 
                    Value={Facebook} 
                    alCambiar={(target)=>{checkFacebook(target)}} 
                    error={false}
                />
                <Input 
                    Label={"Instagram de la Tienda  (opcional)"} 
                    Value={Instagram} 
                    alCambiar={(target)=>{checkInstagram(target)}} 
                    error={false}
                />
                <LogoTool setNewLogo={(photo)=>setNewLogo(photo)} OldLogo={OldLogo}/>
                <button className={classes.SaveButton} >Guardar Cambios</button>
            </form>
            <ShowSavingState SavingState={SavingState} />
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