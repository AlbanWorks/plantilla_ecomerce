import React, {useState, useEffect, Fragment} from 'react'
import {signInWithPopup, GoogleAuthProvider, onAuthStateChanged} from "firebase/auth";
import classes from './Signin.module.css'
import { auth } from '../../../firebase/firebaseConfig';
import Spinner from '../../Spinner/Spinner'

const Signin = ({setLogin}) => { 
    const [showUI, setshowUI] = useState(false)

    useEffect(() => {
      onAuthStateChanged(auth, user => {
        if (user) setLogin(true)
        else setshowUI(true)
      })
    }, [])

    const signIn = () => {
        const provider = new GoogleAuthProvider(); 
        signInWithPopup(auth, provider)
        .then((result) => {
            // esto lo copié de la documentacion oficial, ver como reemplazar esto por async await, no se como recibir el "result"
            console.log(result);
            setLogin(true)
        }).catch((error) => {
            // esto lo copié de la documentacion oficial, ver como reemplazar esto por async await, no se como recibir el "error"
            console.log(error);
        });
    }

  return (
    <Fragment>{
      showUI?
      <div className={classes.Container}>
         <h2 className={classes.Title}>Gestión de Tiendas</h2>
        <h4 className={classes.SubTitle}>Desde aquí podrás gestionar tu tienda. <br /><br /><b> Ingresa siempre usando el mismo correo</b></h4>
          <button className={classes.Button} onClick={()=>signIn()}>Ingresar</button>
        <h5 className={classes.Info}>Por cualquier duda comunicate con nosotros</h5>
      </div>
      :
        <div className={classes.Container}>
          <Spinner/>
        </div>  
      }
    </Fragment>
  )
}

export default Signin