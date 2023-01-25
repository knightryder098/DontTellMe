const mongoose = require("mongoose");
require("dotenv").config({ path: "../frontend/.env" });

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@cluster0.gbjan8c.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
  () => {
    console.log(`DATABASE IS CONNECTED`);
  }
);
