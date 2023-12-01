const axios = require("axios");
const request = require("request");
const express = require("express");
const app = express();
const base_url = "https://api.botpress.cloud/v1/chat/conversations";

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/settings.html");
});

app.use(express.static(__dirname + "/public"));

app.listen(3100, console.log("running on port 3100"));
