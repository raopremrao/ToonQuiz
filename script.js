// Quiz data - 10 easy cartoon questions
const quizData = [
    {
        question: "What is the name of Mickey Mouse's pet dog?",
        options: ["Goofy", "Pluto", "Donald", "Chip"],
        correct: 1
    },
    {
        question: "In Tom and Jerry, which one is the cat?",
        options: ["Jerry", "Tom", "Spike", "Tyke"],
        correct: 1
    },
    {
        question: "What color is Shrek?",
        options: ["Blue", "Purple", "Green", "Yellow"],
        correct: 2
    },
    {
        question: "Which cartoon character lives in a pineapple under the sea?",
        options: ["Patrick Star", "Squidward", "SpongeBob SquarePants", "Mr. Krabs"],
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
        question: "What is Bugs Bunny's famous catchphrase?",
        options: ["That's all folks!", "What's up, Doc?", "I tawt I taw a puddy tat", "Yabba-Dabba-Doo!"],
        correct: 1
    },
    {
        question: "Which cartoon family lives in the town of Springfield?",
        options: ["The Flintstones", "The Jetsons", "The Simpsons", "The Griffins"],
        correct: 2
    },
    {
        question: "What is the name of Popeye's girlfriend?",
        options: ["Betty Boop", "Olive Oyl", "Minnie Mouse", "Wilma Flintstone"],
        correct: 1
    },
    {
        question: "In Finding Nemo, what type of fish is Nemo?",
        options: ["Goldfish", "Clownfish", "Angelfish", "Pufferfish"],
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
        updateProgress();
    }
}

// Function to load current question
function loadQuestion() {
    const question = quizData[currentQuestion];
    
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
        updateProgress();
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
            updateProgress();
            // Re-enable options
            options.forEach(option => {
                option.style.pointerEvents = 'auto';
            });
        } else {
            showResults();
        }
    }, 1500);
}

// Function to update progress bar
function updateProgress() {
    const progress = ((currentQuestion) / quizData.length) * 100;
    document.getElementById('progress').style.width = progress + '%';
}

// Function to show final results
function showResults() {
    document.querySelector('.quiz-container').style.display = 'none';
    document.getElementById('results-container').style.display = 'block';
    document.getElementById('final-score').textContent = score;
    document.getElementById('correct-count').textContent = score;
    document.getElementById('skipped-count').textContent = skippedQuestions;
    document.getElementById('incorrect-count').textContent = (10 - score - skippedQuestions);
    
    // Update progress to 100%
    document.getElementById('progress').style.width = '100%';
    
    // Show appropriate message based on score
    const messageElement = document.getElementById('score-message');
    let message = '';
    
    if (score === 10) {
        message = '🏆 Perfect! You are a true cartoon expert!';
    } else if (score >= 8) {
        message = '🌟 Excellent! You know your cartoons very well!';
    } else if (score >= 6) {
        message = '👍 Good job! You have solid cartoon knowledge!';
    } else if (score >= 4) {
        message = '📚 Not bad! Keep watching more cartoons!';
    } else {
        message = '🎭 Keep learning! There are so many great cartoons to discover!';
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
    updateProgress();
}

// Function to go back to home page
function goHome() {
    window.location.href = 'index.html';
}

// Initialize quiz when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeQuiz();
});