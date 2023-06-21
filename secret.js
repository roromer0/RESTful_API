const crypto = require("crypto");

const secret = "ordenador";

const hash = crypto
  .createHmac("sha256", secret)
  .update("Me gustan los perritos 99")
  .digest("hex");

console.log(hash);

// c1e31d06ad010bb06a3f765970ae1c65eb805498ee0062c46f6f96f2171a8d71
