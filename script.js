// Quiz data - 10 easy cartoon questions
const quizData = [
    {
        question: "What is the name of Mickey Mouse's pet dog?",
        options: ["Goofy", "Pluto", "Donald", "Chip"],
        correct: 1
    },
    {
        question: "Which network originally aired Courage the Cowardly Dog?",
        options: ["Nickelodeon", "Cartoon Network", "Disney Channel", "Sonic"],
        correct: 1
    },
    {
        question: "What color is Shrek?",
        options: ["Blue", "Purple", "Green", "Yellow"],
        correct: 2
    },
    {
        question: "What was the name of dog in Tom and Jerry?",
        options: ["Pluto", "Scooby-Doo", "Spike", "Lamput"],
        correct: 2
    },
    {
        question: "What is the name of the mystery-solving dog in Scooby-Doo?",
        options: ["Scooby-Doo", "Scrappy-Doo", "Snoopy", "Clifford"],
        correct: 0
    },
    {
        question: "In The Lion King, what is the name of Simba's father?",
        options: ["Scar", "Mufasa", "Timon", "Pumbaa"],
        correct: 1
    },
    {
        question: "Ben 10 first Girlfriend was?",
        options: ["None(Sigma Boy)", "Julie Yamamoto", "Charmcaster", "Kai Green"],
        correct: 1
    },
    {
        question: "What is Doraemon's signature fear",
        options: ["Nobita's Mom", "Giyan", "Mice", "Dogs"],
        correct: 2
    },
    {
        question: "Which character is Hattori's younger brother?",
        options: ["Shishimaru", "Shinzo", "Kiyo","Kenichi"],
        correct: 1
    },
    {
        question: "What is Lamput?",
        options: ["A Scientist", "A creature that can shapeshift", "A Doctor", "A Robot"],
        correct: 1
    }
];

// Quiz state
let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;
let quizStarted = false;
let skippedQuestions = 0;

// Function to start the quiz (called from landing page)
function startQuiz() {
    window.location.href = 'quiz.html';
}

// Function to initialize quiz when quiz page loads
function initializeQuiz() {
    if (window.location.pathname.includes('quiz.html')) {
        loadQuestion();
    }
}

// Function to load current question
function loadQuestion() {
    const question = quizData[currentQuestion];

    // Wait until all option elements are available in the DOM
    for (let i = 0; i < 4; i++) {
        if (!document.getElementById(`option-${i}`)) {
            setTimeout(loadQuestion, 50);
            return;
        }
    }

    document.getElementById('question-text').textContent = question.question;
    document.getElementById('current-question').textContent = currentQuestion + 1;
    
    // Load answer options
    for (let i = 0; i < 4; i++) {
        document.getElementById(`option-${i}`).textContent = question.options[i];
    }
    
    // Reset answer selection
    selectedAnswer = null;
    document.getElementById('next-btn').disabled = true;
    
    // Reset option styles
    const options = document.querySelectorAll('.answer-option');
    options.forEach(option => {
        option.classList.remove('selected', 'correct', 'incorrect');
    });
}

// Function to select an answer
function selectAnswer(optionIndex) {
    selectedAnswer = optionIndex;
    
    // Remove previous selections
    const options = document.querySelectorAll('.answer-option');
    options.forEach(option => option.classList.remove('selected'));
    
    // Add selected class to chosen option
    options[optionIndex].classList.add('selected');
    
    // Enable next button
    document.getElementById('next-btn').disabled = false;
}

// Function to skip current question
function skipQuestion() {
    skippedQuestions++;
    currentQuestion++;
    
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

// Function to go to next question
function nextQuestion() {
    if (selectedAnswer === null) return;
    
    // Check if answer is correct
    const correct = quizData[currentQuestion].correct;
    const options = document.querySelectorAll('.answer-option');
    
    // Show correct/incorrect styling
    options[correct].classList.add('correct');
    if (selectedAnswer !== correct) {
        options[selectedAnswer].classList.add('incorrect');
    } else {
        score++;
    }
    
    // Disable all options temporarily
    options.forEach(option => {
        option.style.pointerEvents = 'none';
    });
    
    // Wait a moment to show the result, then proceed
    setTimeout(() => {
        currentQuestion++;
        
        if (currentQuestion < quizData.length) {
            loadQuestion();
            // Re-enable options
            options.forEach(option => {
                option.style.pointerEvents = 'auto';
            });
        } else {
            showResults();
        }
    }, 1500);
}

// Function to show final results
function showResults() {
    document.querySelector('.quiz-container').style.display = 'none';
    document.getElementById('results-container').style.display = 'block';
    document.getElementById('final-score').textContent = score;
    document.getElementById('correct-count').textContent = score;
    document.getElementById('skipped-count').textContent = skippedQuestions;
    document.getElementById('incorrect-count').textContent = (10 - score - skippedQuestions);
    
    // Show appropriate message based on score
    const messageElement = document.getElementById('score-message');
    let message = '';
    
    if (score === 10) {
        message = '🏆 Perfect! You are a true cartoon expert!';
    } else if (score >= 2) {
        message = '📚 Not bad! Keep watching more cartoons!';
    } else {
        message = 'GenZ ? 😅 You might want to brush up on your cartoon knowledge!';
    }
    
    if (skippedQuestions > 0) {
        message += ` You skipped ${skippedQuestions} question${skippedQuestions > 1 ? 's' : ''}.`;
    }
    
    messageElement.textContent = message;
}

// Function to restart quiz
function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    selectedAnswer = null;
    skippedQuestions = 0;
    
    document.querySelector('.quiz-container').style.display = 'block';
    document.getElementById('results-container').style.display = 'none';
    
    loadQuestion();
}

// Function to go back to home page
function goHome() {
    window.location.href = 'index.html';
}

// Initialize quiz when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeQuiz();
});