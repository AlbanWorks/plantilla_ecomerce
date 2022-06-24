import React,{useEffect, useState} from 'react'
import classes from './LogoTool.module.css'


const LogoTool = ({setNewLogo, OldLogo}) => {

const [localLogo, setlocalLogo] = useState(false)

useEffect(() => {
    setlocalLogo(OldLogo)
}, [OldLogo])
    

const handlePhoto = (e) => {
    const foto = e.target.files[0]
    if(foto){
        let reader = new FileReader()
        reader.onloadend = (e)=>{
            const { result } = e.target;
            //result es el file renderizado para ser previsualizado, foto es el file
            console.log("puro: ", foto.name);
            setlocalLogo(result)
            setNewLogo(foto)
        }
        reader.readAsDataURL(foto)
    }
}

return (
    <div className={classes.Container}>
        <label className={classes.Label} htmlFor='input_logo'><i className="fa-solid fa-camera"></i></label>
        <input
            id='input_logo' 
            className={classes.FileInput}
            type="file" 
            onChange={(e)=> handlePhoto(e)}
        />
        <div className={classes.PhotoContainer}>{
            localLogo ?
                <img className={classes.Img} src={localLogo} alt="photo" width="100%" />
            :null
        }
        </div>    
    </div>
  )
}

export default LogoTool