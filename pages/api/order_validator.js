import Firestore from '../../firebase/FirebaseAdminConfig_deprecated'
import { firestore} from '../../firebase/FirebaseAdminConfig2'
import { cat_route } from '../../firebase/routes'

//-------------------------JSON validator---------------------------------------------
const ParseRequest = (request)=> {
try { 
    const parsedRequest = JSON.parse(request)
    return parsedRequest
    } 
catch(e) {
       return false
    }

}
//--------------------------List Format Validator-----------------------------------------
const isValidListFormat = (lista) =>{
    if(lista !== undefined && 
      Array.isArray(lista) && 
      lista.length > 0 &&
      LosProductosSonValidos(lista)) return true
      else return false
  }
  
  const LosProductosSonValidos = (lista) =>{
    let resultado = true
    for (let producto of lista) {
      if(Object.keys(producto).length !== 3 ||
        typeof producto.category !== "string" || 
        typeof producto.ID !== "string" || 
        typeof producto.amount !== "number") { resultado = false ; break }
      }
    return resultado
  }
//-------------------Firebase Validator-------------------------------------------------------

  const FirebaseValidation = async (list) =>{
    let ProductosValidados = []
    for(let productoLista of list){
     const productoFB = await getProduct(productoLista.category, productoLista.ID)
      if(productoFB && productoFB.stock === true){
         ProductosValidados.push({
           title: productoFB.title, 
           amount: productoLista.amount, 
           price: parseInt(productoFB.price)
           })
      }
      else {
        ProductosValidados = false
        break
      }
    }
    return ProductosValidados
  }

  const getProduct = async (category,ID ) => {
    const route = `${cat_route(category)}/${ID}`
    const docRef = firestore.doc(route);
    const docSnap = await docRef.get();
    if (docSnap.exists) {
        return docSnap.data();
    }     
    else {
    // doc.data() will be undefined in this case
     return false
    }
  }

//------------------------Ticket Creator----------------------------------------------------------

  const createTicket = (validatedList, infoAdicional)=>{
    const precioTotal = CalcularTotal(validatedList)
    const Ticket = {validatedList, infoAdicional, precioTotal} //ESCRIBIR BIEN
    return Ticket
  }
  
  const CalcularTotal = (validatedList)=>{
    let total = 0
    validatedList.forEach(product => {
      total += product.price * product.amount
    });
    return total
  }

//--------------------Response Handler--------------------------------------------------------------

  const Response = (res, code, data) =>{
    if(code >= 300 ){
      res.status(code).json({err: data})
    } 
    else res.status(code).json(data)
  }

//-------------------------------HANDLER---------------------------------------------------------------

const handler = async (req, res) => {
  if(req.method ==='POST'){
    const Parsed_Request = ParseRequest(req.body)
    if(!Parsed_Request){
      Response(res, 500, "error de formato JSON")
      return
    }
     
    if(!isValidListFormat(Parsed_Request.lista)){
      Response(res, 400, "formato de lista invalido")
      return
    }

    const Firebase_Validated_List = await FirebaseValidation(Parsed_Request.lista)
    if(! Firebase_Validated_List){
      Response(res, 400, "Uno o mas productos ya no están disponibles")
      return
    }

    const Ticket = createTicket(Firebase_Validated_List, Parsed_Request.infoAdicional)
    Response(res, 200, Ticket)
    }
  }


  export default handler


  