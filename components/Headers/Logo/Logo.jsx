import React from 'react'
import classes from './Logo.module.css'


const Logo = ({logo}) => {

return (
    <div className={classes.PhotoContainer}>{
        logo ?
            <img className={classes.Img} src={logo} alt="photo" width="100%" />
        :null
        }
    </div>      
  )
}

export default Logo