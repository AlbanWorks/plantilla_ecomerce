import React,{useContext,Fragment} from 'react'
import { DataContext } from 'provider'
import { useRouter } from 'next/router'
import Spinner from 'components/assets/Spinner/Spinner'
import classes from'./CategoryMenu.module.css'
import Button from 'components/assets/Buttons/Button/Button'

const CategoryMenu = () => {

    const {PublicInfo, setPublicInfo} = useContext(DataContext)
    const router = useRouter()
    

    const goTo = (direction) => router.push(direction)
    
    return (
        <div className={classes.Container}>
            {
                PublicInfo === null ?
                    <Fragment>
                        <h2 className={classes.Title}></h2>
                        <div className={classes.SpinnerContainer} ><Spinner/></div>
                    </Fragment>
                : PublicInfo.error ?
                    <h1>Se ha producido un error, intente recargar la página</h1>
                :
                <Fragment>
                    <h2 className={classes.Title}> Categorías </h2>
                    <nav className={classes.ButtonsContainer}>{
                        PublicInfo.CategoryIndex.map((CategoryName,index)=>
                            <div className={classes.ButtonContainer} key={index}>
                                <Button 
                                    variant={2}
                                    text={CategoryName} 
                                    Click={()=>goTo(`/${CategoryName}`)}
                                />
                            </div> 
                        )
                    }
                    </nav>
                </Fragment>
            }
        </div>
    )
}

export default CategoryMenu
