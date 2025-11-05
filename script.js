// 🌟 MindMate – AI Companion Script

const aiTips = [
  "Great job! 💪 Take a 10-minute break to refresh your mind.",
  "Focus is a muscle — you just trained it! Try a short walk 🚶‍♀️.",
  "Consistency beats intensity. Plan your next session now! 📅",
  "Your brain loves rhythm — study in 45-minute cycles 🔁.",
  "Remember: breaks aren’t distractions, they’re investments in focus ⏸️.",
  "Stay hydrated 💧. Your neurons will thank you!",
  "Amazing effort! Reflect on what you learned today 💭.",
  "Turn off distractions and protect your next study block 🔒."
];

const activityInput = document.getElementById("activityInput");
const submitBtn = document.getElementById("submitBtn");
const aiBtn = document.getElementById("aiBtn");
const aiSuggestion = document.getElementById("aiSuggestion");
const activityList = document.getElementById("activityList");

let activities = JSON.parse(localStorage.getItem("activities")) || [];

// 🧾 Renders the activity list dynamically
function renderActivities() {
  activityList.innerHTML = "";
  if (activities.length === 0) {
    activityList.innerHTML = `<li>No activities logged yet 😴</li>`;
    return;
  }
  activities.forEach((act, i) => {
    const li = document.createElement("li");
    li.textContent = `${i + 1}. ${act}`;
    activityList.appendChild(li);
  });
}

// ✨ Typing animation for AI suggestion
function typeEffect(text) {
  aiSuggestion.textContent = "";
  let i = 0;
  const typing = setInterval(() => {
    aiSuggestion.textContent += text.charAt(i);
    i++;
    if (i >= text.length) clearInterval(typing);
  }, 30);
}

// 🧠 Event: Add Activity
submitBtn.addEventListener("click", () => {
  const activity = activityInput.value.trim();
  if (activity) {
    activities.push(activity);
    localStorage.setItem("activities", JSON.stringify(activities));
    renderActivities();
    activityInput.value = "";
  } else {
    alert("Please enter an activity before logging!");
  }
});

// 🤖 Event: Get AI Suggestion
aiBtn.addEventListener("click", () => {
  const randomTip = aiTips[Math.floor(Math.random() * aiTips.length)];
  typeEffect(randomTip);
});

// 🧹 On Page Load
renderActivities();
