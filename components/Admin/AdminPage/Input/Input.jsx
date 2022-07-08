import React from 'react'
import classes from './Input.module.css'
const Input = ({Label, Value, alCambiar, error }) => {

  return (
    <div className={classes.Container}>
        <label className={classes.Label}>{Label}</label>
        <input
            className={error ? classes.ErrorInput : classes.Input } 
            type="text" 
            defaultValue={Value} 
            onChange ={(e)=>{alCambiar(e.target)}}
        />
    </div>
  )
}

export default Input