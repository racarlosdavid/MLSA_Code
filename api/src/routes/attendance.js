var express = require('express');
var router = express.Router();
const mongoConnection = require('../mongo_connection');

router.post('/addAttendance', async function(req, res) {
  console.log(req.body);
  try {
    await mongoConnection.connect();
    const database = mongoConnection.db("mlsa");
    const coleccion = database.collection("attendance");
    const result = await coleccion.insertOne(req.body);

    res.status(200).json({ message: `Asistencia insertada en la base de datos con el _id: ${result.insertedId}`});
  } catch (err) {
    res.status(500).json({ message: "Error en la conexion de la base de datos"+err });
  } finally {
    await mongoConnection.close();
  }
});

router.get('/getAttendance', async function(req, res, next) {
  console.log(req.body)
  try {
    await mongoConnection.connect();
    const database = mongoConnection.db("mlsa");
    const coleccion = database.collection("attendance");

    const cursor = coleccion.find({}, { _id: 0, nombre: 1, email: 2});
    // print a message if no documents were found
    if ((await cursor.count()) === 0) {
      console.log("No documents found!");
      res.status(500).json({ message: "Error! Documento no encontrado" });
    }
        
    var data = [];
    await cursor.forEach(
      element =>
      data.push(element)
    );
   
    res.status(200).send(data);

  } catch (err) {
    res.status(500).json({ message: "Error en la conexion de la base de datos"+err }); 
  } finally {
    await mongoConnection.close();
  }
});

/* Ejemplo json para el post
{
    "nombre": "Carlos David",
    "email": "racarlosdavid@gmail.com"
}
*/
module.exports = router;