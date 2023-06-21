//Importamos express
const express = require("express");
//Importamos las rutas
const router = express.Router();
//Importamos el modelo Login
const Login = require("../Model/loginModel");
const bcrypt = require("bcrypt");

router.post("/signup", async (req, res) => {
  try {
    const data = new Login({
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
      role: req.body.role,
    });
    const user = await data.save();

    res.status(200).json({ status: "succeded", user, error: null });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        status: "Error 11000",
        user: null,
        error: "Correo duplicado",
      });
    }
  }
  res.status(400).json({ status: "Failed", user: null, error: error.message });
});

router.post("/login", async (req, res) => {
  try {
    //Buscar en la base de datos si el usuario está registrado y coincide con el valor email
    const user = await Login.findOne({ email: req.body.email }).exec();
    if (user) {
      //Comparamos la contraseña del usuariop con la contraseña de la base de datoz para obtener el valor booleano
      const validatePassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (validatePassword) {
        res.status(200).json({ status: "Succeded", user: user, error: null });
      } else {
        res.status(400).json({
          status: "Failed",
          user: null,
          error: "Email y contraseña no coinciden",
        });
      }
    } else {
      res.status(400).json({
        status: "Failed",
        user: null,
        error: "Email y contraseña no coinciden",
      });
    }
  } catch (error) {
    res
      .status(400)
      .json({ status: "Failed", user: null, error: error.message });
  }
});

module.exports = router;
