const express = require('express');
const router = express.Router();

const userModel = require('../models/user');

// add new user
router.post('/addNew', async function (req, res) {
  await userModel
    .addNewUser(req.body.user)
    .then((add) => {
      res.send(add);
    })
    .catch((err) => {
      res.status(401).json(err);
    });
});

module.exports = router;
