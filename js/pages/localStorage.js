// Select Element
let allSpans = document.querySelectorAll(".buttons span"),
  results = document.querySelector(".results > span"),
  mainInput = document.getElementById("mainInput");

// Click on spans
allSpans.forEach((span) => {
  span.addEventListener("click", function (e) {
    if (e.target.classList.contains("check-item")) {
      checkItem();
    }
    if (e.target.classList.contains("add-item")) {
      addItem();
    }
    if (e.target.classList.contains("delete-item")) {
      deleteItem();
    }
    if (e.target.classList.contains("show-items")) {
      showItems();
    }
  });
});

// Check Input Function
function showMessage() {
  results.innerHTML = "Input Can't be empty";
}

// Item Functions
function checkItem() {
  if (mainInput.value !== "") {
    if (localStorage.getItem(mainInput.value)) {
      results.innerHTML = `Found Local Storage Item Called <span>${mainInput.value}</span>`;
    } else {
      results.innerHTML = `No Local Storage Item Found with the name <span>${mainInput.value}</span>`;
    }
  } else {
    showMessage();
  }
}

function addItem() {
  if (mainInput.value !== "") {
    localStorage.setItem(mainInput.value, "Test");
    results.innerHTML = `The item <span>${mainInput.value}</span> has been added to local storage`;
    mainInput.value = "";
  } else {
    showMessage();
  }
}

function deleteItem() {
  if (mainInput.value !== "") {
    if (localStorage.getItem(mainInput.value)) {
      localStorage.removeItem(mainInput.value);
      results.innerHTML = `The local storage Item <span>${mainInput.value}</span> has been deleted`;
      mainInput.value = "";
    } else {
      results.innerHTML = `No Local Storage Item Found with the name <span>${mainInput.value}</span>`;
    }
  } else {
    showMessage();
  }
}

function showItems() {
  if (localStorage.length) {
    console.log(`found elements ${localStorage.length}`);
    results.innerHTML = "";
    for (let [key, value] of Object.entries(localStorage)) {
      results.innerHTML += `<span class="keys">${key}</span>`;
    }
  } else {
    results.innerHTML = `Local Storage is empty`;
  }
}
