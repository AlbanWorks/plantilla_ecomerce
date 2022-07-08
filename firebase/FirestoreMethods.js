import {db, storage} from './firebaseConfig'
import { owner, owner_route, cat_route, pic_route } from './routes'
import { collection, getDocs, doc, getDoc, setDoc, addDoc, deleteDoc, query, where } from "firebase/firestore"
import {ref, uploadBytesResumable, getDownloadURL, deleteObject, refFromURL } from "@firebase/storage"
import imageCompression from 'browser-image-compression'


//haganme la atencion de borrar los clg si no les sirven


//--------------informacion de la tienda-------------------------

const getInfo = async () => {

    const storeInfoRef = doc(db, owner_route(owner), "store_info")
    const infoSnap = await getDoc(storeInfoRef)
    if (! infoSnap.exists()) return {error:"store info failed to fetch"}
    const info = infoSnap.data()

    const catIndexRef = doc(db,  owner_route(owner), "categories")
    const catIndexSnap = await getDoc(catIndexRef);
    if (! catIndexSnap.exists()) return {error:"category index failed to fetch"}
    const catIndex = catIndexSnap.data().category_index

    const PublicInfo = {
        CategoryIndex: catIndex,
        StoreName: info.store_name,
        Cellphone: info.cellphone,
        SocialMedia: info.social_media,
        Logo: info.store_logo
    }

    return PublicInfo
}

const defaultLogo = "https://firebasestorage.googleapis.com/v0/b/mamatienda-a7d3c.appspot.com/o/defaultStore.jpg?alt=media&token=bf95af5c-08b9-4f16-b1ba-0e558fa607a6"

const setStoreInfo = async (name, cellphone, facebook, instagram, logo) => {
    const info = {
        store_name: name, 
        cellphone: cellphone, 
        social_media: {facebook, instagram}, 
        store_logo: logo
    }
    try {
        await setDoc(doc(db, owner_route(), "store_info" ), info);
        return{saved:"info saved"}
    } 
    catch (err){
        return{err}
    }
}
const handleLogoUpload = async (oldLogoUrl, newLogoFile) => {
    if(!newLogoFile) return oldLogoUrl
    await deleteImage(oldLogoUrl)
    await uploadPicture(newLogoFile)
    const logoUrl = await getImageURL(newLogoFile)
    return logoUrl
}
//--------------GESTION DE CATEGORÍAS-------------------------

const addCategory = async (catName)=>{
    try {
        /* await setDoc(doc(db, cat_route(catName), "Deleteme_1e445" ), {deleteme:"deleteme"})
        await deleteDoc(doc(db, cat_route(catName),"Deleteme_1e445"))
        pensé en crear una coleccion con un documento sacrificable y luego borrarlo
        pero eso se carga la coleccion entera, al final, lo unico necesario es guardar el nombre en
        el indice, cuando creen un documento con ese indice la coleccion se creará automaticamente*/
        await addCatToIndex(catName)
        return{saved:"category saved"}
    } 
    catch (err){
        return{err}
    }
  }
const deleteCategory = async (catName)=>{
    /*Borrar una categoria no se puede desde el cliente, pero al borrarle todos los
    documentos se borra    AL PARECER!!!  (investigar) */
    try {
        const products = await getCollection(catName)
        for (let product of products) {
            await deleteProduct(catName, product)
        }
        await deleteCatFromIndex(catName)
        return{deleted:"category deleted"}
    } 
    catch (err){
        return{err}
    }
  }  

const addCatToIndex = async (catName) => {
    const catIndexSnap = await getDoc(doc(db,  owner_route(owner), "categories"));
    const catIndex = catIndexSnap.data().category_index
    catIndex.push(catName)
    await setDoc(doc(db,  owner_route(owner), "categories"), {category_index: catIndex});
}  

const deleteCatFromIndex = async (catName) => {
    const catIndexSnap = await getDoc(doc(db,  owner_route(owner), "categories"));
    const catIndex = catIndexSnap.data().category_index
    const filteredCatIndex = catIndex.filter((elements)=>{ return elements !== catName})
    await setDoc(doc(db,  owner_route(owner), "categories"), {category_index: filteredCatIndex});
}

//--------------PRODUCTOS-------------------------------------- 

const getProduct = async (category, ID) => {
    const docRef = doc(db, cat_route(category), ID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data();
    }     
    else {
    // doc.data() will be undefined in this case
     return false
    }
}

const getProductByTitle = async (category, title) => {
    //armar la peticion
    const q = query(collection(db, cat_route(category)), where("title", "==", title));
    //enviar la peticion
    const querySnapshot = await getDocs(q);
//manejar la respuesta
const products = []
querySnapshot.forEach((coincidence) => { 
    /*
    doc.data() is never undefined for query doc snapshots
    adding document ID and collection as a parameter, server will use it to validate buy orders.
    and ID is used in ADMIN for document updating.

    MEJORAR AddProduct:
    
    almacenar ID y category en el documento para no estar añadiendolo siempre.

    Esto se debe mejorar, la idea es crear un documento vacío, luego fetchearlo y obtener su ID como
    doc.id, lueeego guardar allí los datos del producto con setProduct, category se obtiene fácil
    */
    coincidence["ID"] = doc.id
    coincidence["category"] = category
    products.push(coincidence.data())
});
return products
}

