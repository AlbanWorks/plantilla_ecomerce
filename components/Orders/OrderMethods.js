

//---- validaciones de formato en los inputs de info y direccion-----
const checkFormat = (Direction, Indications)=>{
    if(typeof Direction ==='string' 
    && Direction.length > 0 
    && Direction.length < 100
    && typeof Indications ==='string'
    && Indications.length < 150)return {passed: "TEST PASSED"}
    else return {notPassed: "TEST NOT PASSED"}
   }
//-------------------------------------------------------------------

const CreateOrder = (CartProducts, Direction, Indications) => {
    //RENOMBRAR LOS COMPONENTES CON CUIDADO (EN EL SERVER FIGURAN CON NOMBRES VIEJOS, CAMBIAR)
    let lista =[]
    CartProducts.forEach(product => {
        const category =    product["category"]
        const ID       =    product["ID"]
        const amount   =    product["amount"]

        lista.push({category, ID, amount})  
    });
    const infoAdicional={Direction, Indications}
    const order ={lista, infoAdicional}
    console.log("de la nueva", order)
    return order
}

const SendOrder = async (order)=>{
    const req = await fetch("/api/order_validator",{method: 'POST',body: JSON.stringify(order)})
    const res = await req.json();
    return res
}

//-------------------------------Whatsapp----------------------------------------------------

const SendWhatsapp = (res, number)=>{
    const message = ConstructMessage(res)
    window.location.href = `https://api.whatsapp.com/send?text=${message}&phone=+54${number}`
    //ese +54 va a dar problemas si algun dia se hace internacional, ojalá..
 }

const ConstructMessage = (res)=>{
   
    let msj = `👋 Hola, he realizado un pedido\n\n`
    res.validatedList.forEach(product => {
      msj = msj.concat(`${product.amount} ${product.title}\n`)
    });
    msj = msj.concat(`Para: ${res.infoAdicional.Direction}, ${res.infoAdicional.Indications}\n`)
    msj = msj.concat(`\n\nTotal: $${res.precioTotal}`)
  //debo pasar el url a utf-8 porque a veces hay acentos y cosas
  const mensajeUTF8= encodeURIComponent(msj)
  return mensajeUTF8
}

//-----------------localstorage values para evitar rellenar siempre, provisorios, lo ideal es usuario en firebase.

const getLocalStorageValues = (value)=>{
    const parsedData =  JSON.parse(localStorage.getItem("clientData"))
    if(parsedData === null) return ""
    const LSvalue = parsedData[value]
    if(LSvalue === null) return ""
    else return LSvalue
} 

const setLocalStorageValues = (Direction, Indications)=>{
    const data = {Direction, Indications}
    localStorage.setItem("clientData", JSON.stringify(data))
}


export {checkFormat, CreateOrder, SendOrder,  SendWhatsapp, getLocalStorageValues, setLocalStorageValues}




  
    