// let emptyArray = [],
//   butt = document.getElementById("butt"),
//   buttElement = document.getElementById("buttElement"),
//   buttInput = document.getElementById("buttInput");

// butt.onclick = function () {
//   if (!emptyArray.includes(buttInput.value)) {
//     emptyArray.push(buttInput.value);
//     display();
//     console.log(emptyArray);
//   } else {
//     Swal.fire({
//       icon: "error",
//       title: "Oops...",
//       text: "This task is already exists",
//     });
//   }
// };

// function display() {
//   emptyArray.forEach((element) => {
//     buttElement.innerHTML += `
//     <p>${element}</p>
//     `;
//   });
// }

let emptyArray = new Set(),
  butt = document.getElementById("butt"),
  buttElement = document.getElementById("buttElement"),
  buttInput = document.getElementById("buttInput");

butt.onclick = function () {
  if (!emptyArray.has(buttInput.value)) {
    emptyArray.add(buttInput.value);
    display();
    console.log(emptyArray);
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "This task is already exists",
    });
  }
};

function display() {
  buttElement.innerHTML = "";
  emptyArray.forEach((element) => {
    buttElement.innerHTML += `
    <p>${element}</p>
    `;
  });
}

let mainSpan = document.createElement("span"),
  deleteButton = document.createElement("span"),
  taskName = document.createTextNode(element),
  deleteText = document.createTextNode("Delete");

mainSpan.appendChild(taskName);
mainSpan.className = "task-box";

deleteButton.appendChild(deleteText);
deleteButton.className = "delete";

mainSpan.appendChild(deleteButton);

tasksContainer.appendChild(mainSpan);
