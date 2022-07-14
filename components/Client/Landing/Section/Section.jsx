import React from 'react'
import classes from './Section.module.css'
import Link from 'next/link'

const Section = ({title, image}) => {
  return (
    <div className={classes.Container}>
        <div className={classes.Section}>
            <div className={classes.TitleContainer}>
                <h3 className={classes.Title}>{title}</h3>
            </div>
            <div className={classes.ImgContainer}>
                <img src={image} alt="imagen" className={classes.Img}/>
            </div>
            <div className={classes.ConsultButton}>
                <Link href={`https://api.whatsapp.com/send?text=${"Hola, quiero hacer una consulta"}&phone=+54${3814015520}`}>
                    <label className={classes.ConsultText}>
                        <i className="fa-brands fa-whatsapp"></i> Consultar
                    </label>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Section