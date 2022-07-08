import React, {Fragment} from 'react'
import classes from './ShowSavingState.module.css'
import Spinner from '../../../Spinner/Spinner'

const ShowSavingState = ({SavingState}) => {

  return (
    <div className= {classes.Container} >{
        SavingState ==="saving" ?
            <Spinner/>
        :SavingState ==="saved" ?
            <h4 className={classes.ChangeStateSuccess}>Cambios Guardados</h4>
        :SavingState ==="error" ?
            <h4 className={classes.ChangeStateError}>Error al Guardar...</h4>
        :SavingState ==="account_error" ?
            <Fragment>
            <h4 className={classes.ChangeStateError}>Acceso denegado</h4>
            <p className={classes.ChangeStateErrorSubtitle}>intente cerrar sesión e ingresar con la cuenta adecuada, si el problema persiste comuníquese con nosotros</p>
            </Fragment>
        :null
    }
    </div>
  )
}

export default ShowSavingState