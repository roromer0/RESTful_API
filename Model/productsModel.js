const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  sizes: {
    type: Array,
    required: true,
  },
  colors: {
    type: Array,
    required: true,
    validate: {
      validator: function (v) {
        colors == string || Array.lenght >= 1;
      },
    },
  },
  brand: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        brand == string || Array.lenght >= 1;
      },
    },
  },
});
//EL primer parametro es el nombre del modelo
//El segundo parametro es el esquema que va a tener el modelo
//El tercer parametro es el nombre de la coleccion de nuestra base de datos.
const Product = mongoose.model("Product", productSchema, "products");

module.exports = Product;
