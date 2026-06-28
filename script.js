const meows = new Map();
const buttons = Array.from(document.querySelectorAll(".meow-button"));
const statusLabel = document.querySelector("#status");
const catStage = document.querySelector(".cat-stage");

for (let index = 1; index <= 9; index += 1) {
  const audio = new Audio(`assets/audio/meow${index}.wav`);
  audio.preload = "auto";
  meows.set(String(index), audio);
}

function setStatus(text) {
  statusLabel.textContent = text;
}

function pulse(button) {
  button.classList.add("is-active");
  catStage.classList.add("is-playing");

  window.setTimeout(() => {
    button.classList.remove("is-active");
    catStage.classList.remove("is-playing");
  }, 210);
}

function playMeow(number) {
  const audio = meows.get(String(number));
  const button = document.querySelector(`[data-meow="${number}"]`);

  if (!audio || !button) {
    return;
  }

  audio.pause();
  audio.currentTime = 0;
  setStatus(`Meow ${number} hra`);
  pulse(button);

  audio.play()
    .catch(() => {
      setStatus(`Meow ${number} pripraveny`);
    });
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    playMeow(button.dataset.meow);
  });
});

window.addEventListener("keydown", (event) => {
  if (event.repeat) {
    return;
  }

  if (/^[1-9]$/.test(event.key)) {
    playMeow(event.key);
  }
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  });
}
