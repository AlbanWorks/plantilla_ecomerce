import {React,Fragment} from 'react'
import Spinner from '../../../Spinner/Spinner'
import classes from './ListState.module.css'

const ListStateListener = ({ListState}) => {

return (
    <div className={classes.Container}>
    {
    ListState === "idle"?(
        <></>)
    :ListState === "saved"?(
        <span className={classes.Ok}> Productos Guardados</span>)
    :ListState === "save error"?(
        <span className={classes.Warning}>Error al Guardar</span>)
    :ListState === "local error"?(
        <span className={classes.Warning}>Corrija Todos Los Errores</span>)	
    :ListState === "saving"?(
        <Spinner/>)
    :(<></>)  
    }
    </div>
  )
}

export default ListStateListener