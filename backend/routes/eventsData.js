const express = require("express");
const router = express.Router();

//importing data model schemas
let { eventdata } = require("../models/models"); 

//GET all entries
router.get("/", (req, res, next) => { 
    eventdata.find( 
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    ).sort({ 'updatedAt': -1 }).limit(10);
});

//Mongo Db Atlas Chart Information:
//https://www.mongodb.com/products/charts
//https://www.youtube.com/watch?v=mHanesMLPmw
//Get request that will show the JSON formatted return of Atlas chart data
//use aggregate function to show the return--don't know how to do this in Vue yet
//router first
router.get("/atlaschart", (req, res, next) => {
    //constant that will hold the JSON return
    const chart = [
        {
            "$addFields": {
              "__alias_0": {
                "$cond": {
                  "if": {
                    "$isArray": "$attendees"
                  },
                  "then": {
                    "$size": "$attendees"
                  },
                  "else": 0
                }
              }
            }
          },
          {
            "$group": {
              "_id": {
                "__alias_1": "$eventName"
              },
              "__alias_0": {
                "$sum": "$__alias_0"
              }
            }
          },
          {
            "$project": {
              "_id": 0,
              "__alias_1": "$_id.__alias_1",
              "__alias_0": 1
            }
          },
          {
            "$project": {
              "x": "$__alias_0",
              "y": "$__alias_1",
              "_id": 0
            }
          },
          {
            "$addFields": {
              "__agg_sum": {
                "$sum": [
                  "$x"
                ]
              }
            }
          },
          {
            "$sort": {
              "__agg_sum": -1
            }
          },
          {
            "$project": {
              "__agg_sum": 0
            }
          },
          {
            "$limit": 5000
          }
    ];

    //return the JSON data
    eventdata.aggregate(chart).exec((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});


//GET single entry by ID
router.get("/id/:id", (req, res, next) => { 
    eventdata.find({ _id: req.params.id }, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

//GET entries based on search query
//Ex: '...?eventName=Food&searchBy=name' 
router.get("/search/", (req, res, next) => { 
    let dbQuery = "";
    if (req.query["searchBy"] === 'name') {
        dbQuery = { eventName: { $regex: `^${req.query["eventName"]}`, $options: "i" } }
    } else if (req.query["searchBy"] === 'date') {
        dbQuery = {
            date:  req.query["eventDate"]
        }
    };
    eventdata.find( 
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
        { attendees: req.params.id }, 
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});

//GET all events for an Organization
router.get("/:orgName", (req, res, next) => { 
    eventdata.find( 
        { orgName: req.params.orgName }, 
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});



//POST: Create endpoint that will make a new event
router.post('/', (req, res, next) => {

    eventdata.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.send('A new Event has been created!');
        }
    });
});


//PUT update API that edits an event information via it's ID
router.put('/:id', (req, res, next) => {
    eventdata.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.send('Event has been updated');
            console.log('Event Successfully Updated', data)
        }
    })
});



//PUT add attendee to event
router.put("/addAttendee/:id", (req, res, next) => {
    //only add attendee if not yet signed uo
    eventdata.find( 
        { _id: req.params.id, attendees: req.body.attendee }, 
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                if (data.length == 0) {
                    eventdata.updateOne(
                        { _id: req.params.id }, 
                        { $push: { attendees: req.body.attendee } },
                        (error, data) => {
                            if (error) {
                                consol
                                return next(error);
                            } else {
                                res.json(data);
                            }
                        }
                    );
                }
                
            }
        }
    );
    
});

//Delete an event by ID
router.delete("/:id", (req, res, next) => {
    eventdata.findOneAndDelete(
        { _id: req.params.id },
        req.body,
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.send('Event has been deleted');
                console.log('Event successfully removed', data)
            }
        }
    );
});

//Delete that will remove an attendee from the event
router.delete("/deleteAttendee/:id", (req, res, next) => {
    //only add attendee if not yet signed u
    eventdata.find( 
        { _id: req.params.id, attendees: req.body.attendee }, 
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                if (data.length == 0) {
                    eventdata.deleteOne(
                        { _id: req.params.id }, 
                        { $push: { attendees: req.body.attendee } },
                        (error, data) => {
                            if (error) {
                                consol
                                return next(error);
                            } else {
                                res.json(data);
                            }
                        }
                    );
                }
                
            }
        }
    );
    
});


module.exports = router;
