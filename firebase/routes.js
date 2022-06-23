/*
aqui voy a concentrar todos los "enrutamientos" para que si hago un cambio en la arquitectura
de la base de datos solo tenga que modificar este archivo.
*/

//firestore

const owner = "IvNDXvmE32c43euLXYdCfQxm6F33"

const owner_route = () => { return `${owner}` }

const cats_route = () => { return `${owner}/categories` }

const cat_route = category => { return `${owner}/categories/${category}` }

//storage

const ownerBucket_route = () => { return `/${owner}` }

const pic_route = (picName) => { return `${owner}/${picName}` }

export { owner, owner_route, cat_route, cats_route, ownerBucket_route, pic_route }  