# Botpress Cloud Integration Guide

This guide provides step-by-step instructions for integrating Botpress with your application using Node.js or any other programming language.

## Getting Started

To begin, you will need to set up the necessary headers for your requests. Here's an example of the headers you will need:

```javascript
headers: {
    Authorization: "Bearer your bot token",
    "x-bot-id": "your bot id",
    "x-integration-id": "your integration id"
}
```

In addition, you will also need the following information:

- `userId`: Your user ID
- `conversationId`: Your conversation ID

### Getting Authorization

To obtain the `Authorization` header, you will need to log into [Botpress](https://app.botpress.cloud/). Once logged in, follow these steps:

1. Click on the profile icon located in the top right corner. If you don't see the profile icon, simply refresh the page.
2. Navigate to `Personal Access Tokens` and click on `Generate new token` to create a new token. Be sure to save it for later use.

### Getting x-bot-id

To obtain the `x-bot-id`, follow these steps:

1. Go to [Botpress](https://app.botpress.cloud/) and click on the `Integration` tab.
2. Select `Webchat`.
3. Select `Configurable` and locate the script code. Copy the `botId` from the script.

### Getting x-integration-id

To obtain the `x-integration-id`, follow these steps:

1. Go to [Botpress](https://app.botpress.cloud/) and click on the `Integration` tab.
2. Select `Webchat` and in the browser's search bar `https://......integrations/x_integration_id`. Copy the integration ID from the URL.

### Getting conversationId and userId

To obtain the `conversationId` and `userId`, you can make a `GET` request using Postman or Thunder Client with the following headers:

```json
Accept: */*
Content-type: application/json
Authorization: your_Authorization
x-bot-id: your_x-bot-id
```

Send the request to the URL `https://api.botpress.cloud/v1/chat/messages/`. The response will include the `id` of the conversation and user, which you can then copy for later use. <span style="color:red">Only copy the `conversationId` and `userId` from the JSON where the `direction` is `incoming`.</span>

**Sample response:**

```json

{
      "id": "808f9876-b826-4ab8-859f-6d9cc4978cd2",
      "createdAt": "2023-12-01T07:45:11.989Z",
      "conversationId": "60850c80-a9a3-4aab-a783-e62473715d9c",
      "payload": {
        "text": "I am Zero Two, darling. "
      },
      "tags": {},
      "userId": "2e663732-6979-41a8-9ebf-9a29b51227bc",
      "type": "text",
      "direction": "outgoing"
    },
    {
      "id": "cb2dd2ee-4a55-4055-ad37-02bad35a68a8",
      "createdAt": "2023-12-01T07:45:08.285Z",
      "conversationId": "60850c80-a9a3-4aab-a783-e62473715d9c",
      "payload": {
        "text": "WHO R U?"
      },
      "tags": {},
      "userId": "d360d20b-849d-4a4d-9b3c-5597eb4868c4",
      "type": "text",
      "direction": "incoming"
    },
```

_In this case my `userId` is `d360d20b-849d-4a4d-9b3c-5597eb4868c4` and `conversationId` is `60850c80-a9a3-4aab-a783-e62473715d9c`_

**If you got this response:**

```json
{
  "messages": [],
  "meta": {}
}
```

Got to [Botpress](https://app.botpress.cloud) log in, then go to `chat` tab, then have some conversation with the bot, then request again on `https://api.botpress.cloud/v1/chat/messages/` with given headers.

Please note that the `conversationId` is unique for each conversation. If you have deleted the conversation, you can retrieve the `id` by going to [Botpress](https://app.botpress.cloud), navigating to `chat`, and waiting for the chat to load, and sending a message to the bot.

### Full Request Code:

```javascript
const options = {
  url: "https://api.botpress.cloud/v1/chat/messages/",
  headers: {
    "Content-type": "application/json",
    Authorization: "...",
    "x-bot-id": "...",
    "x-integration-id": "...",
  },
  body: JSON.stringify({
    userId: "...",
    conversationId: "...",
    type: "text",
    payload: {
      text: "Hey There!",
    },
    tags: {},
  }),
};

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
```

### Solving Errors

If you encounter the following error:

1:

```javascript
data: {
  id: 'err_1701413466111xF2B68D30',
  code: 400,
  type: 'ReferenceNotFound',
  message: `Conversation "your_conversation_id" doesn't exist for bot "your_bot_id"`
}
```

To resolve this error, simply update the `conversationId` with a valid `conversationId`. Refer to the section **Getting conversationId and userId** for instructions on obtaining the correct `conversationId`.

2:

```
data: {
  id: 'err_1701419803251x28BB95A4',
  code: 400,
  type: 'ReferenceNotFound',
  message: `User "7caa8576-f1f5-4108-9011-2280af3af42c" doesn't exist for bot "7f019b1e-fc93-49f1-a9bd-07aab5babbbb"`
}
```

<center><b>OR</b></center>

```
data: {
  id: 'err_1701419307894xEB8DE91F',
  code: 400,
  type: 'InvalidPayload',
  message: 'The provided UUID is invalid'
}
```

To resolve this error, simply update the `userId` with a valid `userId`. Refer to the section **Getting conversationId and userId** for instructions on obtaining the correct `userId`.

_By following these steps, you can integrate Botpress with your application in a professional manner, ensuring that you have all the necessary information and headers for a successful integration._
