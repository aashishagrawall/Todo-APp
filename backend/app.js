const express = require("express");

const bodyParser = require("body-parser");
const path = require("path");

const cors = require("cors");
const routes = require("./routes/routes");
//const passport = require("passport");

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", routes);

app.listen(process.env.PORT || 4000, () => {
  console.log(`App Started on PORT ${process.env.PORT || 4000}`);
});
