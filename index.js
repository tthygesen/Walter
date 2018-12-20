const express = require("express");
const app = express();
const routes = require("./routes/routes");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const keys = require("./config/keys");

//bodyparser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//passport
app.use(passport.initialize());
require("./config/passport")(passport);

const dbConnection = () => {
  mongoose.connect(
    `mongodb://${keys.dbuser}:${keys.dbpassword}@ds125574.mlab.com:25574/app`,
    { useNewUrlParser: true, useCreateIndex: true },
    err => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("DB status: 200");
    }
  );
};
dbConnection();

app.use("/", routes);

const port = 5000;
app.listen(port, err => {
  if (err) {
    console.log(err);
  }
  console.log(`server running on port: ${port}`);
});
