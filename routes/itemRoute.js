const express = require('express');
const router = express.Router();

const multer = require('multer');
const upload = multer();

// required models
const itemsModel = require('../models/items');
const uploadModel = require('../models/upload');

//  add new item of clothing to wardrobe.
router.post('/addNew/:id', async function (req, res) {
  const item = req.body;
  const userID = req.params.id;
  await itemsModel
    .addNewItem(
      item.name,
      item.colour,
      item.pattern,
      item.weight,
      item.imageURL,
      item.categoryID,
      userID
    )
    .then((post) => {
      res.send({
        success: true,
        result: post,
      });
    })
    .catch((err) => {
      res.status(401).json(err);
    });
  // res.send({ success: true });
});

// add new image of new item
router.post('/addImage', upload.array('image', 5), async (req, res) => {
  const files = req.files;
  const resArray = [];
  for (const file of files) {
    const upload = await uploadModel.uploadFile(file).catch((err) => {
      res.status(401).json(err);
    });
    resArray.push(upload);
  }
  res.send(resArray);
});

module.exports = router;
