const questions = [
     {
        question: "Who is Brazil's All time to scorer?",
        answers:[
            {text: "Pele", correct: false},
            {text: "Messi", correct: false},
            {text: "Neymar", correct: true},
            {text: "Ronaldo", correct: false},
        ]

     },
     {
        question: "Which player has one the most BallonDors?",
        answers:[
            {text: "Pele", correct: false},
            {text: "Messi", correct: true},
            {text: "Neymar", correct: false},
            {text: "Ronaldo", correct: false},
        ]
     },
     {
        question: "Which of these players won the most world cups?",
        answers:[
            {text: "Pele", correct: true},
            {text: "Messi", correct: false},
            {text: "Neymar", correct: false},
            {text: "Ronaldo", correct: false},
        ]
     },
     {
        question: "Who is the greatest of all time?",
        answers:[
            {text: "Pele", correct: false},
            {text: "Messi", correct: false},
            {text: "Neymar", correct: true},
            {text: "Ronaldo", correct: false},
        ]
     },
     
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex=0;
    score = 0;
    nextButton.innerHTML="Next"
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
       if(answer.correct){
        button.dataset.correct = answer.correct
       }
        button.addEventListener("click",selectAnswer);
    });
}


function resetState(){
    nextButton.style.display = "none";
    while (answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}


function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    } else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = 'Your score was ${score} out of ${questions.length}!';
    nextButton.innerHTML = "Try Again"
    nextButton.style.display = "block";
}


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});
startQuiz();   