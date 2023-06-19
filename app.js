//Primero cargamos el módulo http en el servidor, encargado de gestionarlo los enpoints

// npm install --save-dev nodemon

const http = require("http");

//2o declaramos el puerto en el que vamos a lanzar nuestro servidor
const PORT = 8000;

//3o creamos los "clientes"
const server = http.createServer(
  //req: request, contiene los detalles de la solicitud
  //res: response, contiene los detalles de la respuesta, es la información que se envía al cliente
  (req, res) => {
    //4o escribimos la respuesta que queremos que nos devuelva el servidor
    res.statusCode = 200; //200 es el código de estado que indica que la solicitud se ha realizado correctamente
    res.setHeader("Content-Type", "text/html"); //indicamos el formato del contenido que vamos a devolver
    res.end("<h1>Hello World!</h1></br><h2>Pepe tiene un servidor</h2>"); //finalizamos la respuesta
  }
).listen(PORT,()=>{
    console.log(`Server running at http://localhost:${PORT}`);
})
