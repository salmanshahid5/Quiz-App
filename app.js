const quizData = [
    {
        question: "Which language runs in a web browser?",
        a: "Java",
        b: "C",
        c: "Python",
        d: "JavaScript",
        correct: "d",
    },
    {
        question: "What does CSS stand for?",
        a: "Central Style Sheets",
        b: "Cascading Style Sheets",
        c: "Cascading Simple Sheets",
        d: "Cars SUVs Sailboats",
        correct: "b",
    },
    {
        question: "What does HTML stand for?",
        a: "Hypertext Markup Language",
        b: "Hypertext Markdown Language",
        c: "Hyperloop Machine Language",
        d: "Helicopters Terminals Motorboats Lamborginis",
        correct: "a",
    },
    {
        question: "What year was JavaScript launched?",
        a: "1996",
        b: "1995",
        c: "1994",
        d: "none of the above",
        correct: "b",
    },
    {
        question: 'What is the correct HTML for adding a background color?',
        a: '<body bg="yellow">',
        b: '<background>yellow</background>',
        c: '<body style="background-color:yellow;">',
        correct: 'c'
    },
    {
        question: 'Choose the correct HTML element to define important text:',
        a: '<strong>',
        b: '<b>',
        c: '<i>',
        correct: 'a'
    },
    {
        question: 'Choose the correct HTML element to define emphasized text:',
        a: '<italic>',
        b: '<i>',
        c: '<em>',
        correct: "c"
    },
];

// varible initialization
var questionText = document.getElementById('question');
const quiz = document.getElementById('quiz')
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submit = document.getElementById('submit');
const timerElement = document.getElementById('timer');

var index = 0;
var score = 0;
var timer;

function startTimer() {
    var timeLeft = 295;
    timerElement.innerHTML = `Time Left: ${timeLeft}s`;

    timer = setInterval(() => {
        timeLeft--;
        timerElement.innerHTML = `Time Left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            NextQuestion();
        }
    }, 1000)
}

function NextQuestion() {
    if (index > quizData.length - 1) {
        let message, messageClass;
        if ((score+1) / quizData.length >= 0.5) {
            message = 'Congratulations, you passed';
            messageClass = 'green';
        }
        else {
            message = 'Sorry, you failed';
            messageClass = 'red';
        }
        quiz.innerHTML = `<div class="container">
    <p class="congratulations ${messageClass}">${message}</p>
    <div class="results">
        <div class="total-questions" style="border-bottom: 1px solid grey;">
            <span>Total Questions</span>
            <span>${quizData.length}</span>
        </div>
        <div class="correct-questions">
            <span>Correct Questions</span>
            <span>${(score+1)}</span>
        </div>
        <div class="score-circle">
            <div class="circle">
                <span>${((score+1) / quizData.length * 100).toFixed(1)}%</span>
            </div>
        </div>
    </div>
    <button class="back-to-home" onclick="location.reload()">Back to home</button>
</div>`
        clearInterval(timer);
        return;
    }
    else {
        questionText.innerHTML = quizData[index].question;
        a_text.innerText = quizData[index].a;
        b_text.innerText = quizData[index].b;
        c_text.innerText = quizData[index].c;
        d_text.innerText = quizData[index].d;
        index++;
    }
    const answer = document.getElementsByName('answer');
    for (var i = 0; i < answer.length; i++) {
        if (answer[i].checked) {
            var userSelect = answer[i].id;
            var correctAns = quizData[index - 2].correct;
            if (userSelect == correctAns) {
                score++;
            }
        }
        answer[i].checked = false;
        submit.disabled = true;
    }
}
startTimer()
NextQuestion();

function enabled() {
    submit.disabled = false;
}