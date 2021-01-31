// Select Elements
let questionsNumber = document.querySelector(".count span"),
  bulletsContainer = document.querySelector(".spans"),
  quizArea = document.querySelector(".quiz-area");
(answersArea = document.querySelector(".answers-area")), (currentIndex = 0);

// Get Questions form Json Object
function getQuestions() {
  let request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let questionsObject = JSON.parse(this.responseText),
        qCount = questionsObject.length;

      createBullets(qCount);
      addQuestionData(questionsObject[currentIndex], qCount);
    }
  };
  request.open("GET", "questions.json", true);
  request.send();
}
getQuestions();

// Create Bullets
function createBullets(num) {
  questionsNumber.innerHTML = num;

  for (let i = 0; i < num; i++) {
    let bullet = document.createElement("span");
    if (i === 0) {
      bullet.className = "on";
    }
    bulletsContainer.appendChild(bullet);
  }
}

// Add questions and answers function
function addQuestionData(obj, count) {
  let questionTitle = document.createElement("h2"),
    questionText = document.createTextNode(obj.title);

  questionTitle.appendChild(questionText);
  quizArea.appendChild(questionTitle);

  // Create the answers
  for (let i = 1; i <= 4; i++) {
    let answerDiv = document.createElement("div"),
      radioInput = document.createElement("input"),
      label = document.createElement("label"),
      labelText = document.createTextNode(obj[`answer_${i}`]);

    answerDiv.className = "answer";

    // Add type + name + id + data attribute
    radioInput.name = "question";
    radioInput.type = "radio";
    radioInput.id = `answer_${i}`;
    radioInput.dataset.answer = obj[`answer_${i}`];

    if (i === 1) {
      radioInput.checked = true;
    }

    // Label Element
    label.htmlFor = `answer_${i}`;
    label.appendChild(labelText);

    answerDiv.appendChild(radioInput);
    answerDiv.appendChild(label);

    answersArea.appendChild(answerDiv);
  }
}
