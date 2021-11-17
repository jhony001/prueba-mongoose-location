const { initializeApp } = require("firebase/app");
const { getFirestore, collection, getDocs, query, where } = require("firebase/firestore");
const fs = require("fs");

let app = initializeApp({
    apiKey: "AIzaSyBz90T2tgbWn-HnTjfAcRi8y-6WuaLx2rc",
    authDomain: "casa-propia-51d00.firebaseapp.com",
    projectId: "casa-propia-51d00",
    storageBucket: "casa-propia-51d00.appspot.com",
    messagingSenderId: "754850799278",
    appId: "1:754850799278:web:31164a7b843ffc9e41173f",
    measurementId: "G-LVPR2SPWSB"
});

let firestore = getFirestore(app);
async function getProjects(){
    let inmueblesColl = collection(firestore, "produccion/Mdu9VjrTcyZSLabJHDZO/inmuebles");
    let documents = []
    let whereProjects = where("tipo", "==", "inmueble");
    let queryProjects = query(inmueblesColl, whereProjects)
    let docs = await getDocs(queryProjects);
    docs.forEach(doc => {
        documents.push({
            _id: doc.id,
            projectId: doc.data().proyectoId,
            area: doc.data().infogeneral.area,
            bathsQuantity: doc.data().infogeneral.nbanos,
            roomsQuantity: doc.data().infogeneral.nhabitaciones,
            parkQuantity: doc.data().infogeneral.nparqueaderos,
            isNew: doc.data().infogeneral.nuevo,
            price: doc.data().infogeneral.precio,
            title: doc.data().infogeneral.titulo,
            gallery: doc.data().galeria,
            address: doc.data().ubicacion.direccion,
            description: doc.data().infogeneral.descripcion,
            stratum: parseInt(doc.data().infogeneral.estrato, 10),
            businessType: doc.data().infogeneral.tiponegocio,
            state: true,
            location: {
                type: "Point",
                coordinates: [doc.data().ubicacion.location.lng, doc.data().ubicacion.location.lat]
            }
        })
    })
    return documents;
}

getProjects().then(documents => {
    fs.writeFileSync("./properties.json", JSON.stringify(documents));
});





