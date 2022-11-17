const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan"); //better debugging
const cors = require("cors");
//allow using a .env file
require("dotenv").config();   

//creates a new instance of express application
const app = express();

// add cors header to the server
app.use(cors({
  origin: '*'
}));

//sets up mongoose for the mongoDB connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database connection Success!");
  })
  .catch((err) => {
    console.error("Mongo Connection Error", err);
  });

//declare port number for the api
const PORT = process.env.PORT || 3000;

//setup
app.use(express.json());
app.use(morgan("dev"));

//import routes
const orgDataRoute  = require('./routes/orgData');
const primaryDataRoute  = require('./routes/primaryData');
const eventsDataRoute  = require('./routes/eventsData');
const participationRoute = require('./routes/participation');

//setup middle ware for routes
app.use('/orgData', orgDataRoute);
app.use('/primaryData', primaryDataRoute);
app.use('/eventData', eventsDataRoute)
app.use('/participation', participationRoute)

app.listen(PORT, () => {
  console.log("Server started listening on port : ", PORT);
});

//error handler
app.use(function (err, req, res, next) {
  // logs error and error code to console
  console.error(err.message, req);
  if (!err.statusCode)
    err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

///local connection
///MONGO_URL = mongodb://0.0.0.0:27017/projectdb

//atlas connection
///MONGO_URL = mongodb+srv://Rdelgado23:AguAtlas0231@cluster0.ft3r5fq.mongodb.net/test