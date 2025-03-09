// Typing Speed Test Game

/*
  Advices
  - Always Check The Console
  - Take Your Time To Name The Identifiers
  - DRY

  Steps To Create The Project
  [01] Create HTML Markup
  [02] Add Styling And Separate From Logic
  [03] Create The App Logic
  ---- [01] Add Levels
  ---- [02] Show Level And Seconds
  ---- [03] Add Array Of Words
  ---- [04] Add Start Game Button
  ---- [05] Generate Upcoming Words
  ---- [06] Disable Copy Word And Paste Event + Focus On Input
  ---- [07] Start Play Function
  ---- [08] Start The Time And Count Score
  ---- [09] Add The Error And Success Messages
  [04] Your Trainings To Add Features
  ---- [01] Save Score To Local Storage With Date
  ---- [02] Choose Levels From Select Box
  ---- [03] Break The Logic To More Functions
  ---- [04] Choose Array Of Words For Every Level
  ---- [05] Write Game Instruction With Dynamic Values
  ---- [06] Add 3 Seconds For The First Word
*/


// Array Of Words
let words = [
  "Hello",
  "Programming",
  "Code",
  "Javascript",
  "Town",
  "Country",
  "Testing",
  "Youtube",
  "Linkedin",
  "Twitter",
  "Github",
  "Leetcode",
  "Internet",
  "Python",
  "Scala",
  "Destructuring",
  "Paradigm",
  "Styling",
  "Cascade",
  "Documentation",
  "Coding",
  "Funny",
  "Working",
  "Dependencies",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Rust",
  "Playing",
];

const lvls = {
  Easy: 5,
  Normal: 3,
  Hard: 2,
};

let defaultLvl = "";
let defaultLvlSeconds = "";

let theLevels = document.querySelector(".choose-lvl");
let levlesSpans = document.querySelectorAll(".levels span");
let gameContainer = document.querySelector(".container");

chooseLevels();

let lvl = document.querySelector(".message .lvl");
let sec = document.querySelector(".message .sec");

let btn = document.querySelector(".btn");
let input = document.querySelector("input");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".words");
let MsgBeforGame = document.querySelector(".words span");

let timeLeft = document.querySelector(".time span");
let score = document.querySelector(".score");
let total = document.querySelector(".total");

let finalMsg = document.querySelector(".finish");

function chooseLevels() {
  levlesSpans.forEach((lvl) => {
    lvl.addEventListener("click", () => {
      if (lvl.classList.contains("easy")) {
        defaultLvl = "Easy";
        defaultLvlSeconds = lvls[defaultLvl];
      } else if (lvl.classList.contains("normal")) {
        defaultLvl = "Normal";
        defaultLvlSeconds = lvls[defaultLvl];
      } else {
        defaultLvl = "Hard";
        defaultLvlSeconds = lvls[defaultLvl];
      }

      levlesSpans.forEach((span) => {
        span.remove();
      });

      theLevels.style.display = "none";
      gameContainer.style.display = "block";

      checkLevel();
      setDataLevel();
    });
  });
}

btn.addEventListener("click", () => {
  btn.remove();
  MsgBeforGame.remove();
  theWord.style.display = "block";

  input.removeAttribute("readonly");
  input.focus();

  addWords();
});

function checkLevel() {
  if (defaultLvl === "Easy") {
    words = words.slice(0, words.length / 3);
  } else if (defaultLvl === "Normal") {
    words = words.slice(0, words.length / 2);
  } else {
    words = words;
  }
}

function setDataLevel() {
  lvl.innerHTML = `[ ${defaultLvl} ]`;
  sec.innerHTML = `[ ${defaultLvlSeconds} ]`;
  timeLeft.innerHTML = defaultLvlSeconds;
  total.innerHTML = words.length;
  score.innerHTML = 0;

  input.onpaste = () => {
    return false;
  };
}

function addWords() {
  let randomWord = words[Math.floor(Math.random() * words.length)];
  let wordIndex = words.indexOf(randomWord);

  words.splice(wordIndex, 1);
  upcomingWords.innerHTML = "";

  theWord.innerHTML = randomWord;

  words.forEach((word) => {
    let Pword = document.createElement("p");
    Pword.innerHTML = word;

    upcomingWords.appendChild(Pword);
  });

  startPlay();
}

function startPlay() {
  timeLeft.innerHTML = defaultLvlSeconds;
  let start = setInterval(() => {
    timeLeft.innerHTML--;

    if (timeLeft.innerHTML === "0") {
      clearInterval(start);

      if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
        input.value = "";
        score.innerHTML++;

        if (words.length > 0) {
          addWords();
        } else {
          removeElements();

          let good = document.createElement("span");
          good.className = "good";
          good.innerHTML = "good Game";

          finalMsg.style.display = "block";
          finalMsg.appendChild(good);

          playGameAgain();
        }
      } else {
        let bad = document.createElement("span");
        bad.className = "bad";
        bad.innerHTML = "Game Over";

        finalMsg.style.display = "block";
        finalMsg.appendChild(bad);

        removeElements();
        playGameAgain();
      }
    }
  }, 1000);
}

function removeElements() {
  input.remove();
  upcomingWords.remove();
  theWord.remove();
}

function playGameAgain() {
  let playAgain = document.createElement("div");
  playAgain.className = "again";
  playAgain.innerHTML = "Play Again";

  document.body.appendChild(playAgain);

  playAgain.addEventListener("click", () => {
    location.reload();
  });
}

window.addEventListener("keypress", (event) => {
  if (document.body.contains(document.querySelector(".again"))) {
    if (event.code === "Enter") {
      location.reload();
    }
  }
});






