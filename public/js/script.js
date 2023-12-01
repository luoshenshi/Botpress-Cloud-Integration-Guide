const reply = document.getElementById("reply");
const msg = document.getElementById("msg");
const btn_send = document.getElementById("btn_snd");

btn_send.addEventListener("click", () => {
  if (msg.value == "" || msg.value.replace(/ /g, "") == "") {
    return;
  }

  const userMessage = document.createElement("div");
  userMessage.classList.add("user-message");
  userMessage.textContent = msg.value;
  reply.appendChild(userMessage);

  fetch(`http://localhost:3000/query?message=${msg.value}`) // fetching the bot's reply from index.js's `/query`
    .then((data) => data.json())
    .then((resp) => {
      const botMessage = document.createElement("div");
      botMessage.classList.add("bot-message");
      botMessage.textContent = resp.payload.text;
      reply.appendChild(botMessage);
    });

  msg.value = "";
});
