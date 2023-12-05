const messages_container = document.querySelectorAll(".messages_container");
const urls = {
  messages: "https://api.botpress.cloud/v1/chat/messages/",
  conversations: "https://api.botpress.cloud/v1/chat/conversations/",
  users: "https://api.botpress.cloud/v1/chat/users/",
};

const headers = {
  "Content-type": "application/json",
  Authorization: "Bearer ...",
  "x-bot-id": "...",
};

function fetchData(url, options, callback) {
  fetch(url, options)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Network response was not ok.");
      }
    })
    .then((data) => {
      callback(data);
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}

function createMessageElement(message, type) {
  let messageElement = document.createElement("div");
  messageElement.classList.add("message");
  if (type == "users") {
    if (message.name == "" || message.name == undefined) {
      messageElement.innerHTML = `
    <p style="display: none;">Id: ${message.id}</p>
    <p>${type}: ${message.id}</p>
    <button class="delete_${type}">Delete</button>
  `;
    } else {
      messageElement.innerHTML = `
    <p style="display: none;">Id: ${message.id}</p>
    <p>${type}: ${message.name}</p>
    <button class="delete_${type}">Delete</button>
  `;
    }
  } else if (type == "conversations") {
    messageElement.innerHTML = `
    <p style="display: none;">Id: ${message.id}</p>
    <p>${type}: ${message.integration}</p>
    <button class="delete_${type}">Delete</button>
  `;
  } else {
    messageElement.innerHTML = `
    <p style="display: none;">Id: ${message.id}</p>
    <p>${type}: ${message.payload.text}</p>
    <button class="delete_${type}">Delete</button>
  `;
  }
  return messageElement;
}

function deleteData(url, options) {
  fetch(url, options)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Network response was not ok.");
      }
    })
    .then((data) => {
      console.log(data);
    });
}

function handleDeleteButtonClick(type, url) {
  document.querySelectorAll(`.delete_${type}`).forEach((button) => {
    button.addEventListener("click", function () {
      const id = this.parentElement.children[0].innerText.replace("Id: ", "");
      const deleteUrl = url + id;
      deleteData(deleteUrl, {
        method: "DELETE",
        headers: headers,
      });
    });
  });
}

function displayMessages(data, container, type, url) {
  data[type].forEach((item) => {
    const messageElement = createMessageElement(item, type);
    container.innerHTML += messageElement.outerHTML;
  });
  handleDeleteButtonClick(type, url);
}

function fetchAndDisplayData(url, options, container, type) {
  fetchData(url, options, (data) => {
    displayMessages(data, container, type, url);
    console.log(type);
  });
}

fetchAndDisplayData(
  urls.messages,
  { method: "GET", headers },
  messages_container[0],
  "messages"
);
fetchAndDisplayData(
  urls.conversations,
  { method: "GET", headers },
  messages_container[1],
  "conversations"
);
fetchAndDisplayData(
  urls.users,
  { method: "GET", headers },
  messages_container[2],
  "users"
);

function deleteAllData(url, type) {
  fetchData(url, { method: "GET", headers }, (data) => {
    if (data[type].length === 0) {
      console.log(`No ${type} left to delete`);
      return;
    }
    const deleteOptions = {
      method: "DELETE",
      headers: headers,
    };
    data[type].forEach((item) => {
      const deleteUrl = url + item.id;
      deleteData(deleteUrl, deleteOptions);
    });
  });
}

function delAllMsg() {
  deleteAllData(urls.messages, "messages");
}

function delAllConv() {
  deleteAllData(urls.conversations, "conversations");
}

function delAllUsr() {
  deleteAllData(urls.users, "users");
}
