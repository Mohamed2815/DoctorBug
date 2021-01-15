// Get Slider Items
let silderImages = Array.from(
    document.querySelectorAll(".slider-container img")
  ),
  slidesCount = silderImages.length,
  currentSlide = 1,
  slideNumberElement = document.getElementById("slide-number"),
  nextButton = document.getElementById("next"),
  previousButton = document.getElementById("prev");

// Handle Click on previous and next Buttons
nextButton.onclick = slideNext;
previousButton.onclick = slidePrevious;

// Create The main Ul and Li Elements
let indicatorsElements = document.createElement("ul");
indicatorsElements.setAttribute("id", "indicatorsUl");

for (let i = 1; i <= slidesCount; i++) {
  let indicatorsItem = document.createElement("li");
  indicatorsItem.setAttribute("data-slide", i);
  indicatorsItem.appendChild(document.createTextNode(i));
  indicatorsElements.appendChild(indicatorsItem);
}

document.getElementById("indicators").appendChild(indicatorsElements);

// Get the new created Ul
let indicatorsUl = document.getElementById("indicatorsUl"),
  indicatorsBullets = Array.from(document.querySelectorAll("#indicatorsUl li"));

// Loop through all bullets items
for (let i = 0; i < indicatorsBullets.length; i++) {
  indicatorsBullets[i].onclick = function () {
    currentSlide = parseInt(this.getAttribute("data-slide"));
    checker();
  };
}

// Trigger Checker Function
checker();

// Next Slide Function
function slideNext() {
  if (nextButton.classList.contains("disabled")) {
    return false;
  } else {
    currentSlide++;
    checker();
  }
}

// Previous Slide Function
function slidePrevious() {
  if (previousButton.classList.contains("disabled")) {
    return false;
  } else {
    currentSlide--;
    checker();
  }
}

setInterval(function () {
  if (currentSlide < slidesCount) {
    currentSlide++;
  } else if (currentSlide == slidesCount) {
    clearInterval;
    currentSlide = 1;
  }
  checker();
}, 5000);

// Checker function
function checker() {
  // Set the number
  slideNumberElement.textContent =
    "slide #" + currentSlide + " of " + slidesCount;

  // Remove All active classes
  removeAllActive();

  // Set Active Class on Images
  silderImages[currentSlide - 1].classList.add("active");

  // Set Active Class on indicators
  indicatorsUl.children[currentSlide - 1].classList.add("active");

  // Add or remove class disabled on buttons
  if (currentSlide == 1) {
    previousButton.classList.add("disabled");
  } else {
    previousButton.classList.remove("disabled");
  }

  if (currentSlide == slidesCount) {
    nextButton.classList.add("disabled");
  } else {
    nextButton.classList.remove("disabled");
  }
}

// Remove All Active Classes from igmaes and indicators
function removeAllActive() {
  silderImages.forEach(function (img) {
    img.classList.remove("active");
  });

  indicatorsBullets.forEach(function (bullet) {
    bullet.classList.remove("active");
  });
}
