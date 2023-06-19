//Importar express
const express = require('express');
//Importar las rutas de express
const router = express.Router();

//Get, Obtener todos los usuarios
router.get('/',(req,res)=>{
    res.send('Get all collection users')
})

//Obtener un unico usuario
router.get('/:id',(req,res)=>{
    res.send(`Get one user ${req.params.id}`)
})

//Crear un usuario
router.post('/',(req,res)=>{
    console.log(req.body);
    res.send(`Post one user ${req.body.name}`)
})

//Eliminar un usuario
router.delete('/',(req,res)=>{
    res.send(`Delete one user ${req.params.id}`)
})

//Actualizar un usuario
router.patch('/:id',(req,res)=>{
    res.send(`Patch user ${req.params.id}`)
})
module.exports = router;