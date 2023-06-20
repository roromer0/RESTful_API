const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: false },
  email: { type: String, unique: true, required: true },
  role: { type: String, required: true },
  skills: {
    type: Array,
    required: true,
    default: [],

    validate: [
      (array) =>
        array.length === 0 ||
        array.every((element) => {
          const keys = Object.keys(element);
          return (
            keys.every(() => typeof element[keys[0]] === "boolean") &&
            typeof element[keys[1]] === "string"
          );
        }),
      "Wrong skills array",
    ],
  },
  personality: {
    type: Object,
    required: true,
    validate: [
      (obj) =>
        obj.constructor === Object &&
        Object.values(obj).every((element) => typeof element === "string"),
      "Wrong personality object",
    ],
  },
});
//EL primer parametro es el nombre del modelo
//El segundo parametro
//El tercer parametro es el nombre de la coleccion de nuestra base de datos.
const User = mongoose.model("User", userSchema, "users");

module.exports = User;
