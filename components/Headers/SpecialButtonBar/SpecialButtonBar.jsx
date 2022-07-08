import React from 'react'
import classes from './style.module.css'
import Link from 'next/link'
import ShareButton from '../../ShareButton/ShareButton'

const SpecialButtonBar = ({SocialMedia}) => {
    

  return (
    <div className={classes.Container}>{
            SocialMedia.instagram !== ""?
            <Link href={SocialMedia.instagram}>
                <button  className={classes.Button}>
                    <i className="fa-brands fa-instagram"></i>
                </button>
            </Link>
            :null
        }{
            SocialMedia.facebook !== ""?
            <Link href={SocialMedia.facebook}>
                <button  className={classes.Button} onClick ={()=>router.push(SocialMedia.facebook)}>
                    <i className="fa-brands fa-facebook"></i>
                </button>
            </Link>
            :null
        }
        <div className={classes.ShareButtonContainer}>
            <ShareButton/>
        </div>
    </div>
  )
}

export default SpecialButtonBar  