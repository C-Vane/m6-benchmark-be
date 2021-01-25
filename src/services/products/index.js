const express = require("express");
const Product = require("../../db").Product;
const Category = require("../../db").Category;
const { Op } = require("sequelize");

const router = express.Router();

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const data = await Product.findAll({
        include: [
          {
            model: Category,
            where: req.query.category
              ? {
                  name: { [Op.iLike]: req.query.category },
                }
              : {},
          },
        ],
        where: req.query.search
          ? {
              [Op.or]: [{ name: { [Op.iLike]: "%" + req.query.search + "%" } }, { description: { [Op.iLike]: "%" + req.query.search + "%" } }, { brand: { [Op.iLike]: "%" + req.query.search + "%" } }],
            }
          : {},
        attributes: { exclude: "categoryId" },
        offset: parseInt(req.query.offset) | 0,
        limit: parseInt(req.query.limit) | 10,
      });
      res.send(data);
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .post(async (req, res, next) => {
    try {
      const newElement = await Product.create(req.body);
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
      const data = await Product.findByPk(req.params.id, {
        include: Category,
        attributes: { exclude: "categoryId" },
      });
      res.send(data);
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .put(async (req, res, next) => {
    try {
      const updatedData = await Product.update(req.body, {
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
      Product.destroy({ where: { id: req.params.id } }).then((rowsDeleted) => {
        if (rowsDeleted > 0) res.send("Deleted");
        else res.send("no match");
      });
    } catch (e) {
      console.log(e);
      next(e);
    }
  });

module.exports = router;
