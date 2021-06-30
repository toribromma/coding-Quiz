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
var next = carousel.querySelector(".next");
var prev = carousel.querySelector(".prev");
var index = 0;
var currentQuestion;
var currentAnswer;
var score = 0;
var endTime = false;

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
    title: "The condition in an if / else statement is enclosed within ____.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses",
  },
  {
    title: "The condition in an if / else statement is enclosed within ____.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses",
  },
  {
    title: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts",
  },
];

// function setFirstQuestion() {
//   titleDiv.textContent = questions[0].title;
//   choiceOneLabel.textContent = questions[0].choices[0];
//   choiceOneInput.setAttribute("value", questions[0].choices[0]);
//   choiceTwoLabel.textContent = questions[0].choices[1];
//   choiceTwoInput.setAttribute("value", questions[0].choices[1]);
//   choiceThreeLabel.textContent = questions[0].choices[2];
//   choiceThreeInput.setAttribute("value", questions[0].choices[2]);
//   choiceFourLabel.textContent = questions[0].choices[3];
//   choiceFourInput.setAttribute("value", questions[0].choices[3]);
// }

var themeSwitcher = document.querySelector("#theme-switcher");
var container = document.querySelector(".container");
var mode = "dark";

themeSwitcher.addEventListener("click", function () {
  if (mode === "dark") {
    mode = "light";
    container.setAttribute("class", "light");
  } else {
    mode = "dark";
    container.setAttribute("class", "dark");
  }
});

function gameOver() {
  timeEl.textContent = " ";
  mainEl.textContent = "Game Over!!!";
  carousel.setAttribute("style", "display:none;");
  endTime = true;
}

function checkAnswer(event, answers) {
  next.setAttribute("style", "display: block;")
  event.preventDefault();

  var choices = [
    choiceOneInput,
    choiceTwoInput,
    choiceThreeInput,
    choiceFourInput,
  ];
  console.log(choices);

  var answers = [];
  questions.forEach((element) => {
    answers.push(element.answer);
  });
  console.log(answers);

  for (let index = 0; index < choices.length; index++) {
    const choice = choices[index];
    // console.log(choice.checked);
    // console.log(choice.value);
    // console.log(answers);
    // if (answers.indexOf(choice) === -1 && choice.checked === true) {
    //   score = score - 15;
    //   console.log(score);
    // }

    if (choice.checked === true && answers.indexOf(choice.value) != -1) {
      score = score + 15;
      console.log(score);
    } else if (
      choice.checked === true &&
      answers.indexOf(choice.value) === -1
    ) {
      score = score - 15;
      console.log(score);
    }



    // if (choice.checked = true && choice.value !== currentAnswer ) {
    //   score = score - 5;
    //   console.log(score);
    // }

    // checkAnswer(currentAnswer, choices)
  }

  submitButton.setAttribute("style", "display: none;")  
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
  event.stopPropagation();
  submitButton.setAttribute("style", "display: block;")
  next.setAttribute("style", "display: none;")

  navigate(1);
};

function startQuiz() {
  // Create the countdown timer.
  // setFirstQuestion();
  
  next.setAttribute("style", "display: none;");
  
  navigate(0);
  console.log("hi");
  endTime = false;
  mainEl.textContent = "";
  var totalTime = 75;

  var timerInterval = setInterval(function () {
    totalTime--;
    timeEl.textContent = totalTime + " seconds left for quiz.";
    carousel.setAttribute("style", "display:block;");
    if (totalTime === 0 || endTime === true) {
      clearInterval(timerInterval);
      gameOver();
    }
  }, 1000);

}

submitButton.addEventListener("click", checkAnswer);
