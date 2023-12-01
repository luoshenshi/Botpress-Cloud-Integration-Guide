const messages_container = document.querySelectorAll(".messages_container");

const urlToMessages = "https://api.botpress.cloud/v1/chat/messages/"; // messages list url
const urlToConversations = "https://api.botpress.cloud/v1/chat/conversations/"; // conversations list url
const urlToUsers = "https://api.botpress.cloud/v1/chat/users/"; // users list url

let options = {
  method: "GET",
  headers: {
    "Content-type": "application/json",
    Authorization: "...",
    "x-bot-id": "...",
  },
};

fetch(urlToMessages, options)
  .then((response) => {
    // Handle the response
    if (response.ok) {
      return response.json(); // Parse the JSON response
    } else {
      throw new Error("Network response was not ok.");
    }
  })
  .then((data) => {
    const countOFMessages = data.messages.length;
    for (let i = 0; i < countOFMessages; i++) {
      messages_container[0].innerHTML += `<div class="message">
        <p style="display: none;">${data.messages[i].id}</p>
        <p>${data.messages[i].payload.text}</p>
        <button class="delete_messages">Delete</button>
      </div>`;
    }
    // handling the delete_messages (button) event listener...
    document.querySelectorAll(".delete_messages").forEach((button) => {
      button.addEventListener("click", function () {
        const url =
          urlToMessages +
          this.parentElement.children[0].innerText.replace("Id: ", "");
        console.log(url);
        let DelConvOptions = {
          method: "DELETE",
          headers: {
            Accept: "*/*",
            "Content-type": "application/json",
            Authorization: "...", // bot token. Need any help? Check docs.
            "x-bot-id": "...", // bot id. Need any help? Check docs.
          },
        };
        fetch(url, DelConvOptions)
          .then((response) => {
            console.log(response);
            if (response.ok) {
              return response.json(); // Parse the JSON response
            } else {
              throw new Error("Network response was not ok.");
            }
          })
          .then((data) => {
            console.log(data);
          });
      });
    });
    // Handle the data from the response
    // console.log(data); Log it If you once so that you can understand what going here!!
  })
  .catch((error) => {
    // Handle any errors
    console.error("Fetch error:", error);
  });

fetch(urlToConversations, options)
  .then((response) => {
    // Handle the response
    if (response.ok) {
      return response.json(); // Parse the JSON response
    } else {
      throw new Error("Network response was not ok.");
    }
  })
  .then((data) => {
    const countOFMessages = data.conversations.length;
    for (let i = 0; i < countOFMessages; i++) {
      messages_container[1].innerHTML += `<div class="message">
        <p style="display: none;">Id: ${data.conversations[i].id}</p>
        <p>Platform: ${data.conversations[i].integration}</p>
        <button class="delete_conv">Delete</button>
      </div>`;
    }

    // handling the delete_conv (button) event listener...
    document.querySelectorAll(".delete_conv").forEach((button) => {
      button.addEventListener("click", function () {
        const url =
          urlToConversations +
          this.parentElement.children[0].innerText.replace("Id: ", "");
        console.log(url);
        let DelConvOptions = {
          method: "DELETE",
          headers: {
            Accept: "*/*",
            "Content-type": "application/json",
            Authorization: "...", // bot token. Need any help? Check docs.
            "x-bot-id": "...", // bot id. Need any help? Check docs.
          },
        };
        fetch(url, DelConvOptions)
          .then((response) => {
            console.log(response);
            if (response.ok) {
              return response.json(); // Parse the JSON response
            } else {
              throw new Error("Network response was not ok.");
            }
          })
          .then((data) => {
            console.log(data);
          });
      });
    });
    // Handle the data from the response
    // console.log(data); Log it If you once so that you can understand what going here!!
  })
  .catch((error) => {
    // Handle any errors
    console.error("Fetch error:", error);
  });

