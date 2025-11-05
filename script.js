/* ======================================
   🌟 MindMate – Offline Smart Version
   Team VERTEX | AOT VIBRANT Practice Build
   ====================================== */

// --- Local Storage Helpers ---
function getData() {
  return JSON.parse(localStorage.getItem("mindmate_data")) || {
    sessions: 0,
    focus: 0,
    streak: 0,
  };
}

function saveData(data) {
  localStorage.setItem("mindmate_data", JSON.stringify(data));
}

// --- DASHBOARD LOGIC ---
if (document.getElementById("focusScore")) {
  const d = getData();
  document.getElementById("focusScore").textContent = d.focus;
  document.getElementById("sessionsLogged").textContent = d.sessions;
  document.getElementById("streakDays").textContent = d.streak;
}

// --- STUDY TIMER LOGIC ---
if (document.getElementById("startTimer")) {
  const display = document.getElementById("timerDisplay");
  const focus = document.getElementById("focusTime");
  const msg = document.getElementById("sessionMsg");

  document.getElementById("startTimer").onclick = () => {
    let time = focus.value * 60;
    msg.textContent = "Focusing...";
    const timer = setInterval(() => {
      const m = Math.floor(time / 60),
        s = time % 60;
      display.textContent = `${m}:${s < 10 ? "0" : ""}${s}`;
      if (time-- <= 0) {
        clearInterval(timer);
        msg.textContent = "Session done! 🎉 +10 Focus Points!";
        const d = getData();
        d.sessions++;
        d.focus += 10;
        saveData(d);
      }
    }, 1000);
  };
}

// --- ANALYTICS (Bar Chart) ---
if (document.getElementById("barChart")) {
  const ctx = document.getElementById("barChart");
  const d = getData();
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "Minutes Focused",
          data: [
            d.focus / 7 + 5,
            8,
            10,
            7,
            12,
            6,
            9,
          ],
          backgroundColor: "#A7C7E7",
        },
      ],
    },
    options: { scales: { y: { beginAtZero: true } } },
  });
}

// --- AI CHAT (Offline Smart Mode) ---
if (document.getElementById("chatBox")) {
  const chatBox = document.getElementById("chatBox");
  const input = document.getElementById("userInput");
  const btn = document.getElementById("sendBtn");

  // Helper: Add message to chat
  function addMsg(txt, cls) {
    const p = document.createElement("p");
    p.className = cls;
    p.textContent = txt;
    chatBox.appendChild(p);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  // --- Local Smart Reply Logic ---
  async function getGeminiReply(prompt) {
    const msg = prompt.toLowerCase();

    if (msg.includes("tired") || msg.includes("sleep")) {
      return "Sounds like your brain’s asking for a power nap. Take 10 minutes off, hydrate, and come back strong.";
    }
    if (msg.includes("lazy") || msg.includes("procrastinate")) {
      return "Let’s break the lazy streak. Start with 5 minutes of focused work — momentum beats motivation!";
    }
    if (msg.includes("focus") || msg.includes("concentrate")) {
      return "Try the Pomodoro trick — 25 minutes focus, 5 minutes break. Focus grows with consistency.";
    }
    if (msg.includes("stressed") || msg.includes("anxious")) {
      return "Deep breath. You’ve handled worse. Let’s slow down and tackle one thing at a time.";
    }
    if (msg.includes("study") || msg.includes("exam") || msg.includes("subject")) {
      const tips = [
        "Study smart — revise old notes before learning new topics.",
        "Teaching what you learn helps you retain 90% more. Try explaining a topic out loud.",
        "Break your study into chunks — your brain loves structure more than stress.",
      ];
      return tips[Math.floor(Math.random() * tips.length)];
    }
    if (msg.includes("motivate") || msg.includes("quote") || msg.includes("inspire")) {
      const quotes = [
        "Discipline will take you places motivation can’t.",
        "Start where you are. Use what you have. Do what you can.",
        "You don’t need to see the whole staircase — just take the first step.",
      ];
      return quotes[Math.floor(Math.random() * quotes.length)];
    }
    if (msg.includes("sad") || msg.includes("bad") || msg.includes("down")) {
      const comforting = [
        "Bad days happen. But they pass. You’re doing better than you think.",
        "Rest, reset, and rise again — even flowers take time to bloom.",
      ];
      return comforting[Math.floor(Math.random() * comforting.length)];
    }

    // Default fallback
    const random = [
      "You’ve got this. Small steps every day lead to big wins.",
      "Keep showing up — consistency beats perfection every single time.",
      "Every minute improving yourself compounds over time. Stay steady.",
    ];
    return random[Math.floor(Math.random() * random.length)];
  }

  // --- Chat Send Button Action ---
  btn.onclick = async () => {
    const q = input.value.trim();
    if (!q) return;
    addMsg("You: " + q, "user");
    input.value = "";
    const r = await getGeminiReply(q);
    setTimeout(() => addMsg(r, "ai"), 300);
  };
}