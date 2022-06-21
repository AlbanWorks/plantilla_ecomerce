import React,{useContext} from 'react'
import { DataContext } from '../../provider'
import classes from './Headers.module.css'

const MainHeader = () => {

    const {PublicInfo} = useContext(DataContext)

    return (
        <div className={classes.MainHeaderContainer}>
            <nav className={classes.MainHeader}>{
                PublicInfo && !PublicInfo.error?
                    <h1 className={classes.MainHeaderTitle} >{PublicInfo.StoreName}</h1>
                :
                <div>adorno</div>
            }
            </nav>
            <div className={classes.Wave} >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="var(--color1)" fill0pacity="1" d="M0,224L80,234.7C160,245,320,267,480,234.7C640
                    ,203,800,117,960,106.7C1120,96,1280,160,1360,192L1440,224L1440,0L1360,0C1280,0,1120,0,
                    960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z">
                    </path>
                </svg>
            </div>
        </div>   
    )
}

export default MainHeader
