import Question from "./question.js";

let questions = [];

async function loadQuestions() {
  const data = await fetch("./data.json");
  const json = await data.json();
  json.questions.forEach((q) =>
    questions.push(new Question(q.question, [...q.answers]))
  );
}

export async function getNextQuestion(index) {
  if (questions.length === 0) {
    await loadQuestions();
  }
  return questions[index];
}

export async function getQuestions() {
  if (questions.length === 0) {
    await loadQuestions();
  }
  return questions;
}
