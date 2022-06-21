import React,{useContext} from 'react'
import { DataContext } from '../../provider'
import { useRouter } from 'next/router'
import Spinner from '../Spinner/Spinner'
import classes from'./CategoryMenu.module.css'

const CategoryMenu = () => {

    const {PublicInfo, setPublicInfo} = useContext(DataContext)
    const router = useRouter()
    

    const goTo = (direction) => router.push(direction)
    
    return (
        <div className={classes.Container}>
            <h2 className={classes.Title}> Categorías </h2>{
                PublicInfo === null ?
                    <div className={classes.SpinnerContainer} >
                        <Spinner/>
                    </div>
                : PublicInfo.error ?
                    <h1>Se ha producido un error, intente recargar la página</h1>
                :
                <nav className={classes.ButtonsContainer}> 
                    {
                    PublicInfo.CategoryIndex.map((CategoryName,index)=> 
                        <button className={classes.Button} key={index} onClick={()=>goTo(`/${CategoryName}`)}> 
                            {CategoryName}
                        </button>)
                    }
                </nav>
            }
            <div className={classes.Ball}/>
        </div>
    )
}

export default CategoryMenu
