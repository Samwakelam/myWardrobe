const express = require('express');
const router = express.Router();

// required models
const categoryModel = require('../models/category');

// get category id by category name
router.get('/id/:name', async function (req, res) {
  await categoryModel.getCategoryID(req.params.name)
  .then((select) =>{
    res.send(select);
  })
  .catch((err) => {
    res.status(401).json(err);
  });;
});

module.exports = router;
