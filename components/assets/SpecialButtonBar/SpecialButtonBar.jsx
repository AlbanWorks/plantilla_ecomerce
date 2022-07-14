import React,{useContext,Fragment} from 'react'
import { DataContext } from 'provider'
import classes from './SpecialButtonBar.module.css'
import Link from 'next/link'
import ShareButton from 'components/assets/Buttons/ShareButton/ShareButton'
import { useRouter } from 'next/router'

const SpecialButtonBar = () => {

    const {PublicInfo} = useContext(DataContext)
    const router = useRouter()

  return (
    <Fragment>{
        PublicInfo && !PublicInfo.error ?
            <div className={classes.Container}>{
                PublicInfo.SocialMedia.instagram !== ""?
                    <Link href={PublicInfo.SocialMedia.instagram}>
                        <button  className={classes.Button}
                            onClick ={()=>router.push(SocialMedia.instagram)}>
                            <i className="fa-brands fa-instagram"></i>
                        </button>
                    </Link>
                :null
                }{
                PublicInfo.SocialMedia.facebook !== ""?
                    <Link href={PublicInfo.SocialMedia.facebook}>
                        <button  className={classes.Button} 
                            onClick ={()=>router.push(SocialMedia.facebook)}>
                            <i className="fa-brands fa-facebook"></i>
                        </button>
                    </Link>
                :null
                }
                <div className={classes.ShareButtonContainer}>
                    <ShareButton/>
                </div>
        </div>
        :null
     }
    </Fragment>
    
  )
}

export default SpecialButtonBar  

