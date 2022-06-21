import React from 'react'
import {db} from '../../firebase/firebaseConfig'
import { collection, getDocs, doc, getDoc, setDoc, addDoc, deleteDoc, query, where } from "firebase/firestore"
import { addCategory, deleteCategory } from '../../firebase/FirestoreMethods'
import { cat_route } from '../../firebase/routes'
const CategoryFinder = () => {

    const find = async ()=>{
      try {
        console.log("commencing");
        //await setDoc(doc(db, cat_route("CATEGORIA"), "DOCUMENTO" ), {hola:"asdasdasd"});
        //await addCategory("CAT_PRUEBA")
        await deleteCategory("CAT_PRUEBA")
        //await deleteDoc(doc(db, cat_route("zedong"),"sss"))
        console.log("fin");
      } 
      catch (err){
        console.log(err);
      }
    }

  return (
    <div>categoryFinder
        <button onClick={()=>find()}>CLICK</button>
    </div>
  )
}

export default CategoryFinder