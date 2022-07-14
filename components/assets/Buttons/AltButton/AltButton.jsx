import React,{Fragment} from 'react'
import classes from './AltButton.module.css'
const AltButton = ({text, Click, variant}) => {

    return (
        <Fragment>{
            variant === 1 ?
                <button className={classes.AltButtonV1} onClick={Click}>
                    {text}
                </button>
            :variant === 2 ?  
                <button className={classes.AltButtonV2} onClick={Click}>
                    {text}
                </button>
            :variant === 3 ?  
                <button className={classes.AltButtonV3} onClick={Click}>
                    {text}
                </button>    
            : <label>escoja una variante</label>
        }
        </Fragment>
    )
}

export default AltButton