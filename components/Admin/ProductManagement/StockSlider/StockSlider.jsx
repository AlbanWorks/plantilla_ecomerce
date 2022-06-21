import{React, useState, useEffect} from 'react'
import classes from './StockSlider.module.css'

const StockSlider = ({stock, alCambiar}) => {
    const [localStock, setLocalStock] = useState(stock)
    useEffect(() => {
   alCambiar(localStock)
    }, [localStock])
    
  return (
    <div className={classes.contenedor}>
        <div className={localStock === true ?(classes.BarraEncendida):(classes.BarraApagada)}>
            <div 
                className={localStock === true ?(classes.bolaEncendida):(classes.bolaApagada)} 
                onClick={()=>(setLocalStock(!localStock))}
            />
        </div>
    </div>
  )
}

export default StockSlider