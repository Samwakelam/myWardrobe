const express = require('express');
const router = express.Router();
const { selectUserByName } = require('../models/user');
const itemsModel = require('../models/items');
const outfitModel = require('../models/outfit');

/* gets all items that the user has inputted */
router.get('/myWardrobe/:id', async function (req, res) {
  const userID = req.params.id;
  const tops = await itemsModel.selectTopsByID(userID);
  const bottoms = await itemsModel.selectBottomsByID(userID);
  const overalls = await itemsModel.selectOverallsByID(userID);
  res.render('myWardrobe', {
    layouts: 'main',
    tops: tops,
    bottoms: bottoms,
    overalls: overalls,
  });
});

router.get('/myWardrobe/:userID/:type/:catID', async function (req, res) {
  const userID = req.params.userID;
  const type = req.params.type;
  const catID = req.params.catID;
  // console.log('USER ID =', userID);
  let tops;
  let bottoms;
  let overalls;

  if (type === 'top') {
    console.log('filtering tops');
    tops = await itemsModel.selectTopsByCatID(userID, catID);
    bottoms = await itemsModel.selectBottomsByID(userID);
    overalls = await itemsModel.selectOverallsByID(userID);
  } else if (type === 'bottom') {
    console.log('filtering bottoms');
    tops = await itemsModel.selectTopsByID(userID);
    bottoms = await itemsModel.selectBottomsByCatID(userID, catID);
    overalls = await itemsModel.selectOverallsByID(userID);
  } else if (type === 'overall') {
    console.log('filtering overalls');
    tops = await itemsModel.selectTopsByID(userID);
    bottoms = await itemsModel.selectBottomsByID(userID);
    overalls = await itemsModel.selectOverallsByCatID(userID, catID);
  }

  res.render('myWardrobe', {
    layouts: 'main',
    tops: tops,
    bottoms: bottoms,
    overalls: overalls,
  });
});

/* Gets all outfits that the user owns */
router.get('/myOutfits/:id', async function (req, res) {
  // selecting all outfit items with user id
  const outfits = await outfitModel.selectOutfitItems(req.params.id);
  res.render('myOutfits', {
    layouts: 'main',
    outfits: outfits,
  });
});

/* Serves handlebars for pages */

router.get('/addNew', async function (req, res) {
  res.render('newItem', {
    layouts: 'main',
  });
});

router.post('/', async function (req, res) {
  const user = req.body.user;
  const select = await selectUserByName(user);
  res.send(select);
});

/* if this route is hit it means the user has not logged in and will be told to */
router.get('/myWardrobe', async function (req, res) {
  res.render('loginAlert', {
    layouts: 'main',
  });
});

router.get('/myOutfits', async function (req, res, ) {
  res.render('loginAlert', {
    layouts: 'main',
  });
});

/* Root route gives the account page */
router.get('/', async function (req, res) {
  res.render('myAccount', {
    layouts: 'main',
  });
});

module.exports = router;
