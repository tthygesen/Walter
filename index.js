const express = require("express");
const app = express();
const routes = require("./routes/routes");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const keys = require("./config/keys");
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

//bodyparser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//passport
app.use(passport.initialize());
require("./config/passport")(passport);

const dbConnection = () => {
  mongoose.connect(
    keys.mongoURI,
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

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, err => {
  if (err) {
    console.log(err);
  }
  console.log(`server running on port: ${port}`);
});
