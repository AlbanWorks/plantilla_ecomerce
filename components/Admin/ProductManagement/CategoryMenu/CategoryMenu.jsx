import {React,useState, useEffect, useContext} from 'react'
import { DataContext } from '../../../../provider'
import classes from './CategoryMenu.module.css'

const CategoryMenu = ({Fetch}) => {

    const {PublicInfo} = useContext(DataContext)
    const [Categories, setCategories] = useState(null)
   
    useEffect(() => {
        if(PublicInfo !== null){
            setCategories(PublicInfo.CategoryIndex)
        }
    }, [PublicInfo])
    

  return (
    <div className={classes.Container} >{
        Categories !== null ?
            Categories.map((cat,index) =>
                <button
                className={classes.Button}
                key={index} 
                onClick={()=>Fetch(cat)}>
                    {cat}
                </button>
            )
        :null
        }
    </div>
  )
}

export default CategoryMenu