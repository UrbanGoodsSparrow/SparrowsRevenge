function openPage(page) {
  window.location.href = page;
}

/* ===============================
   BELL SCHEDULE
=============================== */

const schedule = [
  { name: "1st Period", start: "07:50", end: "08:55" },
  { name: "2nd Period", start: "08:55", end: "10:00" },
  { name: "3rd Period", start: "10:00", end: "11:00" },
  { name: "4th Period", start: "11:00", end: "12:45" },
  { name: "5th Period", start: "12:45", end: "13:50" },
  { name: "6th Period", start: "13:50", end: "14:50" }
];

let alertedPeriods = [];

/* ===============================
   UPDATE SCHEDULE DISPLAY
=============================== */

function updateSchedule() {
  const scheduleList = document.getElementById("schedule-list");
  const currentPeriod = document.getElementById("current-period");

  let html = "";
  schedule.forEach(p => {
    html += `${p.name}: ${p.start} - ${p.end}<br>`;
  });

  if (scheduleList) {
    scheduleList.innerHTML = html;
    scheduleList.style.fontFamily = "'Orbitron', sans-serif";
    scheduleList.style.color = "#bf9000";
  }

  const now = new Date();
  const minutesNow = now.getHours() * 60 + now.getMinutes();
  let active = "School is not in session";

  schedule.forEach(period => {
    const [sh, sm] = period.start.split(":").map(Number);
    const [eh, em] = period.end.split(":").map(Number);

    const start = sh * 60 + sm;
    const end = eh * 60 + em;

    // Detect active period
    if (minutesNow >= start && minutesNow < end) {
      active = `Current: ${period.name}`;

      // 5 minute warning check
      const fiveBefore = end - 5;

      if (
        minutesNow === fiveBefore &&
        !alertedPeriods.includes(period.name)
      ) {
        alertedPeriods.push(period.name);
        showWarningPopup(`5 more mins until ${period.name} ends`);
      }
    }
  });

  if (currentPeriod) {
    currentPeriod.innerText = active;
    currentPeriod.style.fontFamily = "'Orbitron', sans-serif";
    currentPeriod.style.color = "#bf9000";
  }
}

setInterval(updateSchedule, 1000);

/* ===============================
   POPUP SYSTEM
=============================== */

function showWarningPopup(message) {
  const popup = document.createElement("div");
  popup.innerText = message;

  popup.style.position = "fixed";
  popup.style.bottom = "20px";
  popup.style.right = "20px";
  popup.style.background = "black";
  popup.style.color = "white";
  popup.style.border = "2px solid red";
  popup.style.padding = "15px";
  popup.style.boxShadow = "0 0 15px red";
  popup.style.zIndex = "9999";
  popup.style.fontWeight = "bold";
  popup.style.fontFamily = "'Orbitron', sans-serif";
  popup.style.textTransform = "uppercase";
  popup.style.letterSpacing = "1px";

  document.body.appendChild(popup);

  setTimeout(() => {
    popup.remove();
  }, 5000);
}

/* ===============================
   GAME PLACEHOLDERS
=============================== */

function runSnake() {
  alert("Snake coming soon.");
}

function runClicker() {
  alert("Clicker coming soon.");
}

function runPlatformer() {
  alert("Platformer coming soon.");
}

function runMemory() {
  alert("Memory coming soon.");
}
// --- Admin Panel ---
let adminPanel = document.getElementById("admin-panel");
let closeBtn = document.getElementById("close-admin");
let addBtn = document.getElementById("add-app");
let appList = document.getElementById("app-list");

let apps = [];

// Password prompt on Ctrl+B
document.addEventListener("keydown", function(e) {
  if (e.ctrlKey && e.key.toLowerCase() === "b") {
    let pass = prompt("Enter Admin Password:");
    if (pass === "5021") {
      adminPanel.style.display = "block";
    }
  }
});

// Close panel
closeBtn.addEventListener("click", () => {
  adminPanel.style.display = "none";
});

// Add new app
addBtn.addEventListener("click", () => {
  const name = document.getElementById("new-app-name").value;
  const img = document.getElementById("new-app-img").value;
  const link = document.getElementById("new-app-link").value;
  if (!name || !img || !link) return;

  const app = {name, img, link};
  apps.push(app);
  renderApps();

  document.getElementById("new-app-name").value = "";
  document.getElementById("new-app-img").value = "";
  document.getElementById("new-app-link").value = "";
});

// Render app list
function renderApps() {
  appList.innerHTML = "";
  apps.forEach((app, index) => {
    let div = document.createElement("div");
    div.innerHTML = `
      <strong>${app.name}</strong>
      <button onclick="window.open('${app.link}','_blank')">Open</button>
      <button onclick="removeApp(${index})">Delete</button>
    `;
    appList.appendChild(div);
  });
}

// Remove app
function removeApp(index) {
  apps.splice(index, 1);
  renderApps();
}

// --- Draggable Admin Panel ---
let isDragging = false;
let offsetX, offsetY;
const header = adminPanel.querySelector(".admin-header");

header.addEventListener("mousedown", e => {
  isDragging = true;
  offsetX = e.clientX - adminPanel.offsetLeft;
  offsetY = e.clientY - adminPanel.offsetTop;
});

document.addEventListener("mouseup", () => isDragging = false);

document.addEventListener("mousemove", e => {
  if (isDragging) {
    adminPanel.style.left = (e.clientX - offsetX) + "px";
    adminPanel.style.top = (e.clientY - offsetY) + "px";
  }
});
