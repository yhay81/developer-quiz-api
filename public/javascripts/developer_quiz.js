const url = "http://localhost:3000/api/quizzes/random";
const probrem = document.getElementById("probrem");
const one = document.getElementById("answer1");
const two = document.getElementById("answer2");
const three = document.getElementById("answer3");
const four = document.getElementById("answer4");

fetch(url)
  .then(res => res.json(url))
  .then(quizJSON => {
    console.log("a", quizJSON);
    probrem.innerText = quizJSON.quiz;
    one.innerText = quizJSON.correctAnswer;
    two.innerText = quizJSON.wrongAnswer1;
    three.innerText = quizJSON.wrongAnswer2;
    four.innerText = quizJSON.wrongAnswer3;
  });

one.addEventListener("click", answer(1));
two.addEventListener("click", answer(2));
three.addEventListener("click", answer(3));
four.addEventListener("click", answer(4));
function answer() {}
