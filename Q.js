const questions=[
    {
        question:"Who is the author of the \"Harry Potter\" series?",
        ans:[
            {text:"J.D. Salinger",correct:"false"},
            {text:"Roald Dahl",correct:"false"},
            {text:"Suzanne Collins",correct:"false"},
            {text:"J.K. Rowling",correct:"true"}
        ]
    },
    {
        question:"What is the highest-grossing film of all time?",
        ans:[
            {text:"Titanic",correct:"false"},
            {text:"Avatar",correct:"false"},
            {text:"Avengers: Endgame",correct:"true"},
            {text:"Star Wars: The Force Awakens",correct:"false"}
        ]
    },
    {
        question:"Who invented the lightbulb?",
        ans:[
            {text:"Albert Einstein",correct:"false"},
            {text:"Nikola Tesla",correct:"false"},
            {text:"Thomas Edison",correct:"true"},
            {text:"Alexander Graham Bell",correct:"false"}
        ]
    },
    {
        question:"What is the world's largest ocean?",
        ans:[
            {text:"Atlantic Ocean",correct:"false"},
            {text:"Indian Ocean",correct:"false"},
            {text:"Pacific Ocean ",correct:"true"},
            {text:"Southern Ocean",correct:"false"}
        ]
    },
    {
        question:"What is the smallest continent in the World?",
        ans:[
            {text:"Asia",correct:"false"},
            {text:"Australia",correct:"true"},
            {text:"Arctic",correct:"false"},
            {text:"Africa",correct:"false"}
        ]
    }
];

const questionElement = document.getElementById("ques");
const answerButton = document.getElementById("ans-btns");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Submit Answer";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion= questions[currentQuestionIndex];
    let quesNo = currentQuestionIndex + 1;
    questionElement.innerHTML = quesNo + ". " + currentQuestion.question;

    currentQuestion.ans.forEach( ans => {
        const button = document.createElement("button");
        button.innerHTML=ans.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(ans.correct){
            button.dataset.correct=ans.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}
function resetState(){
    nextButton.style.display="none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect= selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML= "Play Again";
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
} );
startQuiz();
