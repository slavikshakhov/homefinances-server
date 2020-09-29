const express = require("express");
const router = express.Router();
const db = require("../models");

router.post("/new", ({ body: { item, money, UserId, activity } }, res) => {
  db.Expense.create({
    item,
    money,
    UserId,
    activity,
  }).then((newExpense) => res.send(newExpense));
});
router.get("/:id", (req, res) => {
  db.Expense.count({
    where: {
      UserId: req.params.id,
    },
  }).then((count) => {
    if (count !== 0) {
      db.Expense.findAll({
        where: {
          UserId: req.params.id,
        },
      }).then((foundExpenses) => {
        res.json(foundExpenses);
      });
    } else {
      res.json(0);
    }
  });
});
module.exports = router;
