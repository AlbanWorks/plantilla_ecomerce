import React from 'react'
import classes from './Logo.module.css'
import { useRouter } from 'next/router'

const Logo = ({logo}) => {
    const router = useRouter()

return (
    <div className={classes.PhotoContainer} onClick={()=>router.push('/')}>{
        logo ?
            <img className={classes.Img} src={logo} alt="photo" width="100%" />
        :null
        }
    </div>      
  )
}

export default Logo