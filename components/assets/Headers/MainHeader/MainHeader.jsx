import React,{useContext} from 'react'
import { DataContext } from 'provider'
import classes from './MainHeader.module.css'
import Logo from '../../Logo/Logo'

const MainHeader = () => {

    const {PublicInfo} = useContext(DataContext)

    return (
        <div className={classes.MainHeaderContainer}>
            <nav className={classes.MainHeader}>{
                PublicInfo && !PublicInfo.error?
                    <h1 className={classes.MainHeaderTitle} >{PublicInfo.StoreName}</h1>
                :null
            }
            </nav>
            {
                PublicInfo && !PublicInfo.error?
                    <div className={classes.MainLogoContainer}>
                        <div className={classes.MainLogoSubContainer}>
                            <Logo logo={PublicInfo.Logo}/>
                        </div>
                    </div>
                :null
            }
        </div>   
    )
}

export default MainHeader

