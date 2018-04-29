const url = "http://localhost:3000/api/quizzes/random";
const probrem = document.getElementById("probrem");

const choices = [
  document.getElementById("answer1"),
  document.getElementById("answer2"),
  document.getElementById("answer3"),
  document.getElementById("answer4")
];

const genre = document.getElementById("genre");
const author = document.getElementById("author");

const setQuiz = quizJSON => {
  probrem.innerText = "Question: " + quizJSON.quiz;
  genre.innerHTML = "Genre: " + quizJSON.genreName;
  author.innerHTML = "Author: " + quizJSON.author;
  const options = [
    quizJSON.correctAnswer,
    quizJSON.wrongAnswer1,
    quizJSON.wrongAnswer2,
    quizJSON.wrongAnswer3
  ];
  const answerNum = Math.floor(Math.random() * 4);
  for (let i = 0; i < 4; i++) {
    choices[(answerNum + i) % 4].innerText = options[i];
  }
  return answerNum;
};

const setButton = answerNum => {
  for (let i = 0; i < 4; i++) {
    choices[i].classList.remove("correct", "wrong");
    choices[i].classList.add(i === answerNum ? "correct" : "wrong");
  }
};

const nextQuiz = () =>
  fetch(url)
    .then(res => res.json(url))
    .then(quizJSON => {
      const answerNum = setQuiz(quizJSON);
      setButton(answerNum);
    });

for (let i = 0; i < 4; i++) {
  choices[i].addEventListener("click", nextQuiz);
}
nextQuiz();
