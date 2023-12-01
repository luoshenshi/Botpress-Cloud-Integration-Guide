const axios = require("axios");
const request = require("request");
const express = require("express");
const app = express();

const base_url = "https://api.botpress.cloud/v1/chat/messages/"; // The Main URL

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html"); // Serving index.html
});

app.use(express.static(__dirname + "/public")); // Serving static files from ./public folder

// Messaging API

app.get("/query", (req, res) => {
  const options = {
    url: base_url,
    headers: {
      "Content-type": "application/json",
      Authorization: "...", // Your Authorization. Need help? Follow Documentation
      "x-bot-id": "...", // Your bot id. Need help? Follow Documentation
      "x-integration-id": "...", // Your x-integration-id. Need help? Follow Documentation
    },
    body: JSON.stringify({
      userId: "...", // Your userId. Need help? Follow Documentation
      conversationId: "...", // Your conversationId. Need help? Follow Documentation
      type: "text",
      payload: {
        text: req.query.message, // Getting user message..
      },
      tags: {},
    }),
  };

  // Making request using axios
  axios
    .post(options.url, options.body, { headers: options.headers })
    .then((response) => {
      console.log(response.data.message.payload.text);
      setTimeout(() => {
        request(options, (q, w, e) => {
          const messages = JSON.parse(w.body).messages; // Messages List
          if (messages.length > 0) {
            res.json(messages[0]); // Sending the last message from Messages list ( Bot's Reply )
          } else {
            res.json({ error: "No messages found" }); // err
          }
        });
      }, 3000);
    })
    .catch((error) => {
      console.error(error);
      res.json({ error: "An error occurred" }); // err
    });
});

app.listen(3000, console.log("running on port 3000"));
