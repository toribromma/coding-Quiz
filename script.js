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

    // console.log(tableDiv);
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

var questions = [
  {
    title: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts",
  },
  {
    title: "The condition in an if / else statement is enclosed within ____.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses",
  },
  {
    title: "What is the capital of California?",
    choices: ["Sacramento", "San Francisco", "Los Angeles", "Stockton"],
    answer: "Sacramento",
  },
  {
    title: "What does console.log('2' + '2') show?",
    choices: ["2", "22", "222", "4"],
    answer: "22",
  },
  {
    title: "Which one of these is not an element",
    choices: ["div", "heading", "img", "var"],
    answer: "var",
  },
];

var themeSwitcher = document.querySelector("#theme-switcher");
var container = document.querySelector(".container");
var mode = "dark";

// var startingMode = JSON.parse(localStorage.getItem("mode"));
// console.log(startingMode);
// container.setAttribute("class", startingMode);

// let positionOfSwitcher = document.getElementById("theme-switcher");
// let positionOfSlider = document.getElementsByTagName("slider round");
// console.log(positionOfSlider)

// if (mode === "light") {
// positionOfSwitcher.setAttribute("checked", true);
// positionOfSlider.style.transform = "translateX(26px)"
// console.log("hi");
// } else {
// positionOfSwitcher.setAttribute("checked", false);
// positionOfSlider.style.transform = "translateX(-26px)"

// }

var choices = [
  choiceOneInput,
  choiceTwoInput,
  choiceThreeInput,
  choiceFourInput,
];

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

function checkAnswer(event, answers) {
  event.preventDefault();
  if (
    choices[0].checked === false &&
    choices[1].checked === false &&
    choices[2].checked === false &&
    choices[3].checked === false
  ) {
    return null;
  }

  next.setAttribute("style", "display: block;");

  var answers = [];
  questions.forEach((element) => {
    answers.push(element.answer);
  });

  for (let index = 0; index < choices.length; index++) {
    const choice = choices[index];

    if (choice.checked === true && answers.indexOf(choice.value) != -1) {
      score = score + 15;
      choice.nextElementSibling.setAttribute(
        "style",
        "background-color: green;"
      );
    } else if (
      choice.checked === true &&
      answers.indexOf(choice.value) === -1
    ) {
      totalTime = totalTime - 15;
      choice.nextElementSibling.setAttribute("style", "background-color: red;");
    }
  }

  submitButton.setAttribute("style", "display: none;");
}

function navigate(direction) {
  index = index + direction;
  if (index > questions.length - 1) {
    gameOver();
    index = 0;
  }

  currentQuestion = questions[index];
  titleDiv.textContent = currentQuestion.title;
  choiceOneLabel.textContent = currentQuestion.choices[0];
  choiceOneInput.setAttribute("value", currentQuestion.choices[0]);
  choiceTwoLabel.textContent = currentQuestion.choices[1];
  choiceTwoInput.setAttribute("value", currentQuestion.choices[1]);
  choiceThreeLabel.textContent = currentQuestion.choices[2];
  choiceThreeInput.setAttribute("value", currentQuestion.choices[2]);
  choiceFourLabel.textContent = currentQuestion.choices[3];
  choiceFourInput.setAttribute("value", currentQuestion.choices[3]);
}

next.onclick = function (event) {
  event.preventDefault();

  choices.forEach((choice) => {
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
totalTime = 75;
  next.setAttribute("style", "display: none;");
  start.setAttribute("style", "display: none;");

  score = 0;
  navigate(0);
  extraTime = 0;
  totalScore = null;
  endTime = false;
  mainEl.textContent = "";

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
