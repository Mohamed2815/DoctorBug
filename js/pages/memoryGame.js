// Splash Screen
let startButton = document.querySelector(".splash-screen span"),
  splashScreen = document.querySelector(".splash-screen");
startButton.onclick = function () {
  showAlert();
  splashScreen.remove();
};

function showAlert() {
  Swal.fire({
    title: "What is your name?",
    input: "text",
    inputAttributes: {
      autocapitalize: "off",
    },
    showCancelButton: true,
    confirmButtonText: "Ok",
    showLoaderOnConfirm: false,
    allowOutsideClick: () => !Swal.isLoading(),
  });

  let yourName = document.querySelector(".swal2-input"),
    confirmButton = document.querySelector(".swal2-confirm"),
    alertContainer = document.querySelector(".swal2-container"),
    nameField = document.querySelector(".name span");

  if (yourName.value == null || yourName.value == "" || yourName.value == " ") {
    nameField.innerHTML = "Unknown";
  }

  confirmButton.onclick = function () {
    nameField.innerHTML = yourName.value;
    alertContainer.remove();
    document.body.setAttribute("class", "");
    if (nameField.innerHTML == "" || yourName.value == " ") {
      nameField.innerHTML = "Unknown";
    }
    // Local Storage
    localStorage.setItem("playerName", nameField.textContent);
  };
}

// Start Variables
let duration = 1000;
const blocksContainer = document.querySelector(".memory-game-blocks");
let blocks = Array.from(blocksContainer.children);

let orderRange = [...Array(blocks.length).keys()];

shuffle(orderRange);

blocks.forEach((block, index) => {
  block.style.order = orderRange[index];

  block.addEventListener("click", function () {
    flipCard(block);
  });
});

// Add is-filpped class on elements
function flipCard(selectedCard) {
  selectedCard.classList.add("is-flipped");

  let allFlippedBlocks = blocks.filter((flippedBlock) =>
    flippedBlock.classList.contains("is-flipped")
  );

  if (allFlippedBlocks.length === 2) {
    stopClicking();
    checkMathcedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}

// Stop Clicking function
function stopClicking() {
  blocksContainer.classList.add("no-clicking");

  setTimeout(() => {
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}

// Check Mathced Block
function checkMathcedBlocks(firstCard, secondCard) {
  let triesElement = document.querySelector(".tries span");

  if (firstCard.dataset.technology === secondCard.dataset.technology) {
    firstCard.classList.remove("is-flipped");
    secondCard.classList.remove("is-flipped");

    firstCard.classList.add("has-matched");
    secondCard.classList.add("has-matched");

    document.getElementById("success").play();
    successMessage();
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

    localStorage.setItem("savedTries", triesElement.textContent);

    setTimeout(() => {
      firstCard.classList.remove("is-flipped");
      secondCard.classList.remove("is-flipped");
    }, duration);

    setTimeout(() => {
      document.getElementById("fail").play();
    }, 500);
  }
}

// Success Message
function successMessage() {
  let allCards = blocks.filter((card) =>
    card.classList.contains("has-matched")
  );

  if (allCards.length === 20) {
    Swal.fire({
      icon: "success",
      title: "Congratulations",
      text: "Your memory is good",
      confirmButtonText: "Play Again!",
      allowOutsideClick: false,
    });
  }
}

// Counter Down & Time is up message
startButton.addEventListener("click", function () {
  const startingMinutes = 1.5;
  let timeWithSeconds = startingMinutes * 60;

  const countdownEl = document.querySelector(".time span");

  let countDown = setInterval(function () {
    "use strict";
    updateCountDown();
  }, 1000);

  function updateCountDown() {
    "use strict";
    const minutes = Math.floor(timeWithSeconds / 60);
    let seconds = timeWithSeconds % 60;

    seconds = seconds < 10 ? "0" + seconds : seconds;

    countdownEl.textContent = `${minutes}:${seconds}`;

    if (timeWithSeconds > 0) {
      timeWithSeconds--;
    } else {
      clearInterval(countDown);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Time is up",
        confirmButtonText: "Try Again!",
        allowOutsideClick: false,
      });
      let retryButton = document.querySelector(".swal2-confirm");
      retryButton.onclick = function () {
        window.location.reload();
      };
      document.querySelector(".memory-game-blocks").style.pointerEvents =
        "none";
      document.getElementById("timeUp").play();
    }
  }
});

// Shuffle Function
function shuffle(array) {
  let current = array.length,
    temp,
    random;

  while (current > 0) {
    // Get Random Number
    random = Math.floor(Math.random() * current);

    // Decrease Length by one
    current--;

    // Save elements in stash
    temp = array[current];

    // Current element = Random Element
    array[current] = array[random];

    // Ger element from stash
    array[random] = temp;
  }
  return array;
}

// Start Player Boared
let lastPlayer = document.querySelector(".name span"),
  triesNumber = document.querySelector(".tries span");

let playersBoared = document.querySelector(".players-boared"),
  playersInfo = document.createElement("div");

playersInfo.setAttribute("class", "info");

playersInfo.innerHTML = `
    <div class="playerName">Last player: <span>${localStorage.getItem(
      "playerName"
    )}</span></div>
    <div class="triesNumber">Tries: ${localStorage.getItem("savedTries")}</div>
  `;

playersBoared.appendChild(playersInfo);
