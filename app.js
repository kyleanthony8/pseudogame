//Question Data API
let url = "https://opentdb.com/api.php?amount=50&category=18&type=multiple";

//Insult API
let url1 = 'https://justcors.com/tl_ff08f76/https://evilinsult.com/generate_insult.php?lang=en&type=json';

//Compliment API
let url2 = 'https://justcors.com/tl_ff08f76/https://complimentr.com/api';

//Score Keeping
let score = 0
let insult = ''
let results = [] // TEST
let index = 0 // TEST

//Audio Elements
const letsPlayAudio = document.getElementById("lets-play");
const easyAudio = document.getElementById("easy");
const wrongAnswerAudio = document.getElementById("wrong-answer");
const correctAnswerAudio = document.getElementById("correct-answer");

//Fetching Trivia Data
async function getTrivia() {
  let response = await fetch(url);
  let data = await response.json();
  results.push(...data.results)
  startTrivia()
  // return data;
}
getTrivia()
//Fetching Insult Data
async function getInsult() {
  let response = await fetch(url1);
  let insult = await response.json();
  console.log(insult)
  return insult;
}
getInsult();
//Fetching Compliment Data
async function getCompliment() {
  let response = await fetch(url2);
  let insult = await response.json();
  console.log(insult)
  return insult;
}
getCompliment();

//Yates Stuff Shuffle of Questions
// function shuffleArray(arr) {
//   for (let i = arr.length - 1; i >= 0; i--) {
//     const s = Math.floor(Math.random() * (i + 1));
//     [arr[i], arr[s]] = [arr[s], arr[i]];
//   }
// }

//Trivia Variable
function startTrivia() {

  getInsult();
  getCompliment();
  // getTrivia().then((data) => {
  console.log("clicked")
  // console.log(data)
  // const results = data.results[0];
  // console.log(results)
  //  Test Code Start
  // const results = data.results
  //  Test Code End
  function shuffleArray(arr) {
    for (let i = arr.length - 1; i >= 0; i--) {
      const s = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[s]] = [arr[s], arr[i]];
    }
  }
  document.getElementById('question').innerHTML = results[index].question;
  document.getElementById('category').innerHTML = results[index].category;
  const answers = [...results[index].incorrect_answers, results[index].correct_answer];
  shuffleArray(answers);
  console.log('answers', answers);
  console.log('shuffleArray(answers)', shuffleArray(answers));
  // console.log(results);
  for (let i = 0; i < 4; i++) {
    // let index = i + 1;
    document.getElementById(`choice${i + 1}label`).innerHTML = answers[i];
    document.getElementById(`choice${i + 1}`).value = answers[i];
    console.log('answers[i]', answers[i])
    console.log('i', i)
  }

  document.getElementById('guess').addEventListener('click', () => {
    document.querySelectorAll('input[name="choice"]').forEach((el) => {
      const result = document.getElementById('result');
      if (el.checked) {
        console.log(el.value);
        // console.log(results.correct_answer);
        if (el.value === results[index].correct_answer) {
          result.innerHTML = `That's the correct answer! ${results[index].getCompliment}`;
        } else
          result.innerHTML = `Sorry! The correct answer is ${results[index].correct_answer}`;
      }
    });
  });

index++
}

document.getElementById('new').addEventListener('click', () => {
  console.log("new click")
  startTrivia();
});

///////    AUDIO FUNCTIONS    ///////
/////////////////////////////////////
/////////////////////////////////////

const startTimerMusic = () => {
  timer();
  // start audio
  letsPlayAudio.play();
  letsPlayAudio.volume = 0.3;
  timeoutId = setTimeout(() => {
    easyAudio.play();
    easyAudio.volume = 0.3;
  }, 4000);
};
const stopTimerMusic = () => {
  clearTimeout(timeoutId);
  clearInterval(intervalId);
  letsPlayAudio.pause();
  letsPlayAudio.currentTime = 0;
  easyAudio.pause();
  easyAudio.currentTime = 0;
  wrongAnswerAudio.pause();
  wrongAnswerAudio.currentTime = 0;
  correctAnswerAudio.pause();
  correctAnswerAudio.currentTime = 0;
};