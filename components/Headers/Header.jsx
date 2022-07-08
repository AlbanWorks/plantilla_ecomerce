import React,{useContext,Fragment} from 'react'
import { DataContext } from '../../provider'
import classes from './Headers.module.css'
import Logo from './Logo/Logo'
import ShareButton from '../ShareButton/ShareButton'

const Header = () => {

    const {PublicInfo} = useContext(DataContext)    

    return (
        <Fragment>{
            PublicInfo && !PublicInfo.error?
            <header className={classes.Header}>
                <div className={classes.LogoContainer}><Logo logo={PublicInfo.Logo}/></div>
                <h1 className={classes.Title} >{PublicInfo.StoreName}</h1>
                <div className={classes.ShareButtonContainer}>
                    <ShareButton/>
                </div>
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
/*
.Button{
    outline: none;
    border: none;
    margin:0;
    width: 60px;
    background: none ;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color3Light);
}
.Button i {
    font-size: 40px;
}
.Button:hover i{
    font-size: 45px;
    color: var(--color3);
}
.Button:active i{
    font-size: 45px;
    color: var(--color3);
}

.Copiado{
    font-size: 12px;
    font-weight: 600;
}
*/