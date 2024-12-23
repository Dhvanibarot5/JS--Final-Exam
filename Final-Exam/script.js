const questions = [
  {
    type: "true/false",
    question: "JavaScript is a compiled programming language.",
    answer: "False",
    insight: "JavaScript is an interpreted language, meaning the code is executed line-by-line by the browser.",
  },
  {
    type: "true/false",
    question: "In JavaScript, null is an object.",
    answer: "True",
    insight: "This is a quirky behavior in JavaScript due to a bug in its early implementation. The typeof null returns object.",
  },
  {
    type: "true/false",
    question: "JavaScript is case-sensitive.",
    answer: "True",
    insight:
      "Variable names, function names, and keywords in JavaScript are case-sensitive. For example, myVar and myvar are treated as different variables.",
  },
  {
    type: "true/false",
    question: "Arrow functions can have a this binding.",
    answer: "False",
    insight: "Arrow functions do not have their own this. Instead, they inherit this from the enclosing context.",
  },
  {
    type: "true/false",
    question: "You can declare variables in JavaScript without using var, let, or const.",
    answer: "True",
    insight: "While this is possible, it creates a global variable, which is considered a bad practice. Always use var, let, or const.",
  },
  {
    type: "true/false",
    question: "NaN is equal to NaN.",
    answer: "False",
    insight: "In JavaScript, NaN (Not-a-Number) is not equal to itself. Use Number.isNaN() to check for NaN.",
  },
  {
    type: "true/false",
    question: "=== is the strict equality operator in JavaScript.",
    answer: "True",
    insight: "The === operator checks for equality without type conversion, making it stricter than ==.",
  },
  {
    type: "true/false",
    question: "JavaScript supports multiple inheritance.",
    answer: "False",
    insight:
      "JavaScript does not support multiple inheritance directly. However, you can achieve similar functionality through prototypes and mixins.",
  },
  {
    type: "true/false",
    question: "Functions are first-class citizens in JavaScript.",
    answer: "True",
    insight:
      "It is an interpreted language. Functions can be assigned to variables, passed as arguments, and returned from other functions, making them first-class citizens.",
  },
  {
    type: "true/false",
    question: "The let keyword allows you to declare a variable with block scope.",
    answer: "True",
    insight: "Unlike var, let variables are limited to the block in which they are declared.",
  },
];

let currentIndex = 0;
let score = 0;
const totalQuestions = questions.length;

const questionContainer = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const feedbackContainer = document.getElementById("feedback");
const scoreContainer = document.getElementById("score");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

function loadQuestion(index) {
  optionsContainer.innerHTML = "";
  feedbackContainer.textContent = "";

  const currentQuestion = questions[index];

  questionContainer.textContent = currentQuestion.question;

  if (currentQuestion.type === "multiple") {
    currentQuestion.options.forEach((option) => {
      const button = document.createElement("button");
      button.textContent = option;
      button.classList.add("option-button");
      button.addEventListener("click", () => handleAnswer(option, currentQuestion.answer, currentQuestion.insight, button));
      optionsContainer.appendChild(button);
    });
  } else if (currentQuestion.type === "true/false") {
    ["True", "False"].forEach((option) => {
      const button = document.createElement("button");
      button.textContent = option;
      button.classList.add("option-button");
      button.addEventListener("click", () => handleAnswer(option, currentQuestion.answer, currentQuestion.insight, button));
      optionsContainer.appendChild(button);
    });
  }

  prevBtn.disabled = index === 0;
  nextBtn.disabled = index === questions.length - 1;

  updateScore();
}

function handleAnswer(selected, correct, insight, button) {
  const buttons = optionsContainer.querySelectorAll("button");
  buttons.forEach((btn) => (btn.disabled = true));

  if (selected === correct) {
    score++;
    feedbackContainer.textContent = `Correct. ${insight}`;
    feedbackContainer.style.color = "green";
    button.style.backgroundColor = "#28a745";
  } else {
    feedbackContainer.textContent = `Incorrect. The correct answer is "${correct}". Here's why: ${insight}`;
    feedbackContainer.style.color = "red";
    button.style.backgroundColor = "#dc3545";
  }

  updateScore();
}

function updateScore() {
  scoreContainer.textContent = `Score: ${score} / ${totalQuestions}`;

  if (score === totalQuestions) {
    scoreContainer.style.color = "green";
    scoreContainer.textContent += " - Perfect Score!";
  } else if (score >= totalQuestions * 0.8) {
    scoreContainer.style.color = "gold";
    scoreContainer.textContent += " - Great job!";
  } else {
    scoreContainer.style.color = "red";
    scoreContainer.textContent += " - Keep practicing!";
  }
}

prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    loadQuestion(currentIndex);
  }
});

nextBtn.addEventListener("click", () => {
  if (currentIndex < questions.length - 1) {
    currentIndex++;
    loadQuestion(currentIndex);
  } else if (currentIndex === questions.length - 1) {
    questionContainer.textContent = "Quiz Completed!";
    optionsContainer.innerHTML = "";
    feedbackContainer.textContent = "";

    localStorage.setItem("quizScore", score);

    window.location.href = "results.html";
  }
});

loadQuestion(currentIndex);
