
const checkInput = (target) =>{
    let errors = false
    if(target.name ==="title") errors = checkTitle(target.value)
    else if(target.name ==="brand") errors = checkBrand(target.value)
    else if(target.name ==="price") errors = checkPrice(target.value)
    else if(target.name ==="picFile") errors = checkPicFile(target.value)
    return errors
}

const checkList = (productList) => {
    let error = false
    for (let product of productList) {
      	error = checkProduct(product)
      	if (error) break
    }
    return error
}

const checkProduct = (product) =>{
    const errtitle = checkTitle(product.title)
    const errBrand = checkBrand(product.brand)
    const errPrice = checkPrice(product.price)
    const errPicFile = checkPicFile(product.picFile)
    if(errtitle || errBrand || errPrice || errPicFile) return true
    else return false
}
  


// Aqui se pueden setear las reglas para cada tipo de input:

const checkTitle = (title)=>{
    if(title==="") return true 
    else return false
}

const checkBrand = (brand)=>{
    if(brand==="") return true 
    else return false
} 

const checkPrice = (price)=>{
    if(price==="") return true
    else return false
}
const checkPicFile= (picFile)=>{
    //en el caso de un producto existente picFile = undefined, pues no tiene ese field. en ese caso tampoco hay errores
    if(picFile === "")return true
    else return false
    
}  

const SaveChanges = (input,index,ProductList) => {
	const newProductList = [...ProductList]
	if(input.name === "picFile") newProductList[index][input.name] = input.files[0]
    else newProductList[index][input.name] = input.value
	return newProductList
}

//----------------ESTILOS-----------------------

const handleErrorStyles = (errors, input) => {
    if(input.name ==="picFile") stylePictureImput(input, errors)
    else if(errors) input.style.backgroundColor = "rgb(255, 143, 143)"
    else input.style.backgroundColor = "white"
}  

const stylePictureImput = (input,errors) => {
    if(errors) input.parentNode.style.color = "rgb(255, 143, 143)"
    else input.parentNode.style.color = "rgb(25, 212, 56)"
} 

export { checkInput, checkList, handleErrorStyles, SaveChanges}