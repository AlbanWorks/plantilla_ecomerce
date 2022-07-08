import React,{useContext} from 'react'
import { DataContext } from '../../provider'
import classes from './Headers.module.css'
import Logo from './Logo/Logo'
import SpecialButtonBar from './SpecialButtonBar/SpecialButtonBar'

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
                PublicInfo && !PublicInfo.error ? 
                    <SpecialButtonBar 
                        SocialMedia={PublicInfo.SocialMedia}
                    /> 
                : null
            }
            <div className={classes.Wave} style={{height: '150px', overflow: 'hidden'}}>
                <svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{height: '100%', width: '100%'}}>
                    <path 
                        d="M0.00,49.99 C170.31,103.09 251.56,31.09 500.00,49.99 L500.30,-1.90 L-1.56,-2.90 Z" 
                        style={{stroke: 'none', fill: 'var(--color1)'}}>
                    </path>
                </svg>
            </div>
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

