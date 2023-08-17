var timeEl = document.querySelector(".time");
var mainEl = document.getElementById("main");
var titleDiv = document.getElementById("title");
var choiceOneLabel = document.getElementById("choice-1");
var choiceTwoLabel = document.getElementById("choice-2");
var choiceThreeLabel = document.getElementById("choice-3");
var choiceFourLabel = document.getElementById("choice-4");
var choiceThreeInput = document.getElementById("choice-3-input");
var choiceTwoInput = document.getElementById("choice-2-input");
var choiceOneInput = document.getElementById("choice-1-input");
var choiceFourInput = document.getElementById("choice-4-input");
var submitButton = document.getElementById("submit");
var carousel = document.querySelector(".carouselbox");
var modalEl = document.querySelector("#modal-container");
var modalElTwo = document.querySelector("#modal-container-2");
var table = document.querySelector("#table");
var scoreEl = document.querySelector("#score");
var closeEl = document.querySelector(".close");
var closeElTwo = document.querySelector(".close2");
var saveBtn = document.querySelector("#save");
var next = carousel.querySelector(".next");
var prev = carousel.querySelector(".prev");
var nameInput = document.getElementById("name");
var viewButton = document.getElementById("view");
var start = document.getElementById("start");
var index = 0;
var currentQuestion;
var currentAnswer;
var score = 0;
var endTime = false;
var totalScore = null;
var extraTime = 0;
var totalTime = 75;

//questions object are placed in this array for reference
let questionsArray = [];

//correct answers are checked against checked answers to see if true
let correctAnswersArray = [];

var choicesInput = [
  choiceOneInput,
  choiceTwoInput,
  choiceThreeInput,
  choiceFourInput,
];

var choicesLabel = [
  choiceOneLabel,
  choiceTwoLabel,
  choiceThreeLabel,
  choiceFourLabel,
];

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

async function fetchQuestions(url) {
  try {
    // fetching questions from api
    response = await fetch(url);
    const data = await response.json();
    let questions = data.results;

    questions.forEach((question) => {
      let questionObject = {
        correct: String,
        incorrect: Array,
        question: String,
      };

      questionObject.correct = question.correct_answer;
      questionObject.incorrect = question.incorrect_answers;
      questionObject.question = question.question;

      questionsArray.push(questionObject);
      correctAnswersArray.push(questionObject.correct);
    });
  } catch (err) {
    console.log(err);
  }
}

fetchQuestions(
  "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple"
);

function showHighScores() {
  var highScores = JSON.parse(localStorage.getItem("scores"));

  if (!highScores) {
    return null;
  } else {
    highScores = highScores.sort(function (a, b) {
      return parseFloat(b.score) - parseFloat(a.score);
    });

    var thArray = ["name", "score"];
    var tableDiv = document.createElement("table");
    var trDivOne = document.createElement("tr");

    for (let index = 0; index < thArray.length; index++) {
      const th = thArray[index];
      var thDiv = document.createElement("td");
      thDiv.textContent = th;
      trDivOne.appendChild(thDiv);
    }

    tableDiv.append(trDivOne);
    //need to make it for less than 3
    for (let index = 0; index < highScores.length; index++) {
      const name = highScores[index].name;
      const score = highScores[index].score;

      var tdDiv = document.createElement("td");
      var tdDiv2 = document.createElement("td");
      var trDivTwo = document.createElement("tr");

      tdDiv.textContent = name;
      tdDiv2.textContent = score;

      trDivTwo.appendChild(tdDiv);
      trDivTwo.appendChild(tdDiv2);
      tableDiv.append(trDivTwo);
    }

    table.textContent = "";
    table.appendChild(tableDiv);
  }
}

showHighScores();

function close(event) {
  modalEl.style.display = "none";
}

function close2(event) {
  modalElTwo.style.display = "none";
}

closeEl.addEventListener("click", close);
closeElTwo.addEventListener("click", close2);

viewButton.addEventListener("click", function (event) {
  event.preventDefault();

  modalElTwo.setAttribute("style", "display: block;");
});

