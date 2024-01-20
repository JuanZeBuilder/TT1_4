const express = require("express");
const cors = require("cors");
const countryRoutes = require("./routes/Country");
const loginRoutes = require('./routes/Login');
const router = express.Router();
const authenticateToken = require('./middleware/Authentication');

const jwt = require('jsonwebtoken');

const app = express();

var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
require("./routes/Country")(app);
require("./routes/Destination")(app);
require("./routes/Itinerary")(app);
require("./routes/Login")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(
    `Server is running on port ${PORT}. Link here: http://localhost:8080`
  );
});
