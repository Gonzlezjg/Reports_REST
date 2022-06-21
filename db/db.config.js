const mongoose = require("mongoose");

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB, options)

    console.log("Base de datos conectada");
  } catch (error) {
    console.log(error);
    Error("Error al conectar a la DB", error);
  }
};

module.exports = {
  connection,
};
