import React,{useState} from 'react'
import classes from './ShareButton.module.css'

const ShareButton = () => {
const [copied, setcopied] = useState(false)

const shareLink = () =>{
    navigator.clipboard.writeText(window.location.href);
    setcopied(true)
    setTimeout(()=>{
        setcopied(false)
    },800)
}

  return (
    <button  className={classes.Button} onClick ={shareLink}>{
        copied ?
            <span  className={classes.Copied} >Copiado</span>
        :
            <i className="fa-solid fa-share-nodes"></i>
        }
    </button>
  )
}

export default ShareButton