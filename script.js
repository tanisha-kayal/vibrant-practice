// Shared logic for MindMate pages

// 🔑 INSERT YOUR GEMINI API KEY HERE
const GEMINI_API_KEY = "AIzaSyCOynUHvqRFsYThuiBrWFrZmdh3L8XQXQw";

// --- Local Storage helpers ---
function getData(){return JSON.parse(localStorage.getItem("mindmate_data"))||{sessions:0,focus:0,streak:0};}
function saveData(data){localStorage.setItem("mindmate_data",JSON.stringify(data));}

// --- Dashboard ---
if(document.getElementById("focusScore")){
  const d=getData();
  document.getElementById("focusScore").textContent=d.focus;
  document.getElementById("sessionsLogged").textContent=d.sessions;
  document.getElementById("streakDays").textContent=d.streak;
}

// --- Study Timer ---
if(document.getElementById("startTimer")){
  const display=document.getElementById("timerDisplay");
  const focus=document.getElementById("focusTime");
  const msg=document.getElementById("sessionMsg");
  document.getElementById("startTimer").onclick=()=>{
    let time=focus.value*60;msg.textContent="Focusing...";
    const t=setInterval(()=>{
      const m=Math.floor(time/60),s=time%60;
      display.textContent=`${m}:${s<10?"0":""}${s}`;
      if(time--<=0){clearInterval(t);msg.textContent="Session done! +10 Focus";const d=getData();d.sessions++;d.focus+=10;saveData(d);}
    },1000);
  };
}

// --- Analytics ---
if(document.getElementById("barChart")){
  const ctx=document.getElementById("barChart");
  const d=getData();
  new Chart(ctx,{type:"bar",data:{labels:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
  datasets:[{label:"Minutes Focused",data:[d.focus/7+5,8,10,7,12,6,9],backgroundColor:"#A7C7E7"}]},options:{scales:{y:{beginAtZero:true}}}});
}

// --- AI Assistant (placeholder) ---
if(document.getElementById("chatBox")){
  const chatBox=document.getElementById("chatBox"),input=document.getElementById("userInput"),btn=document.getElementById("sendBtn");
  function addMsg(txt,cls){const p=document.createElement("p");p.className=cls;p.textContent=txt;chatBox.appendChild(p);chatBox.scrollTop=chatBox.scrollHeight;}
  async function getGeminiReply(prompt){
    async function getGeminiReply(prompt) {
  const endpoint =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" +
    GEMINI_API_KEY;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    }),
  });

  const data = await response.json();

  // Extract the model's reply text
  const reply =
    data?.candidates?.[0]?.content?.parts?.[0]?.text ||
    "⚠️ MindMate couldn’t think of a response right now. Try again!";

  return reply;
  }
  }
  btn.onclick=async()=>{
    const q=input.value.trim();if(!q)return;
    addMsg("You: "+q,"user");input.value="";
    const r=await getGeminiReply(q);
    setTimeout(()=>addMsg(r,"ai"),500);
  };
}