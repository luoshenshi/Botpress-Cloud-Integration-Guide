const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/settings.html");
});

app.use(express.static(__dirname + "/public"));

app.listen(3100, console.log("running on port 3100"));
