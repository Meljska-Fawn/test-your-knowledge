let infoBox = document.querySelector("#info_box");
let startBtn = document.querySelector("#start_btn");
let quizBox = document.querySelector(".quiz_box");
let highscoreTimer = document.querySelector(".highscore_timer");
let questionText = document.querySelector(".question_text");
let timerText = document.querySelector(".timer_text");  
let timerSec = document.querySelector("#timer_sec");
let option1 = document.querySelector(".answer1");
let option2 = document.querySelector(".answer2");
let option3 = document.querySelector(".answer3");
let option4 = document.querySelector(".answer4");
let finalScore = document.querySelector("#final_score");
let highscore = document.querySelector("#highscore");
let secondsLeft = 75;

let questions = [
    {
        number: 1,
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answer: "4. console.log",
        options: [
            "1. JavaScript",
            "2. Terminal/bash",
            "3. For loops",
            "4. console.log",
        ]
    },
    {
        number: 2,
        question: "Commonly used data types DO NOT include:",
        answer: "3. Alerts",
        options: [
            "1. Strings",
            "2. Booleans",
            "3. Alerts",
            "4. Numbers",
        ]
    },
    {
        number: 3,
        question: "The condition in an if/else statement is enclosed within ______.",
        answer: "2. Curly brackets",
        options: [
            "1. Quotes",
            "2. Curly brackets",
            "3. Parentheses",
            "4. Square brackets",
        ]
    },
    {
        number: 4,
        question: "String values must be enclosed within ______ when being assigned to variables.",
        answer: "3. Quotes",
        options: [
            "1. Commas",
            "2. Curly brackets",
            "3. Quotes",
            "4. Parentheses",
        ]
    },
    {
        number: 5,
        question: "Arrays in JavaScript can be used to store _______.",
        answer: "4. All of the above",
        options: [
            "1. Numbers and strings",
            "2. Other arrays",
            "3. Booleans",
            "4. All of the above",
        ]
    },
]


var questionNumber;

quizBox.style.display = "none";
finalScore.style.display = "none";
highscore.style.display = "none";

startBtn.addEventListener("click", function (event) {

    questionNumber = event.target.getAttribute("data-number");
    console.log(questionNumber);
    var state = questionText.getAttribute("data-state");
    console.log(questions);

   infoBox.style.display = "none";
   quizBox.style.display = "block";
    
    if (state === "hidden") {
        question();
    } else {
        questionText.textContent = "";
        questionText.setAttribute("data-state", "hidden");
    }

    setTime();

});

function question(){
    questionText.dataset.state = "visible";
    questionText.textContent = questions[questionNumber].question;
        option1.textContent = questions[questionNumber].options[0];
        option2.textContent = questions[questionNumber].options[1];
        option3.textContent = questions[questionNumber].options[2];
        option4.textContent = questions[questionNumber].options[3];
};

option1.addEventListener("click", response);
option2.addEventListener("click", response);
option3.addEventListener("click", response);
option4.addEventListener("click", response);

let score = 1;

function response(event) {

    console.log(questions[questionNumber].answer);
    var element = event.target;
    console.log(element.textContent);
  
    if(questionNumber >= 4) {
        quizEnd();
    }

    if (secondsLeft <= 0) {
        quizEnd();
    }

    if (element.textContent === questions[questionNumber].answer) {
      document.getElementById("response_prompt").innerText = "Correct!";
      questionNumber++;
      question();
      score += 1;
    } else { 
        document.getElementById("response_prompt").innerText = "Wrong!";
        secondsLeft -= 5;
    } 
  };
  
function setTime() {
    var timerInterval = setInterval(function() {
      secondsLeft--;
      timerText.textContent = "Time: " + secondsLeft;
  
      if(secondsLeft === 0) {
        clearInterval(timerInterval);
      } 
    }, 1000);
};   


let scoreNumber = document.querySelector(".score_number");

function quizEnd() {
    quizBox.style.display = "none";
    finalScore.style.display = "block";
    scoreNumber.textContent = "Your final score is " + score + "!";
};

let submitBtn = document.querySelector("#submit_btn");
let initials = document.getElementById("initials");

submitBtn.addEventListener("click", function() {

    finalScore.style.display = "none";
    highscore.style.display = "block";

    localStorage.setItem("scorePost", initials.value.trim() + " scored " + score);
    highscores();
});
  
function highscores() {
    let lastHighscore = localStorage.getItem("scorePost");
    console.log(lastHighscore);

    document.querySelector("#highscore_list").textContent = lastHighscore;
};

let backBtn = document.getElementById("go_back");

backBtn.addEventListener("click", function() {

    highscore.style.display = "none";
    infoBox.style.display = "block";
});

let clearBtn = document.getElementById("clear_hs");

clearBtn.addEventListener("click", function() {
    let hsList = document.getElementById("highscore_list");

    hsList.style.display = "none";
});    
