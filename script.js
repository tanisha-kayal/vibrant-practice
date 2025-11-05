// 🌟 MindMate AI Chat Functionality

const chatContainer = document.getElementById("chatContainer");
const inputField = document.getElementById("activityInput");
const sendBtn = document.getElementById("sendBtn");

const aiResponses = [
  "Great job logging that! Stay consistent 💪",
  "Focus for 45 minutes, then take a 10-minute break 🧘‍♀️",
  "Hydrate and stretch! Your brain loves oxygen 💧",
  "You’re doing amazing — slow progress is still progress 🌱",
  "Time-block your next session and stay distraction-free 🔒",
  "Reflect on your goals today. What’s one thing you can improve? 💭",
  "Remember to rest — burnout helps no one 🌙",
  "MindMate is proud of you 😌 Keep going!"
];

// 🧠 Typing animation
function typeMessage(element, text, speed = 25) {
  let i = 0;
  const typing = setInterval(() => {
    element.textContent += text.charAt(i);
    i++;
    if (i >= text.length) clearInterval(typing);
  }, speed);
}

// 🗨️ Add message bubble
function addMessage(text, sender = "user") {
  const message = document.createElement("div");
  message.classList.add("chat-message", sender);
  chatContainer.appendChild(message);
  chatContainer.scrollTop = chatContainer.scrollHeight;
  if (sender === "ai") {
    typeMessage(message, text);
  } else {
    message.textContent = text;
  }
}

// 💬 Handle send button click
sendBtn.addEventListener("click", handleChat);
inputField.addEventListener("keypress", (e) => {
  if (e.key === "Enter") handleChat();
});

function handleChat() {
  const userText = inputField.value.trim();
  if (userText === "") return;

  // Add user message
  addMessage(userText, "user");
  inputField.value = "";

  // Save activity in local storage
  const saved = JSON.parse(localStorage.getItem("mindmate_log")) || [];
  saved.push(userText);
  localStorage.setItem("mindmate_log", JSON.stringify(saved));

  // AI thinking delay
  setTimeout(() => {
    const randomReply = aiResponses[Math.floor(Math.random() * aiResponses.length)];
    addMessage(randomReply, "ai");
  }, 700);
}

// 🧾 On page load, reload previous chat
window.addEventListener("load", () => {
  const saved = JSON.parse(localStorage.getItem("mindmate_log")) || [];
  if (saved.length > 0) {
    addMessage("Welcome back! Here are your last few logs 🗓️", "ai");
    saved.slice(-3).forEach((text) => addMessage(text, "user"));
  }
});