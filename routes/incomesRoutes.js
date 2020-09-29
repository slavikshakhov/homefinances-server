const express = require("express");
const router = express.Router();
const db = require("../models");

router.post("/new", ({ body: { item, money, UserId, activity } }, res) => {
  db.Income.create({
    item,
    money,
    UserId,
    activity,
  }).then((newIncome) => res.send(newIncome));
});
router.get("/:id", (req, res) => {
  db.Income.count({
    where: {
      UserId: req.params.id,
    },
  }).then((count) => {
    if (count !== 0) {
      db.Income.findAll({
        where: {
          UserId: req.params.id,
        },
      }).then((foundIncomes) => {
        res.json(foundIncomes);
      });
    } else {
      res.json(0);
    }
  });
});
module.exports = router;
