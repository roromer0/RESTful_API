//Importar express
const express = require("express");
//Importar las rutas de express
const router = express.Router();

//Importamos el modelo ProductModel
const Product = require("../Model/productsModel");

//Get, Obtener todos los usuarios
router.get("/", async (req, res) => {
  try {
    const data = await Product.find();
    res.status(200).json({ status: "succeeded", data, error: null });
  } catch (error) {
    res
      .status(404)
      .json({ status: "Failed", data: null, error: error.message });
  }
});

//Obtener un unico usuario
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Product.findById(id);
    res.status(200).json({ status: "succeeded", data, error: null });
  } catch (error) {
    res
      .status(404)
      .json({ status: "Failed", data: null, error: error.message });
  }
});

//Crear un usuario
router.post("/", async (req, res) => {
  try {
    const data = new Product({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      sizes: req.body.sizes,
      colors: req.body.colors,
      brand: req.body.brand,
    });
    await data.save();
    res.status(200).json({ status: "succeeded", data, error: null });
  } catch {
    res
      .status(404)
      .json({ status: "Failed", data: null, error: error.message });
  }
});

//Eeliminar un usuario
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Product.findByIdAndDelete(id);
    res.status(200).json({ status: "succeeded", data, error: null });
  } catch (error) {
    res
      .status(404)
      .json({ status: "Failed", data: null, error: error.message });
  }
});

//Actualizar un usuario
router.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    //{new:true} es para que nos devuelva los valores actualizado
    const data = await Product.findByIdAndUpdate(id, body, { new: true });
    res.status(200).json({ status: "succeeded", data, error: null });
  } catch (error) {
    res
      .status(404)
      .json({ status: "Failed", data: null, error: error.message });
  }
});
module.exports = router;
