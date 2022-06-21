import{React, useState}from 'react'
import classes from './FB.module.css'


const FanctButton = ({alcambiar}) => {
const [ballState, setBallState] = useState(false)


  return (
    <div className={ballState?(classes.contenedorEncendida):(classes.contenedorApagado)}>
        <div 
            className={ballState?(classes.bolaEncendida):(classes.bolaApagada)} 
            onClick={()=>(setBallState(!ballState))}
        />
    </div>
  )
}

export default FanctButton