
import React,{useEffect} from 'react'


const CategoryFinder = () => {
  useEffect(() => {
    console.log(process.env.NEXT_PUBLIC_SALUDO);
  }, [])
return (
    <div >
       holas
    </div>
  )
}

export default CategoryFinder

//<img className={classes.Img} src={Photo} alt="" width="100%"/>