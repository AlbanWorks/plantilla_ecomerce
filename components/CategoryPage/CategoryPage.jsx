import {React, useState, useEffect,useContext} from 'react'
import classes from './CategoryPage.module.css'
import { DataContext } from '../../provider'
import {getCollection} from "../../firebase/FirestoreMethods"
import Product from './Product';
import Spinner from '../Spinner/Spinner'

const CategoryPage = ({category}) => {

    const {Products} = useContext(DataContext)
    const {setProducts} = useContext(DataContext)
    const [ProductsFetched , SetProductsFetched] = useState(false)

    useEffect(() => {
        const fetchData = async () =>{
            const rawProductList = await getCollection(category)
            const onStockProductList = rawProductList.filter(product => product.stock === true)
            setProducts(onStockProductList)  
            SetProductsFetched(true)
        }
        fetchData()
    }, [])
    
    return (
        <div className={classes.CategoryPage}>{
            ProductsFetched ? (
                Products.map((item,index)=>
                    <Product key={index} LocalProduct = {item} />
                )
            ):(
                <div className={classes.SpinnerContainerPF} >
                    <Spinner/>
                </div>
            )}
        </div>
    )
}

export default CategoryPage
