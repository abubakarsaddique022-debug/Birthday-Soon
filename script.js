
const pages = document.querySelectorAll(".page");

const yesButton = document.getElementById("yes-button");
const noButton = document.getElementById("no-button");
const buttonArea = document.querySelector(".button-area");
const toast = document.getElementById("toast");

// Change between pages
function showPage(pageId) {
  pages.forEach((page) => {
    page.classList.toggle("active", page.id === pageId);
  });

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  makeHeartBurst(12);
}

// Show a small message
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

// Make the NO button run away
function moveNoButton() {
  const areaRect = buttonArea.getBoundingClientRect();
  const btnRect = noButton.getBoundingClientRect();

  const maxX = Math.max(0, areaRect.width - btnRect.width);
  const maxY = 35;

  const nextX = Math.random() * maxX - maxX / 2;
  const nextY = Math.random() * maxY - maxY / 2;

  noButton.style.position = "relative";
  noButton.style.left = `${nextX}px`;
  noButton.style.top = `${nextY}px`;

  noButton.style.transition =
    "left .18s ease, top .18s ease";
}

// NO button events
noButton.addEventListener("pointerenter", moveNoButton);
noButton.addEventListener("focus", moveNoButton);

noButton.addEventListener("touchstart", (event) => {
  event.preventDefault();
  moveNoButton();
}, { passive: false });

// YES button opens page 2
yesButton.addEventListener("click", () => {
  showPage("page-two");

  showToast(
    "Yayyy! You just made my heart smile! 💗"
  );
});

// Open countdown page
document
  .getElementById("to-countdown")
  .addEventListener("click", () => {
    showPage("page-three");
  });

// Final button
document
  .getElementById("celebrate-button")
  .addEventListener("click", () => {
    makeHeartBurst(30);

    showToast(
      "Sending you the biggest hug and all my love! 🫂💖"
    );
  });

// Find the next November 13
function getNextBirthdayDate() {
  const now = new Date();
  let year = now.getFullYear();

  let target = new Date(
    year, 10, 13, 0, 0, 0
  );

  // If November 13 has passed, use next year
  if (now >= target) {
    target = new Date(
      year + 1, 10, 13, 0, 0, 0
    );
  }

  return target;
}

// Countdown timer
function updateCountdown() {
  const now = new Date();
  const target = getNextBirthdayDate();

  const remaining = Math.max(
    0,
    target.getTime() - now.getTime()
  );

  const days = Math.floor(
    remaining / (1000 * 60 * 60 * 24)
  );

  const hours = Math.floor(
    (remaining / (1000 * 60 * 60)) % 24
  );

  const minutes = Math.floor(
    (remaining / (1000 * 60)) % 60
  );

  const seconds = Math.floor(
    (remaining / 1000) % 60
  );

  document.getElementById("days").textContent =
    String(days).padStart(2, "0");

  document.getElementById("hours").textContent =
    String(hours).padStart(2, "0");

  document.getElementById("minutes").textContent =
    String(minutes).padStart(2, "0");

  document.getElementById("seconds").textContent =
    String(seconds).padStart(2, "0");
}

updateCountdown();

setInterval(updateCountdown, 1000);

// Floating hearts and sparkles
const heartLayer =
  document.getElementById("floating-hearts");

const heartSymbols = [
  "♡", "♥", "💗", "✨", "🌸", "💕"
];

function createFloatingHeart() {
  const heart = document.createElement("span");

  heart.className = "floating-heart";

  heart.textContent =
    heartSymbols[
      Math.floor(Math.random() * heartSymbols.length)
    ];

  heart.style.left = `${Math.random() * 100}%`;

  heart.style.fontSize =
    `${14 + Math.random() * 18}px`;

  heart.style.animationDuration =
    `${7 + Math.random() * 7}s`;

  heart.style.animationDelay =
    `${Math.random() * 2}s`;

  heartLayer.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 16000);
}

// Heart burst when moving to a new page
function makeHeartBurst(amount) {
  for (let i = 0; i < amount; i++) {
    setTimeout(createFloatingHeart, i * 75);
  }
}

// Start floating effects
for (let i = 0; i < 12; i++) {
  setTimeout(createFloatingHeart, i * 500);
}

setInterval(createFloatingHeart, 1250);
