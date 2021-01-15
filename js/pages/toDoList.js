/* 
Task 1 : Add sweet alert if input is empty 	✓
Task 2 : Check if task is already exists ✓
Task 3 : Create Delete All Tasks
Task 4 : Create All finish Tasks button
Task 5 : Add Tasks to local storage
*/

// Setting up variables
const mainInput = document.querySelector(".add-task input"),
  addButton = document.querySelector(".add-task span");

let tasksContainer = document.querySelector(".tasks-content"),
  tasksCount = document.querySelector(".tasks-count span"),
  tasksCompleted = document.querySelector(".tasks-compeleted span");

window.onload = function () {
  mainInput.focus();
};

// Check If Task Exists
let mainSet = new Set();
addButton.onclick = function () {
  if (mainInput.value === "") {
    Swal.fire({
      icon: "info",
      title: "No task found",
      text: "Please type your task before submit",
    });
  } else {
    let noTaskMsg = document.querySelector(".no-tasks-message");

    if (document.body.contains(document.querySelector(".no-tasks-message"))) {
      noTaskMsg.remove();
    }
  }
  if (!mainSet.has(mainInput.value) && !mainInput.value == "") {
    mainSet.add(mainInput.value);
    display();
    mainInput.value = "";
    mainInput.focus();

    calculateTasks();
    console.log(mainSet);
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "This task is already exists",
    });
  }
};

function display() {
  tasksContainer.innerHTML = ""; // 1
  mainSet.forEach((element) => {
    tasksContainer.innerHTML += `
    <span class="task-box">${element}<span class="delete">Delete</span></span>
    `;
  });
}
// Delete Buttons
let deleteAll = document.getElementById("deleteAll"),
  deleteFinished = document.getElementById("deleteFinished");

document.addEventListener("click", function (e) {
  if (e.target.className == "delete") {
    e.target.parentElement.remove();
    mainSet.delete(e.target.previousSibling); // 2

    if (tasksContainer.childElementCount == 0) {
      noTaskMessage();
    }
    calculateTasks();
  }

  if (e.target.classList.contains("task-box")) {
    e.target.classList.toggle("finished");
    calculateTasks();
  }

  if (e.target.id == "deleteAll") {
    mainSet.clear();
    tasksContainer.innerHTML = `<span class="no-tasks-message">No tasks to show</span>`;
  }
  if (e.target.id == "deleteFinished") {
    filterTasks(); // 3
  }
});

let tasksParent = document.querySelector(".tasks-content");
function filterTasks() {
  let finishedTasks = Array.from(tasksParent.children);
  console.log(finishedTasks);

  let tasks = finishedTasks.filter((element) => {
    element.classList.contains("finished");
  });
  console.log(tasks);
}

// Function to create to tasks message
function noTaskMessage() {
  let msgSpan = document.createElement("span"),
    msgText = document.createTextNode("No tasks to show");

  msgSpan.appendChild(msgText);
  msgSpan.className = "no-tasks-message";
  tasksContainer.appendChild(msgSpan);
}

// Function To calculate Tasks
function calculateTasks() {
  // Calculate All tasks
  tasksCount.innerHTML = document.querySelectorAll(
    ".tasks-content .task-box"
  ).length;

  tasksCompleted.innerHTML = document.querySelectorAll(
    ".tasks-content .finished"
  ).length;
}
