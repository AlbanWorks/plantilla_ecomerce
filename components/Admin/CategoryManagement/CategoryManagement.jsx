
import React,{useState, useEffect, useContext, Fragment} from 'react'
import { DataContext } from '../../../provider'
import classes from './CategoryManagement.module.css'
import  Spinner  from "../../Spinner/Spinner"
import SavingStateAlert from './SavingStateAlert/SavingStateAlert'
import { getInfo, addCategory, deleteCategory } from '../../../firebase/FirestoreMethods'

const CategoryManagement = () => {

    const {PublicInfo, setPublicInfo } = useContext(DataContext)
    const [Categories, setCategories] = useState(null)
    const [SavingState, setSavingState] = useState("idle")
    const [Errors, setErrors] = useState(null)

    useEffect(() => {
        if(PublicInfo !== null){
            let CategoryIndex_copy  = [...PublicInfo.CategoryIndex]
            let ObjectList = []
            CategoryIndex_copy.forEach((category,index)=>{
                ObjectList.push({Name:category, isNew:false, delete: false, id: index })
            })
            setCategories(ObjectList)
        }
    }, [PublicInfo])



    const addLocalCategory = () => {
        const newCategory = {Name:"Nueva Categoía", isNew:true, delete: false , id: new Date().getTime()}
        setCategories([...Categories, newCategory])
    }

    const switchDeleteState = (index) => {
        let categories_copy = [...Categories]
        if(Categories[index].delete) retireveLocalCategory(index, categories_copy)
        else deleteLocalCategory(index, categories_copy)
        setCategories(categories_copy)
    }

    const retireveLocalCategory = (index, categories_copy) => {
        categories_copy[index].delete = false
    }

    const deleteLocalCategory = (index, categories_copy) => {
        if(categories_copy[index].isNew)categories_copy.splice(index,1)
        else categories_copy[index].delete = true
    }

    const handleChanges = (target,index) => {
        const errors = validate(target.value)
        changeStyles(errors,target,index)
        let categories_copy = [...Categories]
        if(categories_copy[index].isNew){
            //BUENO, cuando agregue una forma de renombrar categorías viejas quito este if
            categories_copy[index].Name = target.value
            setCategories(categories_copy) 
        }
    }

    const validate = (catName) => {
        if(catName === "") return true
        else return false
    }
    const validateAll = (Categories) => {
        let errors = false
        for (const category of Categories) {
            errors = validate(category.Name)
            if(errors) break
        }
        return errors
    }

    const changeStyles = (errors,target,index) => {
        if(errors) target.style.backgroundColor = "var(--color3Light)"
        else if (Categories[index].isNew)target.style.backgroundColor = "white"
        else target.style.backgroundColor = "rgb(235, 235, 235)"
       
    }

    const saveChanges = async (Categories) => {
        const errors = validateAll(Categories)
        if(errors){
            setSavingState("localErros")
            return  
        }
        const confirm = window.confirm("¿Desea guardar los cambios? si ha borra una o mas categorías, tenga en cuenta que todos los productos que hay en ella serán borrados permanentemente");
        if(!confirm) return
        setSavingState("saving")
        for (let category of Categories) {
            if(category.delete && !category.isNew){
                const deleteCat =  await deleteCategory(category.Name)
                if( deleteCat.err) alert(deleteCat.err)
            }
            if(category.isNew){
                console.log(category)
                const addCat =  await addCategory(category.Name)
                if( addCat.err) setErrors([...Errors, addCat.err])
            } 
        }
        if(Errors) setSavingState("errors")
        else{
            console.log("ahiva")
            const firebaseInfo = await getInfo()
            setPublicInfo(firebaseInfo)
            setSavingState("saved")
            setTimeout(()=>{setSavingState("idle")},1500)
        } 
    }

  return (
    <div className={classes.Container}>
        <header className={classes.TitleContainer}>
            <h1 className={classes.Title}>Administrador de Categorías</h1>
        </header>
        <span className={classes.SpanTemporal} >Por el momento, los nombres de las categorías no se pueden modificar luego de guardarse</span> 
        {
        Categories !== null && SavingState !=="saving" ?
        <Fragment>
            <div className={classes.CategoriesContainer} >
                <div className={classes.CategoriesLabelContainer}>
                    <span className={classes.CategoriesLabel}>Categorías</span>
                </div>
                {
                Categories.map((category,index) =>
                    <div key={category.id} className={classes.Category} >
                       {
                        category.isNew ?
                        <input 
                        type="text" 
                        defaultValue={category.Name} 
                        onChange={(e)=>handleChanges(e.target,index)}
                        className={Categories[index].delete ? classes.deleteInput : classes.Input} 
                        />
                        :
                        <input 
                        type="text" 
                        value={category.Name} 
                        onChange={(e)=>handleChanges(e.target,index)}
                        className={Categories[index].delete ? classes.deleteInput : classes.oldInput} 
                        />
                       }
                        <button className={classes.deleteButton} onClick={()=>switchDeleteState(index)}>
                            <i className={"fa-solid fa-circle-xmark"}></i>
                        </button>
                    </div>
                )}
            </div>
            <button onClick={()=>addLocalCategory()} className={classes.addButton}>Agregar Categoría</button>
            <button onClick={()=>saveChanges(Categories)} className={classes.saveButton}>Guardar Cambios</button>
        </Fragment>
        :
            <div>
                <Spinner/>
            </div>    
    }
    <SavingStateAlert SavingState={SavingState} Errors={Errors} /> 
    </div>
  )
}

export default CategoryManagement