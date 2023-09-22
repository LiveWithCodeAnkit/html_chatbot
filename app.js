// class Chatbox {
//     constructor() {
//         this.args = {
//             openButton: document.querySelector('.chatbox__button'),
//             chatBox: document.querySelector('.chatbox__support'),
//             sendButton: document.querySelector('.send__button')
//         }

//         this.state = false;
//         this.messages = [];
//     }

//     display() {
//         const {openButton, chatBox, sendButton} = this.args;

//         openButton.addEventListener('click', () => this.toggleState(chatBox))

//         sendButton.addEventListener('click', () => this.onSendButton(chatBox))

//         const node = chatBox.querySelector('input');
//         node.addEventListener("keyup", ({key}) => {
//             if (key === "Enter") {
//                 this.onSendButton(chatBox)
//             }
//         })
//     }

//     toggleState(chatbox) {
//         this.state = !this.state;

//         // show or hides the box
//         if(this.state) {
//             chatbox.classList.add('chatbox--active')
//         } else {
//             chatbox.classList.remove('chatbox--active')
//         }
//     }

//     onSendButton(chatbox) {
//         var textField = chatbox.querySelector('input');
//         let text1 = textField.value
//         // if (text1 === "") {
//         //    alert("in valid ans")
//         // }

//         if (text1 === "") {
//             let msg1 = { name: "User", message: text1 };
//             this.messages.push(msg1);
//             let msg2 = { name: "Sam", message: "tttt" };
//             this.messages.push(msg2);
//             this.updateChatText(chatbox);
//             textField.value = '';
//             return;
//         }

//         if (text1 === "hii") {
//             let msg1 = { name: "User", message: text1 };
//             this.messages.push(msg1);
//             let msg2 = { name: "Sam", message: "Welcome to opash " };
//             this.messages.push(msg2);
//             this.updateChatText(chatbox);
//             textField.value = '';
//             return;
//         }

//         let msg1 = { name: "User", message: text1 }
//         this.messages.push(msg1);

//         fetch('http://127.0.0.1:5000/predict', {
//             method: 'POST',
//             body: JSON.stringify({ message: text1 }),
//             mode: 'cors',
//             headers: {
//               'Content-Type': 'application/json'
//             },
//           })
//           .then(r => r.json())
//           .then(r => {
//             let msg2 = { name: "Sam", message: r.answer };
//             this.messages.push(msg2);
//             this.updateChatText(chatbox)
//             textField.value = ''

//         }).catch((error) => {
//             console.error('Error:', error);
//             this.updateChatText(chatbox)
//             textField.value = ''
//           });
//     }

//     updateChatText(chatbox) {
//         var html = '';
//         this.messages.slice().reverse().forEach(function(item, index) {
//             if (item.name === "Sam")
//             {
//                 html += '<div class="messages__item messages__item--visitor">' + item.message + '</div>'
//             }
//             else
//             {
//                 html += '<div class="messages__item messages__item--operator">' + item.message + '</div>'
//             }
//           });

//         const chatmessage = chatbox.querySelector('.chatbox__messages');
//         chatmessage.innerHTML = html;
//     }
// }

// const chatbox = new Chatbox();
// chatbox.display();

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
