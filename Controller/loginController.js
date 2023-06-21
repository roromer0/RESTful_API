//Importamos express
const express = require("express");
//Importamos las rutas
const router = express.Router();
//Importamos el modelo Login
const Login = require("../Model/loginModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken, verifyToken } = require("../lib/utils");
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
    // Buscar en la base de datos si el usuario esta registrado y coincide con el valor email.
    const user = await Login.findOne({ email: req.body.email }).exec();

    if (user) {
      // Comparamos la contraseña del usuario con la contraseña de base de datos para obtener el true o false
      const validatePassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (validatePassword) {
        const data = { email: user.email, role: user.role };
        const token = generateToken(data, false);
        const token_refresh = generateToken(data, true);

        res.status(200).json({
          status: "Succeeded",
          user: {
            id: user._id,
            email: user.email,
            role: user.role,
            token: token,
            token_refresh: token_refresh,
          },
          error: null,
        });
      } else {
        res.status(401).json({
          status: "Failed",
          user: null,
          error: "Email y contraseña no coinciden",
        });
      }
    } else {
      res.status(401).json({
        status: "Failed",
        user: null,
        error: "Email y contraseña no coinciden",
      });
    }
  } catch (error) {
    console.log("login", error);
    console.log("login", error);
    res.status(404).json({ status: "failed", data: null, error: error });
  }
});

module.exports = router;

router.get("refreshToken", verifyToken, async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "Acceso denegado" });
  }
  const data = { email: user.email, role: user.role };
  const token = generateToken(data, false);
  const token_refresh = generateToken(data, true);

  res.status(200).json({
    status: "Succeeded",
    user: {
      id: user._id,
      email: user.email,
      role: user.role,
      token: token,
      token_refresh: token_refresh,
    },
    error: null,
  });
});
