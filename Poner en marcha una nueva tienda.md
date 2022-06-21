
¿como poner en marcha a una tienda?

AUTH
primero hay que crear una cuenta, manualmente voy a agregar el correo del nuevo cliente en firebase auth y a copiar su uid,
hay que poner en el frontend: /firebase/routes --> owner = uid 

FIRESTORE
crear una coleccion nueva con el nombre que debe ser el mismo que el owner (uid)
y crear la arquitectura igual a las otras.

STORAGE
crear un bucket no hace falta, al guardar la primera imágen, el bucket con el nombre del owner (uid)
se crea solo

FRONTEND
la tienda esta lista para arrancar, guiar al usuario en las herramientas y ya.

