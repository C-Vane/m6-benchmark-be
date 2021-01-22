const router = require("express").Router();

const cartsRouter = require("./carts");

const usersRouter = require("./users");

const categoriesRouter = require("./categories");

const reviewsRouter = require("./reviews");

const productsRouter = require("./products");

const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const cloudinary = require("../utilts/cloudinary.js");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "amazon",
  },
});
const cloudinaryMulter = multer({ storage: storage });

router.route("/uploadImage").post(cloudinaryMulter.single("image"), async (req, res, next) => {
  try {
    res.send(req.file.path);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

router.use("/carts", cartsRouter);

router.use("/users", usersRouter);

router.use("/categories", categoriesRouter);

router.use("/reviews", reviewsRouter);

router.use("/products", productsRouter);

module.exports = router;
