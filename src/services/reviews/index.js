const express = require("express");
const Review = require("../../db").Review;
const User = require("../../db").User;
const router = express.Router();

router.route("/:productId").get(async (req, res, next) => {
  try {
    const reviews = await Review.findAll({
      include: [{ model: User, attributes: { exclude: ["email", "password", "createdAt", "updatedAt"] } }],
      where: { productId: req.params.productId },
      attributes: { exclude: "userId" },
      offset: parseInt(req.query.offset) | 0,
      limit: parseInt(req.query.limit) | 10,
    });
    res.send(reviews);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

router.route("/:productId/:userId").post(async (req, res, next) => {
  try {
    const newElement = await Review.create({ ...req.body, userId: req.params.userId, productId: req.params.productId });
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
      const data = await Review.findByPk(req.params.id);
      res.send(data);
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .put(async (req, res, next) => {
    try {
      const updatedData = await Review.update(req.body, {
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
      Review.destroy({ where: { _id: req.params.id } }).then((rowsDeleted) => {
        if (rowsDeleted > 0) res.send("Deleted");
        else res.send("no match");
      });
    } catch (e) {
      console.log(e);
      next(e);
    }
  });

module.exports = router;
