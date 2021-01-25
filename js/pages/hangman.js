// Letters
const letters = "abcdefghijklmnopqrstuvwxyz";

let lettersArray = Array.from(letters),
  lettersContainer = document.querySelector(".letters");

lettersArray.forEach((letter) => {
  let spanEl = document.createElement("span"),
    letterText = document.createTextNode(letter);
  spanEl.appendChild(letterText);
  spanEl.className = "letter-box";

  lettersContainer.appendChild(spanEl);
});

// Object of words
const words = {
  programming: [
    "php",
    "javascript",
    "scala",
    "fortran",
    "r",
    "mysql",
    "python",
  ],
  movies: [
    "Prestige",
    "Inception",
    "Parasite",
    "Interstellar",
    "Whiplash",
    "Memento",
    "Coco",
    "Up",
  ],
  people: [
    "Albert Einstein",
    "Hitchcock",
    "Alexander",
    "Cleopatra",
    "Mahatma Ghandi",
  ],
  countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"],
};

// Get Random property Keys and Values
let allKeys = Object.keys(words),
  randomKeyNumber = Math.floor(Math.random() * allKeys.length),
  randomKeyName = allKeys[randomKeyNumber],
  randomKeyValue = words[randomKeyName],
  randomValueNumber = Math.floor(Math.random() * randomKeyValue.length),
  randomValueName = randomKeyValue[randomValueNumber];

document.querySelector(".game-info .category span").innerHTML = randomKeyName;

// Guessed Letters Container
let guessedLetters = document.querySelector(".guessed-letters"),
  lettersAndSpace = Array.from(randomValueName);

lettersAndSpace.forEach((letter) => {
  // Create empty span
  let emptySpan = document.createElement("span");

  //? If letter is space
  if (letter == " ") {
    emptySpan.className = "has-space";
  }

  guessedLetters.appendChild(emptySpan);
});

// The Hngman Draw
let theDraw = document.querySelector(".hangman-draw"),
  wrongAttempts = 0;

// Handle Clcking on Letters
let guessSpans = document.querySelectorAll(".guessed-letters span"),
  chosenLettersArray = [];

document.addEventListener("click", (e) => {
  let guessStatus = false;
  if (e.target.className === "letter-box") {
    // Get clicked letter
    let theClickedLetter = e.target.innerHTML.toLowerCase(),
      chosenWord = Array.from(randomValueName.toLowerCase());

    e.target.classList.add("clicked");

    //? Check if the clicked letter matches the chosen one
    chosenWord.forEach((wordLetter, wordIndex) => {
      if (theClickedLetter == wordLetter) {
        guessStatus = true;
        chosenLettersArray.push(wordLetter);

        guessSpans.forEach((span, spanIndex) => {
          if (wordIndex === spanIndex) {
            span.innerHTML = theClickedLetter;
          }
        });
      }
    });
    // Win Game
    if (chosenLettersArray.length == chosenWord.length) {
      Swal.fire({
        icon: "success",
        text: `You guessed it right`,
        confirmButtonText: "Play again?",
      }).then(function () {
        location.reload();
      });
      document.getElementById("success").play();
    }

    //? If letter is wrong Increase wrong attempts
    if (guessStatus !== true) {
      wrongAttempts++;

      theDraw.classList.add(`wrong-${wrongAttempts}`);

      let manHead = document.querySelector(".head"),
        crowedComment = document.querySelector(".crowd");

      if (wrongAttempts == 5) {
        crowedComment.classList.add("angryOne");
      }

      if (wrongAttempts == 6) {
        manHead.classList.remove("scared");
        manHead.classList.add("crying");
        crowedComment.classList.add("angryTwo");
      }

      if (wrongAttempts == 7) {
        manHead.classList.remove("crying");
        manHead.classList.add("died");
        crowedComment.classList.add("angryThree");
      }

      if (wrongAttempts == 8) {
        endGame();
        lettersContainer.classList.add("finished");
      }

      document.getElementById("fail").play();
    } else {
      document.getElementById("success").play();
    }
  }
});

// End game function
function endGame() {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: `Game Over, the word is ${randomValueName}`,
    confirmButtonText: "Play again?",
  }).then(function () {
    location.reload();
  });
  document.getElementById("timesUp").play();
}
