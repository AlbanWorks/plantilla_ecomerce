import React,{useContext} from 'react'
import { DataContext } from 'provider'
import classes from './LandingHeader.module.css'
import Logo from 'components/assets/Logo/Logo'
import Link from 'next/link'
import { useRouter } from 'next/router'

const LandingHeader = () => {
    const {PublicInfo} = useContext(DataContext)
    const router = useRouter()

  return (
    <header className={classes.Header}>{
        PublicInfo && !PublicInfo.error?
            <div className={classes.LogoContainer}>
                <div className={classes.LogoSubContainer}>
                    <Logo logo={PublicInfo.Logo}/>
                </div>
            </div>
        :null
        }
        <div className={classes.AncorContainer}>
            <div className={classes.Ancor}>
                <Link href={`#`}>
                    <i className="fa-brands fa-instagram"></i>
                </Link>
            </div>
            <div className={classes.Ancor}>
                <Link href={`https://api.whatsapp.com/send?text=${"Hola, quiero hacer una consulta"}&phone=+54${3814015520}`}>
                    <i class="fa-brands fa-whatsapp"></i>
                </Link>
            </div>
            <div className={classes.Ancor} onClick={()=> router.push("/")}>
                    <i class="fa-solid fa-bag-shopping"></i>
            </div>
        </div>
    </header> 
  )
}

export default LandingHeader

/*
<Link href={'http://graficatucuman.com/</nav>'}>
                    <i className="fa-brands fa-instagram"></i>
                </Link>
*/