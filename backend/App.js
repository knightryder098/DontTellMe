const express = require("express");
const app = new express();

app
  .get("/", (req, res) => {
    console.log(`Cliked`);
    res.send("Hii belo");
  })
  .listen(5500, () => {
    console.log(`Listening on post 5500`);
  });