const setProduct = async (category, product) => {
    // guarda los cambios de un producto existente
    const productWithPicUrl = await handlePicUpload(product)
    try {
        await setDoc(doc(db, cat_route(category), product.ID), productWithPicUrl);
        return{saved:"product saved"}
    } catch (err) {
        console.log("error al guardar producto " , err)
        return{err}
    }
}

const addProduct = async (category, product) => {
    // guarda los cambios de un producto nuevo, añade una ID automatica en firebase
    const productWithPicUrl = await handlePicUpload(product)
    try {
        await addDoc(collection(db, cat_route(category)), productWithPicUrl);
        return{saved:"product saved"}
    } 
    catch (err) {
        console.log("error al guardar producto " , err)
        return{err}
    }
}

const deleteProduct = async (category, product) => {
    await deleteImage(product.picUrl)
    try {
        await deleteDoc(doc(db, cat_route(category), product.ID));
        return{deleted:"product deleted"}
    } 
    catch (err) {
        console.log("pal pingo a salido che ", err)
        return{error:"error has been ocurred "}
    }
}

//--------------COLECCIONES o CATEGORÍAS--------------------------------- 

const getCollection = async (category) => {
    const querySnapshot = await getDocs(collection( db, cat_route(category)));
    let ArrayOfDocs = []
    querySnapshot.forEach((doc) => {
        let docSnapshot = doc.data()
        /*
        adding document ID and collection as a parameter, server will use it to validate buy orders.
        and ID is used in ADMIN for document updating.

         MEJORAR AddProduct:
    
    almacenar ID y category en el documento para no estar añadiendolo siempre.
    
    Esto se debe mejorar, la idea es crear un documento vacío, luego fetchearlo y obtener su ID como
    doc.id, lueeego guardar allí los datos del producto con setProduct, category se obtiene fácil
        */
        docSnapshot["ID"] = doc.id
        docSnapshot["category"] = category
        ArrayOfDocs.push(docSnapshot) 
    });
    return ArrayOfDocs
}


//--------------FOTOS-------------------------------------------------------

const defaultProductPhoto = "https://firebasestorage.googleapis.com/v0/b/mamatienda-a7d3c.appspot.com/o/defaultProduct.jpg?alt=media&token=20affdd7-e127-4b8b-8844-b5f286aca3fc"

const handlePicUpload= async (product)=>{
    //early return si no hay picFile o sea no hay cambo de foto.
    if(!product.picFile) return product
    if(product.picFile.name === undefined){
        product.picUrl = defaultProductPhoto  //formato no admitido o error que hace perder la referencia de picFile
    }
    else{
        const uploadPic = await uploadPicture(product.picFile)
        const picUrl = await getImageURL(product.picFile)
        //si paso algo raro le pongo el link a una imágen por defecto, (manejar estos errores luego)
        if(uploadPic.err || picUrl.err){
            alert(`${product.picFile.name} tuvo problemas para cargarse, intente cambiar su formato a jpg, si el problema se repite contacte con nosotros`)
            product.picUrl = defaultProductPhoto
        } 
        else product.picUrl = picUrl
    }
    delete product.picFile
    return product
}

const uploadPicture = async (file) =>{
    try {
        const compressedImage = await compressImage(file)
        const storageRef = ref(storage, pic_route(compressedImage.name))
        await uploadBytesResumable(storageRef, compressedImage)
        return{ok:"all right"}
    } catch (err) {
        return{err}
    }
}

const compressImage = async (image) => {
    //using npm browser-image-compression 
    const options = {
        maxSizeMB: 0.3,
        maxWidthOrHeight: 640,
        fileType:'image/jpeg',
        useWebWorker: true
    }
    try {
        const compressedImage = await imageCompression(image, options);
        console.log(compressedImage.name)
        return compressedImage
    } 
    catch (error) {
      return image
    }
}

const getImageURL = async (file)=>{
    const storageRef = ref(storage, pic_route(file.name))
    try {
        let ImageURL = await getDownloadURL(storageRef)
        return ImageURL
    } catch (err) {
        console.log("error al descargar imagen", err)
        return{err}
    }
}

const deleteImage = async (picUrl)=>{
    if(picUrl === defaultProductPhoto) return{deleted:"no foto"}
    try {
        const storageRef = ref(storage, picUrl)
        await deleteObject(storageRef)
        return{deleted:"is dead"}
    } catch (err) {
        console.log("ERROR EN EL BORRE DE LA IMAGEN", err)
        return{err}
    }
}

//------------------------------------------------------------------------- 

export { 
    getInfo,
    handleLogoUpload, 
    setStoreInfo, 
    addCategory,
    deleteCategory,
    addProduct, 
    setProduct, 
    uploadPicture, 
    getImageURL, 
    getProduct, 
    getProductByTitle, 
    getCollection, 
    deleteProduct 
}  