import React from 'react'
import classes from './Title.module.css'

const Title = () => {
  return (
    <div className={classes.TitleContainer}>
        <h1 className={classes.Title}>
            Alban Print
        </h1>
        <div className={classes.Trapezoid}></div>
    </div>
  )
}

export default Title