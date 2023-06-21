const jwt = require("jsonwebtoken");

const veryfyToken = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token)
    return res
      .status(401)
      .json({ status: "Failed", user: null, error: "Acceso denegado" });

  try {
    const verified = await jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res
      .status(400)
      .json({ status: "Failed", user: null, error: "Token no es válido" });
  }
};

module.exports = veryfyToken;
