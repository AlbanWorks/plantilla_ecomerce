import React, {Fragment} from 'react'
import classes from './Button.module.css'
const Button = ({text, Click, variant}) => {
  return (
    <Fragment>{
        variant === 1 ?
            <button className={classes.ButtonV1} onClick={Click}>
                {text}
            </button>
        :variant === 2 ?  
            <button className={classes.ButtonV2} onClick={Click}>
                {text}
            </button>
        : <label>escoja una variante</label>
    }
    </Fragment>
  )
}

export default Button

