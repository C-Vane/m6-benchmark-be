const express = require("express");

const db = require("./db/index");

const cors = require("cors");

const server = express();

const { badRequestHandler, notFoundHandler, genericErrorHandler } = require("./utilts/errorHandlers");

const services = require("./services/index");
const productsRoute = require("./services/products");
server.use(cors());

server.use(express.json());

///routes
server.use("/amazon", services);

///error handlers
server.use(badRequestHandler);
server.use(notFoundHandler);
server.use(genericErrorHandler);

//create tables

db.sequelize.sync({ force: false }).then((result) => {
  server.listen(process.env.PORT || 3001, () => {
    console.log("server is running on port ", process.env.PORT || 3001);
  });
});