var themeSwitcher = document.querySelector("#theme-switcher");
var container = document.querySelector(".container");
var mode = "dark";

themeSwitcher.addEventListener("click", function () {
  if (mode === "dark") {
    mode = "light";
    container.setAttribute("class", "light");
    // localStorage.setItem("mode", JSON.stringify("light"));
  } else {
    mode = "dark";
    container.setAttribute("class", "dark");
    // localStorage.setItem("mode", JSON.stringify("dark"));
  }
});

async function gameOver() {
  start.setAttribute("style", "display: block;");
  timeEl.textContent = " ";
  mainEl.textContent = "Game Over!!!";
  carousel.setAttribute("style", "display:none;");
  endTime = true;
  modalEl.style.display = "block";
  if (totalScore === null) {
    scoreEl.textContent = "Calculating Score...";
  } else {
    scoreEl.textContent = "Your score is " + totalScore + "!";
  }
}

saveBtn.addEventListener("click", function (event) {
  event.preventDefault();

  var name = nameInput;
  var player = {
    name: name.value.trim(),
    score: totalScore,
  };

  var getHighScores = JSON.parse(localStorage.getItem("scores"));

  if (getHighScores) {
    getHighScores.push(player);
    localStorage.setItem("scores", JSON.stringify(getHighScores));
  } else {
    var highScoresArray = [];
    highScoresArray.push(player);
    localStorage.setItem("scores", JSON.stringify(highScoresArray));
  }
  showHighScores();
  close();
});

function checkAnswer(event, answer) {
  event.preventDefault();
  if (
    choicesInput[0].checked === false &&
    choicesInput[1].checked === false &&
    choicesInput[2].checked === false &&
    choicesInput[3].checked === false
  )
    return false;

  next.setAttribute("style", "display: block;");

  choicesInput.forEach((choice) => {
    if (
      choice.checked === true &&
      correctAnswersArray.indexOf(choice.value) != -1
    ) {
      score = score + 15;
      choice.nextElementSibling.setAttribute(
        "style",
        "background-color: green;"
      );
    } else if (
      choice.checked === true &&
      correctAnswersArray.indexOf(choice.value) === -1
    ) {
      totalTime = totalTime - 15;
      choice.nextElementSibling.setAttribute("style", "background-color: red;");
    }
  });

  submitButton.setAttribute("style", "display: none;");
}

function navigate(direction) {
  index = index + direction;

  if (index > questionsArray.length - 1) {
    gameOver();
    index = 0;
  }

  currentQuestion = questionsArray[index];

  let choices = [...currentQuestion.incorrect, currentQuestion.correct];
  shuffle(choices)

  titleDiv.textContent = currentQuestion.question;

  // setting local choices to html page

  choices.forEach((choice, index) => {
    choicesLabel[index].innerText = choice;
    choicesInput[index].setAttribute("value", choice);
  });
}

next.onclick = function (event) {
  event.preventDefault();

  choicesInput.forEach((choice) => {
    choice.nextElementSibling.setAttribute(
      "style",
      "background-color: none; color: white;"
    );
  });

  submitButton.setAttribute("style", "display: block;");
  next.setAttribute("style", "display: none;");

  navigate(1);
};

function startQuiz() {
  //close all modals and clear all variables before starting to navigate through
  close();
  close2();
  totalTime = 75;
  next.setAttribute("style", "display: none;");
  start.setAttribute("style", "display: none;");

  score = 0;
  extraTime = 0;
  totalScore = null;
  endTime = false;
  mainEl.textContent = "";
  navigate(0);

  var timerInterval = setInterval(function () {
    totalTime--;
    timeEl.textContent = "Time: " + totalTime;
    carousel.setAttribute("style", "display:block;");
    if (totalTime <= 0 || endTime === true) {
      clearInterval(timerInterval);
      if (totalTime < 0) {
        extraTime === 0;
      } else {
        extraTime = totalTime;
      }

      totalScore = parseInt(extraTime + score);
      gameOver();
    }
  }, 1000);
}

submitButton.addEventListener("click", checkAnswer);
