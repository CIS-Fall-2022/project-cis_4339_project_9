const express = require("express"); 
const router = express.Router(); 

//importing data model schemas
let { primarydata } = require("../models/models"); 
let { eventdata } = require("../models/models"); 

//GET all entries
router.get("/", (req, res, next) => { 
    primarydata.find({organization_id: process.env.ORGANIZATION}, 
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    ).sort({ 'updatedAt': -1 }).limit(10);
});

//GET single entry by ID
router.get("/id/:id", (req, res, next) => {
    primarydata.find({ _id: req.params.id, organization_id: process.env.ORGANIZATION}, 
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});

//GET entries based on search query
//Ex: '...?firstName=Bob&lastName=&searchBy=name' 
router.get("/search/", (req, res, next) => { 
    let dbQuery = "";
    if (req.query["searchBy"] === 'name') {
        dbQuery = { firstName: { $regex: `^${req.query["firstName"]}`, $options: "i" }, lastName: { $regex: `^${req.query["lastName"]}`, $options: "i" } }
    } else if (req.query["searchBy"] === 'number') {
        dbQuery = {
            "phoneNumbers.primaryPhone": { $regex: `^${req.query["phoneNumbers.primaryPhone"]}`, $options: "i" }
        }
    };
    primarydata.find( {organization_id: process.env.ORGANIZATION},
        dbQuery, 
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});

//GET events for which a client is signed up for
router.get("/client/:id", (req, res, next) => { 
    eventdata.find( 
        { attendees: req.params.id, organization_id: process.env.ORGANIZATION }, 
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});



//POST
router.post("/", (req, res, next) => {
    req.body.organization_id = process.env.ORGANIZATION 
    primarydata.create( 
        req.body,
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                res.send('Client has been created'); 
            }
        }
    );
    primarydata.createdAt;
    primarydata.updatedAt;
    primarydata.createdAt instanceof Date;
});

//PUT update 
router.put("/:id", (req, res, next) => { 
    primarydata.findOneAndUpdate({ _id: req.params.id, organization_id: process.env.ORGANIZATION}, 
        req.body,
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.send('Client information has been updated');
            }
        }
    );
});

///DELETE primaryData
router.delete("/:id", (req, res, next) => {
    primarydata.deleteOne({ _id: req.params.id, organization_id: process.env.ORGANIZATION},
         (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.send('Client has been deleted from the primaryData database');
        }
    }
);
});

router.put("/deleteAttendee/:id", (req, res, next) => {
    eventdata.find( 
        { _id: req.params.id, attendees: req.body.attendee }, 
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                if (data.length != 0) {
                    eventdata.updateOne( 
                        { _id: req.params.id }, 
                        { $pull: { attendees: req.body.attendee } },
                        (error, data) => {
                            if (error) {
                                consol
                                return next(error);
                            } else {
                                res.json(data);
                                console.log('Client sucessfully deleted from the event');
                            }
                        }
                    );
                }

            }
        }
    );

});

router.delete("/deleteAttendee/:id", (req, res, next) => {
    eventdata.find( 
        { attendees: req.params.attendee }, 
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                if (data.length != 0) {
                    eventdata.deleteOne( 
                        { attendees: req.params.attendee }, 
                        (error, data) => {
                            if (error) {
                                consol
                                return next(error);
                            } else {
                                res.json(data);
                                console.log('Client sucessfully deleted from the event');
                            }
                        }
                    );
                }
            }
        }
    );

});

module.exports = router;