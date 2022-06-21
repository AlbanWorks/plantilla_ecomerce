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
                privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDlvgsqjE7Ncdx6\n3U/d146iHx5KlB42Fd6O5Hxp0u61Jks6kwVcGpK2QDBkkITu26p5KgGn52tUpVnH\nyTw10IbbsaTxPXALULTTtab7a1NIFOnrG6PUxCB1PBJaE4piHuq5osBB7K+0M4KT\nj9Amhf5dWpeCZJLMBmdP+KYmbmszPR3TZDLCQHcbsZurR/vI2KDrYFaVql2wtfgB\nHvzPDSqdBcoQu6AKb1aSprSjihZFcI4JBh7NgaypyHXUeBSVcXE26iz6ZmNvf3qp\nq62uvHRCoSqrvmP0yw0pWnt8UkNpr/j03jwkjvt3JY+yfrhPZmF5pbTLVF1sGOGt\n2YaFsOyJAgMBAAECggEACpoDuWWqoEPkFP5f+GCBWj1d4DqoDz5gnA7yp85+Sfk3\nqP8OVQL76LGbGhTqMXyNCBTWaTleZFRSCYxhfSk/g+VVc3VulXMWuRtNlpYMDIw8\nhCctHv0i803/mc0DioYbNlBKl3A05nenC6isBg8SXxv2WGPMO2KDQ3c5sZXQWBeg\nRbZ3DBgszSLAkeecPbBerOmMirLaZsitcEGpvcb8Et+K0pdJn2lXikSbajQaYsHg\nBtCDe/107zttipbWzSwo/O56Qc57YcDOFqO/AUbYeWSBv0GPKWU77YrAel3erarP\nWvYbcMzaw5imQ8TFJRTQOBu9n72vIiD6owFsrHy4IQKBgQD1LU9uL/yDVkf4rKHn\nx60W0RTcZb4ePQhaRFOOlr7hxwwFKBsPrlk4OJ4+DfkA2EFQgQGcyc7XeHAb5HuH\nSQ8uvpaxV8LglQrxKCqC76heRz0DD39rIaw89RVp9VWRisi9Z+hA49+wiTMDhPTq\nqodm/ZOXc5V4Chspxutz5nfdMQKBgQDv4k9dhveWH3mIh1ISn/Zewnk76CY5WHTy\nKMxco58ofaJv43m2im9M66jLVYHMBsIaiLZqOk1dtzqzc9ECXfkRz2lpieakoSye\ntxSMyg2cMbH6TQJ52tp5X4gLnOyQujrimpJF68cjGzMgG+2netili8FhzePFdvl8\nDnS2jWnO2QKBgQDW2iEMR2L6WSby5Z1wNwwYvZqRVVuYthVWvR+YCcQ2qK6A6ldk\nk32+BeeuK6J0ug3qlVKrajInonRkDQKvWDfE1+HIgUbWdeXD1VYDri8Wh0kRIIih\ngj2koYVleEfHJh6p1J+0Fb0Vv/WDdQUHi+7iMv8ernxiWEDbiGUXCPUrUQKBgCwW\njvmkjaqUvFSAcnAj4DcITRnaj/PoMw4yu2SnWeAqPwmLaFpJVS1w/oPogkOKVnBk\nAgrCDmgT/gDvX1GtDdLdKQWRp8dILBg7k9ZQaHH1nD1hm/vjYlX+XdWskLoE0D/H\nouyg6eek3x+eom4uoNTEO9WK7rrjI/VN/ttyYCj5AoGAQ4akbXTdf6rR66roGgTG\n8CTuctELvKVibM4veyGbF50ziulXZ5FPpzm7aNcpNoObi96mBijFzO4eIhCmLjCw\niKzRqN83WB7h5vtLDAw+lswLzjiYBIbzrmYjpdG/FwmkMRfseN5+7gnLyXdb41jy\n+Q3olxaRJidD7OlojLCGNhU=\n-----END PRIVATE KEY-----\n",
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




  