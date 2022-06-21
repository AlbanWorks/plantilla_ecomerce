import React from 'react'
import Spinner from '../../../Spinner/Spinner'

const SavingStateAlert = ({SavingState, Errors}) => {

  return (
    <div>{
        SavingState === "saved" ?
            <h3>Cambios Guardados</h3>
        :SavingState === "localErros" ? 
            <h3>Corrija todos los Errores</h3>
        :SavingState === "error" ?
            <div> 
                <p>Han ocurrido algunos errores, por favor comuniquese con el equipo de asistencia y compartale el siguiente reporte:</p>
                {
                Errors.map((err,index)=>
                    <p key={index} >{err}</p>
                )
            }
            </div>
        :null    
    }
    </div>
  )
}

export default SavingStateAlert