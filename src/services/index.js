const router = require("express").Router();

const cartsRouter = require("./carts");

const usersRouter = require("./users");

const categoriesRouter = require("./categories");

const reviewsRouter = require("./reviews");

const productsRouter = require("./products");

router.use("/carts", cartsRouter);

router.use("/users", usersRouter);

router.use("/categories", categoriesRouter);

router.use("/reviews", reviewsRouter);

router.use("/products", productsRouter);

module.exports = router;
