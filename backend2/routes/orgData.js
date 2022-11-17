const express = require("express"); 
const router = express.Router(); 

//importing data model schemas
let { orgdata } = require("../models/models");
let { primarydata } = require("../models/models"); 
let { eventdata } = require("../models/models"); 

//POST: Create endpoint that will make a new Organization
router.post('/', (req, res, next) => {

    orgdata.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.send('A new Organization has been created!');
        }
    });
});

//GET all organization entries
router.get("/", (req, res, next) => { 
    orgdata.find( 
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    ).sort({ 'updatedAt': -1 }).limit(10);
});

//GET single organization by ID
router.get("/id/:id", (req, res, next) => {
    orgdata.find( 
        { _id: req.params.id }, 
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});

//PUT update (make sure req body doesn't have the id)
router.put("/:id", (req, res, next) => { 
    orgdata.findOneAndUpdate( 
        { _id: req.params.id }, 
        req.body,
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.send('Organization information has been updated');
            }
        }
    );
});


router.delete("/:id", (req, res, next) => { 
    orgdata.findOneAndDelete( 
        { _id: req.params.id }, 
        req.body,
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.send('Organization has been deleted from the orgData database');
            }
        }
    );
});


module.exports = router;

