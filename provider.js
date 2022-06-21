import React,{createContext,useState, useEffect} from 'react';
import { getInfo } from './firebase/FirestoreMethods'

// CREO EL CONTEXTO
export const DataContext = createContext();

//esto es aparte y sirve para traer la informacion inicial de la tienda desde firebase
const fetchInfo = async () =>{
    if(PublicInfo === null){
        const firebaseInfo = await getInfo()
        setPublicInfo(firebaseInfo)
        console.log("done!");
    }  
}

//CREO UN COMPONENTE QUE ME PERMITA PROVEER LA INFORMACION A TODOS SUS HIJOS
//ESTE ES UN HIGHER ORDER COMPONENT

const DataProvider = ({children}) => {
//CREO LOS DATOS QUE VOY A COMPARTIR Y LOS MANDO EN EL PROVIDER CON value, UN OBJETO. 

const[Products, setProducts] = useState([])
const[CartProducts, setCartProducts] = useState([])
const[PublicInfo, setPublicInfo] = useState(null)

const fetchPublicInfo = async () =>{
    console.log("exects")
    if(PublicInfo === null){
        const firebaseInfo = await getInfo()
        setPublicInfo(firebaseInfo)
        console.log("done!");
    }  
}

useEffect(() => {
    fetchPublicInfo()
}, [])

    return (
        <DataContext.Provider value={{
            Products,
            setProducts,
            CartProducts,
            setCartProducts,
            PublicInfo, 
            setPublicInfo
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider

/*
Todo lo que este adentro del provider puede acceder a los datos y setearlos mediante las funciones
usando el hook useContext

const {data} = useContext(DataContext)

{data} la propiedad o funcion requerida entre corchetes, object destructuring.
(DataContext) es el nombre del contexto en el que se halla la propiedad.

*/ 
