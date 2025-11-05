// Array of random motivational / focus tips
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

const activities = [];

// Log user activity
submitBtn.addEventListener("click", () => {
  const activity = activityInput.value.trim();
  if (activity) {
    activities.push(activity);
    renderActivities();
    activityInput.value = "";
  } else {
    alert("Please enter an activity before logging!");
  }
});

// Show random AI suggestion
aiBtn.addEventListener("click", () => {
  const randomTip = aiTips[Math.floor(Math.random() * aiTips.length)];
  aiSuggestion.textContent = randomTip;
});

// Render activity list
function renderActivities() {
  activityList.innerHTML = "";
  activities.forEach((act, i) => {
    const li = document.createElement("li");
    li.textContent = `${i + 1}. ${act}`;
    activityList.appendChild(li);
  });
}
