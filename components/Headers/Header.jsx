import React,{useContext,Fragment} from 'react'
import { DataContext } from '../../provider'
import classes from './Headers.module.css'
import Logo from './Logo/Logo'

const Header = () => {

    const {PublicInfo} = useContext(DataContext)    

    return (
        <Fragment>{
            PublicInfo && !PublicInfo.error?
            <header className={classes.Header}>
                <div className={classes.LogoContainer}><Logo logo={PublicInfo.Logo}/></div>
                <h1 className={classes.Title} >{PublicInfo.StoreName}</h1>
            </header>
            :
            <header className={classes.Header}>
                <h1 className={classes.Title} ></h1>
            </header>
            }
        </Fragment>
        
    )
}

export default Header
//