# Botpress Cloud Management

This guide provides step-by-step instructions for managing Botpress in your application using Node.js or any other programming language.

## Getting Started

To begin, you will need to set up the necessary headers for your requests. Here's an example of the headers you will need:

```javascript
headers: {
    Authorization: "Bearer your bot token",
    "x-bot-id": "your_bot_id",
}
```

### Getting Authorization

To obtain the `Authorization` header, you will need to log into [Botpress](https://app.botpress.cloud/). Once logged in, follow these steps:

1. Click on the profile icon located in the top right corner. If you don't see the profile icon, simply refresh the page.
2. Navigate to `Personal Access Tokens` and click on `Generate new token` to create a new token. Be sure to save it for later use.

### Getting x-bot-id

To obtain the `x-bot-id`, follow these steps:

1. Go to [Botpress](https://app.botpress.cloud/) and click on the `Integration` tab.
2. Select `Webchat`.
3. Select `Configurable` and locate the script code. Copy the `botId` from the script.

### Download this Git Repo
1. Download this git repository by:
```bash
git clone https://github.com/luoshenshi/Botpress-Cloud-Management.git
```
2. Go to public > js > script.js
3. In headers paste your `Authorization` and `x-bot-id`
4. Run index.js
