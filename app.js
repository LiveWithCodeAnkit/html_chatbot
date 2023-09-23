

const chatInput = document.querySelector(".chat-input textarea");

const sendChatBtn = document.querySelector(".chat-input span");

const chatbox = document.querySelector(".chatbox");

const chatbotToggler = document.querySelector(".chatbot-toggler");
const chatbotCloseBtn = document.querySelector(".close-btn");


let usrMessage;

const createChatLi = (message, clasaName) => {
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", clasaName);

  let chatContent =
    clasaName === "outgoing"
      ? `<p></p>`
      : ` <span class="material-symbols-outlined">Smart_toy</span><p></p>`;

  chatLi.innerHTML = chatContent;
  chatLi.querySelector("p").textContent = message;
  return chatLi;
};

const generateResponse = (incomingChatLi) => {
  const API_URL = "";
  const messageElement = incomingChatLi.querySelector("p");
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer${APY_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      message: [{ role: "user", content: usrMessage }],
    }),
  };
  fetch(API_URL, requestOptions)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      messageElement.textContent = data.choices[0].message.content;
    })
    .catch((error) => {
      //   console.log(error);
      messageElement.textContent = "Opps Somthing Wrong ...";
    })
    .finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
};

const handleChat = () => {
  userMessage = chatInput.value.trim();
  if (!userMessage) return;

  chatbox.appendChild(createChatLi(userMessage, "outgoing"));
  chatbox.scrollTo(0, chatbox.scrollHeight);

  setTimeout(() => {
    const incomingChatLi = createChatLi("Thinking...", "incoming");
    chatbox.appendChild(incomingChatLi);
    chatbox.scrollTo(0, chatbox.scrollHeight);
    generateResponse(incomingChatLi);
  }, 600);
};

chatbotToggler.addEventListener("click",()=>{
    document.body.classList.toggle("show-chatbot")
})



chatbotCloseBtn.addEventListener("click",()=>{
    document.body.classList.remove("show-chatbot")
})
sendChatBtn.addEventListener("click", handleChat);
