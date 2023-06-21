const crypto = require("crypto");

const secret = "ordenador";

const hash = crypto
  .createHmac("sha256", secret)
  .update("Me gustan los perritos 99")
  .digest("hex");

// console.log(hash);

const secretRefresh = "ordenar2";

const hashRefresh = crypto
  .createHmac("sha256", secretRefresh)
  .update("Me gustan los camperos 99")
  .digest("hex");
console.log(hashRefresh);
