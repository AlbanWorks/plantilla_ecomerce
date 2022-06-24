import React,{useState,useEffect} from 'react'
import classes from './FB.module.css'
import refFromURL from "@firebase/storage"
const CategoryFinder = () => {

const [Photo, setPhoto] = useState(false)

useEffect(() => {

    console.log("rendereo");


})


const handlePhoto = (e) => {
    console.log("chanfa");
    const foto = e.target.files[0]
    if(foto){
        let reader = new FileReader()
        reader.onloadend = (e)=>{
            const { result } = e.target;
            setPhoto(result)
        }
        reader.readAsDataURL(foto)
    }
}

const SendPhoto = () => {
    
}

return (
    <div className={classes.PageContainer}>
        <input type="file" onChange={(e)=> handlePhoto(e)} />
        {
            Photo?
            <div className={classes.Container}>
                <img className={classes.Img} src={Photo} alt="" width="100%" />
            </div>
            :
            <div className={classes.Container}>non</div>
        }
        <button onClick={sendPhoto} >send</button>
    </div>
  )
}

export default CategoryFinder

//<img className={classes.Img} src={Photo} alt="" width="100%"/>