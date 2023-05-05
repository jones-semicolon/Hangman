const keyboard = document.querySelector(".keyboard");
const keys = "qwertyuiopasdfghjklzxcvbnm".split("");
const url = "https://random-word-api.vercel.app/api?words=1&length=5";
let word;
const guess = document.querySelector(".guess");
let wrong = 0;

function initKeyboard() {
  for (i = 0; i < keys.length; i++) {
    const key = document.createElement("button");
    key.innerText = keys[i];
    key.id = keys[i];
    keyboard.appendChild(key);
    key.addEventListener("click", () => {
      key.disabled = true;
      checkInput(key.id);
    });
  }
}

function resetKeys() {
  keyboard.childNodes.forEach((key) => {
    key.disabled = false;
  });
}

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function generateMan() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.lineWidth = 5;
  ctx.fillStyle = "hsl(0 0% 0%)";
  ctx.beginPath();
  ctx.moveTo(75, canvas.height - 100);
  if (wrong >= 1) {
    ctx.lineTo(175, canvas.height - 100);
    ctx.moveTo(125, canvas.height - 100);
    ctx.lineTo(125, 100);
    ctx.moveTo(123, 100);
    ctx.lineTo(250, 100);
    ctx.moveTo(250, 98);
    ctx.lineTo(250, 125);
    ctx.stroke();
  }
  ctx.beginPath();
  if (wrong >= 2) ctx.arc(250, 165, 40, 0, 2 * Math.PI);
  if (wrong
  >= 3) {
    ctx.moveTo(250, 165 + 40);
    ctx.lineTo(250, 305);
  }
  if (wrong
  >= 4) {
    ctx.moveTo(250, 225);
    ctx.lineTo(225, 275);
  }
  if (wrong
  >= 5) {
    ctx.moveTo(250, 225);
    ctx.lineTo(275, 275);
  }
  if (wrong
  >= 6) {
    ctx.moveTo(250, 305);
    ctx.lineTo(225, 355);
  }
  if (wrong
  >= 7) {
    ctx.moveTo(250, 305);
    ctx.lineTo(275, 355);
  }
  ctx.stroke();
}

function fetchWord() {
  return fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      return json;
    });
}

async function generateWord() {
  word = await fetchWord();
  if (guess.childNodes.length) guess.innerHTML = "";

  for (let i = 0; i < (await word[0].length); i++) {
    const div = document.createElement("div");
    div.id = i;
    guess.appendChild(div);
  }
}

function checkInput(input) {
  if (word[0].includes(input)) {
    word[0].split("").forEach((letter, i) => {
      if (letter !== input) return;
      guess.childNodes[i].innerText = letter;
    });
  } else {
    wrong += 1;
    generateMan();
    if (wrong >= 7) reset();
    return;
  }
}

function init() {
  generateWord().then(() => {
    initKeyboard();
  });
  generateMan();
}

function reset() {
  wrong = 0;
  generateWord().then(() => {
    resetKeys();
  });
  generateMan();
}

init();
