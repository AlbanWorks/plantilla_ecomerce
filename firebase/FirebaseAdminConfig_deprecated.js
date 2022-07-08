import { getFirestore } from "firebase-admin/firestore"
import { initializeApp, cert } from "firebase-admin/app";

//debo proteger los parámetros debajo con variables de entorno, en especial privateKey
//abajo doy acceso a firebase desde el servidor
// para evitar que se vuelva a inicializar debo comprobar cada vez que la uso, desconozco si hay
//una solucion mas elegante, 
// es un gaje de next api routes?? se recompila y re ejecuta los modulos importados
//----------------------------------------

//1- inicializo la app, en realidad doy acceso desde el backend a firebase

 const Firestore = () =>{
    try{
          initializeApp({
            credential: cert({
                projectId: "mamatienda-a7d3c",
                clientEmail: "firebase-adminsdk-7mlww@mamatienda-a7d3c.iam.gserviceaccount.com",
                privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDrj7B0dBiX9+ld\nORsl0LB8KOitlDYV78ANxpBrnyS0P1LVUio8ymFCTwDOAsG4ypURRbXYpy9FY6Ou\nE6yaoAY8TPW0zNg8men1ZNje4ahXH8wpKamFsXdtVAe/khP19EiHUY0p2cI0L2Ml\nfZJKhKCgEfUCkEbLNsCob04BSWXUmCBqfd0uozbCFroOcEcV8HY3rHPbyAB9TYE/\niGGi6/VmFpiSfAtmMQIBqEi7kLyU1/nhU/CbBDNyoSQ5yu8Nv4uCpWZYx8Gf8IDU\nL8OmiXn7I76GIngYlW5MpYlmjZhnHTByRi5Ik6ayx46z7jhVyoN+9Q0OVyNGLawh\nbuWRrqwXAgMBAAECggEAGAFbThghWXtI1i3iTQbotVPF7R/UKIV3i5qB+osL8S0d\ngo0OWNuW8GxJ/LSIjA25BeWWE9oVwHstoakc8d+qQwLkweQONT7KJNkoxgM2Zd/h\nAmDd3GNVdFgX4gyU6X+s1H1vEVDBBb2+hizhzPjvFYuUQwqeQZ9MIDNs6PH95Ugu\nwTpnCit90UUOIkmZItAzu0b4YdqysmWYof1Tpo6JZqTldx5iCVhOnVX89zlyaXra\nuXiBt9mU5zS+Zln2ZkI4YjhFwgarBZ7eoOr9AShf0YmMd/xqJKe/6/RTDBy/X+lh\nl5DpksVpOwguPy6GFxz+A2IHBzEJVwVNrLRVdhWZAQKBgQD52ak9bEcctsbWPLLO\nCYLavmtSK3w3FgzACRImBQJxcxThBU0854wuiRLv6CWxH3H0vGpaRW5QLjQ0GLob\nGo5gFl1Mcbvev+yz6Z4cRHqIz1CK3ujnmxPO3Cpubqpg6RDZe2SwKTXqBAGt9DLD\nrn2rwF66LdTLM3rBNcBl9RplNwKBgQDxW/3bose8VYNT0ndFxX10mbTnfwMXC6f6\nn3b83FVa3T+08cTq69Kr5szdQFbLW/ME7WM0S6VyY/+OcgHF/S975rYWInf9l+5g\nbBDWzkCU5ina7AiSi2/36y6IX7IfI8MylxxTTl+TrVbFbjyOjbrv9I5CK0cW6HwN\nV3FKUMVgIQKBgQCIsh12DZeajiWbcPoi3/FH3Ia7Hi+Hs/il2FClnHgJufziYBQy\nDj0T+Mrzlv+IOLwQOkW1vebs11qYZi7sRUtAJvxEprUy2a6XgGmQ7aZc05Atamfi\nz2W2953/bWyqONmPI4OjHejxb9+7XK+pf/4hyc4J7qlNw4yVyOLK5Z7bYQKBgQDO\n5zJOt1OMEq5bDAAtMqhibWWUUeBfQCHHCi6hg2w0UZhMUDmjvXdC377dKEt/VxqU\nLcAuU27ICgtInFkC1hF/oH6VqQS9wyGZTOp+ih74xfo5br/GiHv6xoSEaayzXx/1\nXW7txzDN0vmgk+ibt8n56+aLuLffXnsBoOVAdM9OoQKBgFn8DQxtri9z+A33VUSE\nyqAms3kUVx6B9G5DA4FbcHI8NGkqiXwlpRedTCm2xHDg09wKEZSZsCFFJvGF7xBp\nRYdFLn7aFRVmaZD3Mh0WHVoUJmhQbbIcfv/nOBk5DvT3no0GEKTuA5FDPDCveT+g\nlQJjty0dNZMd0MIGcgUa7vB/\n-----END PRIVATE KEY-----\n"
                }),
            }) 
        }
    catch{
         //mostraría el error de que ya se ha iniciado,sospecho que solo es en desarrollo
     }

     //2- ahora  puedo solicitar los distintos servicios, necesito firestore

     const firestore =  getFirestore();
     return firestore
 }
    
export default Firestore




  