//Importar express
const express = require("express");
//Importar las rutas de express
const router = express.Router();

//Importamos el modelo userModel
const User = require("../Model/userModel");

const verifyToken = require("../lib/utils");

//Get, Obtener todos los usuarios
router.get("/", verifyToken, async (req, res) => {
  try {
    const data = await User.find();
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
    const data = await User.findById(id);
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
    const data = new User({
      name: req.body.name,
      lastname: req.body.lastname,
      email: req.body.email,
      role: req.body.role,
      skills: req.body.skills,
      personality: req.body.personality,
    });
    await data.save();
    res.status(200).json({ status: "succeeded", data, error: null });
  } catch {
    res
      .status(404)
      .json({ status: "Failed", data: null, error: error.message });
  }
});

//Eliminar un usuario
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await User.findByIdAndDelete(id);
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
    const data = await User.findByIdAndUpdate(id, body, { new: true });
    res.status(200).json({ status: "succeeded", data, error: null });
  } catch (error) {
    res
      .status(404)
      .json({ status: "Failed", data: null, error: error.message });
  }
});
module.exports = router;
