const express = require("express");
const router = express.Router();

//importing data models
const ParticipationModel = require("../models/participation");

//GET endpoint that will retrieve all participation data (e.g. for barchart)
router.get('/', (req, res, next) => {
  ParticipationModel.find({}, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data);
    }
  });
});

//POST create endpoint for an participation document
router.post('/', (req, res, next) => {
  ParticipationModel.create(req.body, (error, data) => {
      if (error) {
          return next(error)
      } else {
          // res.json(data)
          res.send('Participation amount has been added to the database');
      }
  });
});

module.exports = router;