require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connection } = require("../db/db.config");

class Server {
  constructor() {
    //iniciar express
    this.app = express();

    //DB
    this.DB();

    //Middlerwares
    this.middlerwares();

    //Rutas
    this.route();
  }

  route() {
    this.app.use("/api/auth", require("../routes/auth"));

    this.app.use("/api/users", require("../routes/users"));

    this.app.use("/api/reports", require("../routes/reports"));
  }

  async DB() {
    await connection();
  }

  middlerwares() {
    //Directorio publico
    this.app.use(express.static("public"));

    this.app.use(express.json());

    this.app.use(cors());
  }

  listen() {
    this.app.listen(process.env.PORT, () => {
      console.log("Servidor corriendo en el puerto: ", process.env.PORT);
    });
  }
}

module.exports = Server;
