const express = require("express");
const cors = require("cors");
const countryRoutes = require("./routes/Country");
const router = express.Router();

const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
require("./routes/Country")(app);
require("./routes/Itinerary")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(
    `Server is running on port ${PORT}. Link here: http://localhost:8080`
  );
});
