import React from 'react'
import classes from './About.module.css'

const About = ({text}) => {
  return (
    <div className={classes.Container}>
        <p className={classes.About}>
            {text}
        </p>
    </div>
  )
}

export default About