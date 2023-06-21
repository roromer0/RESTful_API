const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).json({ error: "Acceso denegado" });

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    try {
      const verified = jwt.verify(token, process.env.TOKEN_SECRET_REFRESH);
      req.user = verified;
      next();
    } catch (error) {
      console.log("verifyToken", error);
      res.status(400).json({ error: "Token no es válido" });
    }
  }
};

const generateToken = (user, isRefresh) => {
  if (isRefresh) {
    return jwt.sign(user, process.env.TOKEN_SECRET_REFRESH, {
      expiresIn: "3min",
    });
  }
  return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: "1min" });
};

module.exports = { verifyToken, generateToken };
