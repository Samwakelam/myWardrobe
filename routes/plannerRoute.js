const express = require('express');
const router = express.Router();

// required models
const plannerModel = require('../models/planner');

// get item in planner by id
// checks if an outfit is saved in the planner.
router.get('/isInPlanner/:outfitID', async function (req, res) {
  // console.log('outfit/:outfitID req.params =', req.params);
  await plannerModel
    .isInPlanner(req.params.outfitID)
    .then((select) => {
      res.send(select);
    })
    .catch((err) => {
      res.status(401).json(err);
    });
});

// gets the planner date from the planner table
router.get('/getDate/:dateString&:userId', async function (req, res) {
  // console.log('/planner/:dateString req.params =', req.params);
  await plannerModel
    .getDate(req.params.dateString, req.params.userId)
    .then((select) => {
      res.send(select);
    })
    .catch((err) => {
      res.status(401).json(err);
    });
});

// add new date to planner table
router.post('/newDate', async function (req, res) {
  await plannerModel
    .addNewCalanderEntry(
      req.body.dateString,
      req.body.outfitID,
      req.body.userID
    )
    .then((add) => {
      res.send(add);
    })
    .catch((err) => {
      res.status(401).json(err);
    });
});

// update existing date in planner
router.put('/updateDate', async function (req, res) {
  // console.log('req.body =', req.body);
  await plannerModel
    .updatingOutfit(req.body.dateString, req.body.outfitID)
    .then((update) => {
      res.send(update);
    })
    .catch((err) => {
      res.status(401).json(err);
    });
});

// delete date from planner
router.delete('/deleteDate/:dayID', async function (req, res) {
  // console.log('req.params =', req.params);
  await plannerModel
    .deleteEntry(req.params.dayID)
    .then((del) => {
      if (del === 1) {
        res.send({
          success: true,
          result: del,
        });
      } else {
        res.send({
          success: false,
          result: del,
        });
      }
    })
    .catch((err) => {
      res.status(401).json(err);
    });
});

module.exports = router;
