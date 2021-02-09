const express = require('express');
const router = express.Router();

// required models
const userModel = require('../models/user');
const outfitModel = require('../models/outfit');
const plannerModel = require('../models/planner');

//  just gets one outfit by specified id
router.get('/getName/:outfitID', async function (req, res) {
  // console.log('req.body.outfitID =', req.params.outfitID);
  await outfitModel
    .selectUsersOutfit(req.params.outfitID)
    .then((select) => {
      res.send(select);
    })
    .catch((err) => {
      res.status(401).json(err);
    });
});

// gets all planned outfits for user
router.get('/inPlanner/:userID', async function (req, res) {
  const userID = req.params.userID;
  if (!userID) {
    return res.send('no user ID');
  } else {
    await plannerModel
      .getExisitngDates(userID)
      .then((select) => {
        res.send(select);
      })
      .catch((err) => {
        res.status(401).json(err);
      });
  }
});

// add new outfit
router.post('/newOutfit', async function (req, res) {
  const user = await userModel.selectUserByName(req.body.userID);

  await outfitModel
    .addNewOutfit(req.body.name, user[0].id)
    .then((add) => {
      res.send(add);
    })
    .catch((err) => {
      res.status(401).json(err);
    });
});

// add items to outfit
router.post('/addItems', async function (req, res) {
  // console.log('req.body =', req.body);
  await outfitModel
    .addToOutfit(req.body.itemID, req.body.outfitID, req.body.userID)
    .then((post) => {
      res.send(post);
    })
    .catch((err) => {
      res.status(401).json(err);
    });
});

// delete outfit
router.delete('/delete/:outfitID', async function (req, res) {
  // console.log('req.params =', req.params);
  await outfitModel
    .deleteOutfit(req.params.outfitID)
    .then((del) => {
      res.send(del);
    })
    .catch((err) => {
      res.status(401).json(err);
    });
});

module.exports = router;
