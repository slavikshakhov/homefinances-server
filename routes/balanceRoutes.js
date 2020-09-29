const express = require('express')
const router = express.Router()
const db = require('../models')

router.post('/new', ({ body: { balance, UserId } }, res) => {
  db.Balance.create({
    balance,
    UserId,
  }).then((newBalance) => res.json(newBalance))
})
router.get('/:id', (req, res) => {
  db.Balance.count({
    where: {
      UserId: req.params.id,
    },
  }).then((count) => {
    if (count !== 0) {
      db.Balance.findAll({
        where: {
          UserId: req.params.id,
        },
      }).then((foundBalances) => {
        res.json(foundBalances)
      })
    } else {
      res.json(0)
    }
  })
})

module.exports = router
