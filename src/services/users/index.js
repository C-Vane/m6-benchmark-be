const express = require("express");
const User = require("../../db").User;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const cloudinary = require("../../utilts/cloudinary.js");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "amazon",
  },
});
const cloudinaryMulter = multer({ storage: storage });

const router = express.Router();

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const data = await User.findAll({
        attributes: { exclude: ["email", "password", "createdAt"] },
        offset: parseInt(req.query.offset) | 0,
        limit: parseInt(req.query.limit) | 10,
      });
      res.send(data);
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .post(cloudinaryMulter.single("image"), async (req, res, next) => {
    try {
      const newElement = await User.create({ ...req.body, img: req.file ? req.file.path : req.body.img });
      res.send(newElement);
    } catch (e) {
      console.log(e);
      next(e);
    }
  });

router
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      const data = await User.findByPk(req.params.id);
      res.send(data);
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .put(async (req, res, next) => {
    try {
      const updatedData = await User.update(req.body, {
        returning: true,
        plain: true,
        where: {
          id: req.params.id,
        },
      });
      res.send(updatedData[1]);
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .delete(async (req, res, next) => {
    try {
      User.destroy({ where: { id: req.params.id } }).then((rowsDeleted) => (rowsDeleted > 0 ? res.send("Account Deleted") : res.send("no match")));
    } catch (e) {
      console.log(e);
      next(e);
    }
  });

module.exports = router;
