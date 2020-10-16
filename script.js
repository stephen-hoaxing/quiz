import { getNextQuestion } from "./questions.js";
import { convertNumberToLetter } from "./utils.js";

let currentQuestion;
let selectedAnswer;
let selectedAnswerIndex;
let questionCount = 0;

const quizContainer = document.querySelector(".quiz-container");
const answerContainer = document.querySelector(".answer-container");
const question = document.querySelector(".question");
const stopBtn = document.querySelector(".stop");
const nextBtn = document.querySelector(".next");

nextBtn.addEventListener("click", onNextQuestion);

async function renderQuiz() {
  nextBtn.classList.add("disabled");
  clearAnswers();
  currentQuestion = await getNextQuestion(questionCount);
  question.innerText = currentQuestion.question;

  currentQuestion.answers.forEach((answer, index) => {
    const answerBtn = document.createElement("button");
    answerBtn.dataset.correct = answer.correct;
    answerBtn.dataset.index = index;
    answerBtn.innerText = `${convertNumberToLetter(index)}: ${answer[index]}`;
    answerBtn.classList.add("answer");
    answerBtn.addEventListener("click", onSelectAnswer);
    answerContainer.appendChild(answerBtn);
  });
}

function onSelectAnswer(e) {
  selectedAnswer = e.target;
  selectedAnswer.classList.add("selected");
  selectedAnswerIndex = e.target.dataset.index;
  const answerBtns = document.querySelectorAll(".answer");
  answerBtns.forEach((btn) => {
    if (btn.dataset.index !== selectedAnswerIndex) {
      btn.classList.add("disabled");
    }
  });
  if (selectedAnswer.dataset.correct === "true") {
    setTimeout(() => {
      selectedAnswer.classList.add("blink");
      nextBtn.classList.remove("disabled");
    }, 1000);
  } else {
    answerBtns.forEach((btn) => {
      if (btn.dataset.correct === "true") {
        setTimeout(() => {
          btn.classList.add("blink");
        }, 1000);
      }
    });
  }
}

function clearAnswers() {
  while (answerContainer.firstChild) {
    answerContainer.removeChild(answerContainer.firstChild);
  }
}

function clearAll() {
  while (quizContainer.firstChild) {
    quizContainer.removeChild(quizContainer.firstChild);
  }
}

function displayCongrats() {
  const congrats = document.createElement("h1");
  congrats.innerText = "Congrats";
  congrats.classList.add("congrats");
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.appendChild(congrats);
  quizContainer.appendChild(modal);
}

function onNextQuestion(e) {
  questionCount++;
  if (questionCount < 6) {
    clearAnswers();
    renderQuiz();
  } else {
    nextBtn.classList.add("disabled");
    clearAll();
    displayCongrats();
  }
}

renderQuiz();