fetch(urlToUsers, options)
  .then((response) => {
    // Handle the response
    if (response.ok) {
      return response.json(); // Parse the JSON response
    } else {
      throw new Error("Network response was not ok.");
    }
  })
  .then((data) => {
    const countOFMessages = data.users.length;
    for (let i = 0; i < countOFMessages; i++) {
      if (data.users[i].name == undefined) {
        messages_container[2].innerHTML += `<div class="message">
        <p>Id: ${data.users[i].id}</p>
        <h5>Name isn't present</h5>
        <button class="delete_users">Delete</button>
      </div>`;
      } else {
        messages_container[2].innerHTML += `<div class="message">
        <p style="display: none;">Id: ${data.users[i].id}</p>
        <p>Name: ${data.users[i].name}</p>
        <h5>Name is present</h5>
        <button class="delete_users">Delete</button>
      </div>`;
      }
    }

    // handling the delete_users (button) event listener...
    document.querySelectorAll(".delete_users").forEach((button) => {
      button.addEventListener("click", function () {
        const url =
          urlToUsers +
          this.parentElement.children[0].innerText.replace("Id: ", "");
        console.log(url);
        let DelConvOptions = {
          method: "DELETE",
          headers: {
            Accept: "*/*",
            "Content-type": "application/json",
            Authorization: "...", // bot token. Need any help? Check docs.
            "x-bot-id": "...", // bot id. Need any help? Check docs.
            Origin: "*",
          },
        };
        fetch(url, DelConvOptions)
          .then((response) => {
            console.log(response);
            if (response.ok) {
              return response.json(); // Parse the JSON response
            } else {
              throw new Error("Network response was not ok.");
            }
          })
          .then((data) => {
            console.log(data);
          });
      });
    });
    // Handle the data from the response
    // console.log(data); Log it If you once so that you can understand what going here!!
  })
  .catch((error) => {
    // Handle any errors
    console.error("Fetch error:", error);
  });

function delAllMsg() {
  console.log("ok");
  let option = {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: "...",
      "x-bot-id": "...",
    },
  };

  fetch(urlToMessages, option)
    .then((response) => response.json())
    .then((data) => {
      if (data.messages == "") {
        console.log("No messages left to delete");
        return;
      }
      option.method = "DELETE";
      let times = data.messages.length;
      let counter = 0;
      let url = urlToMessages;
      for (let i = 0; i < times; i++) {
        url += data.messages[i].id;
        fetch(url, option)
          .then((response) => response.json())
          .then((data) => {
            counter++;
            if (counter === times) {
              console.log("All messages got deleted");
            }
          });
      }
    });
}
function delAllConv() {
  console.log("ok");
  let option = {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: "...",
      "x-bot-id": "...",
    },
  };

  fetch(urlToConversations, option)
    .then((response) => response.json())
    .then((data) => {
      if (data.conversations == "") {
        console.log("No conversation left to delete");
        return;
      }
      option.method = "DELETE";
      let times = data.conversations.length;
      let counter = 0;
      let url = urlToConversations;
      for (let i = 0; i < times; i++) {
        url += data.conversations[i].id;
        fetch(url, option)
          .then((response) => response.json())
          .then((data) => {
            counter++;
            if (counter === times) {
              console.log("All conversations got deleted");
            }
          });
      }
    });
}
function delAllUsr() {
  console.log("ok");
  let option = {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: "...",
      "x-bot-id": "7f019b1e-fc93-49f1-a9bd-07aab5babbbb",
    },
  };

  fetch(urlToUsers, option)
    .then((response) => response.json())
    .then((data) => {
      if (data.users == "") {
        console.log("No User left to delete");
        return;
      }
      option.method = "DELETE";
      let times = data.users.length;
      let counter = 0;
      let url = urlToUsers;
      for (let i = 0; i < times; i++) {
        url += data.users[i].id;
        fetch(url, option)
          .then((response) => response.json())
          .then((data) => {
            counter++;
            if (counter === times) {
              console.log("All Users got deleted");
            }
          });
      }
    });
}
