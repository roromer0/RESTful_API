//Asi es para crear nuestro backed, la initial config
//Ahora vamos a instalar express, que es un framework de node que nos facilita la creación de servidores

const express = require("express");
const mongoose = require("mongoose");

const PORT = 8000;

//Así creamos la apliación de express
const app = express();

//Analiza los archivos JSON
app.use(express.json());

//Esto nos permite obtener la información de configuracion de .env
require("dotenv").config();

//Obtenemos la cadena de conexion a la base de datos desde las variables de entorno (fichero .env)
const mongoURL = process.env.DATABASE_URL_DEV;

//Configuracion con mongodb
//useNewUrlParsere le indica amongoose que utilice el nuevo analizador de url de la cadena de conexion
mongoose.connect(mongoURL, { useNewUrlParser: true });

//Guardar conexion con mongoose
const db = mongoose.connection;

//Verificamos que la conexion se ha realizado correctamente, de lo contrario nos muestra el error
db.on("error", (error) => {
  console.error("Error: ", error);
});

//Nos indica que se ha realizado la conexion correctamente
db.once("connected", () => {
  console.log("Succes connect");
});

//Nos indica que se ha desconectado de la base de datos
db.on("disconnected", () => {
  console.log("Mongoose connection is disconnected");
});

const products = require("./Controller/productController");
app.use("/products", products);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
