console.log("Quiz App is ready!");
let questions = [];

let currentQuestion = 0;
let score = 0;

// Fetch questions asynchronously from the JSON file
async function loadQuestions() {
    try {
        const response = await fetch("data/questions.json"); // Correct path to JSON file
        if (!response.ok) {
            throw new Error(`Failed to load questions: ${response.status}`);
        }
       
       
        questions = await response.json();
        loadQuestion(); // Once questions are loaded, start the quiz by loading the first question
    } catch (error) {
        console.error("Failed to load questions:", error);
    }
}
// Load the current question and options
function loadQuestion() {
    const questionElement = document.getElementById("question");
    const optionsContainer = document.getElementById("options");

   // if (currentQuestion >= questions.length) {
    //    displayRestartButton(); // If there are no more questions, show the restart button
     //   return;
    //}

    questionElement.textContent = `${currentQuestion + 1}. ${questions[currentQuestion].question}`;
    optionsContainer.innerHTML = ""; // Clear previous options

  // Create radio buttons for each option
  questions[currentQuestion].options.forEach((option, index) => {
    const label = document.createElement("label");
    const radio = document.createElement("input");

    radio.type = "radio";
    radio.name = "option"; // Group all options together
    radio.value = option;

    label.textContent = option;// Only display the option text
    label.prepend(radio); // Add radio button before text
    label.style.display = "block"; // Ensure options are in separate lines

    optionsContainer.appendChild(label);
});
}

function handleSubmit() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (!selectedOption) {
        alert("Please select an option before submitting.");
        return;
    }

    const correctAnswer = questions[currentQuestion].answer;
    if (selectedOption.value === correctAnswer) {
        score++;
        alert("Correct!");
    } else {
        alert(`Wrong! The correct answer is ${correctAnswer}.`);
    }

    updateScore();
    loadNextQuestion();
}

function updateScore() {
    document.getElementById("score").textContent = `Score: ${score}`;
}

function loadNextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        alert("Quiz Finished! Your score is: " + score);
        displayRestartButton();
    }
}

function displayRestartButton() {
    const quizContainer = document.getElementById("quiz-container");
    quizContainer.innerHTML = `
        <h2>Quiz Finished!</h2>
        <p>Your score is: ${score} out of ${questions.length}</p>
        <button id="restart-btn">Restart Quiz</button>
    `;

    // Add event listener for restart
    document.getElementById("restart-btn").addEventListener("click", restartQuiz);
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
      // Restore the quiz HTML structure
      const quizContainer = document.getElementById("quiz-container");
      quizContainer.innerHTML = `
          <p id="question"></p>
          <div id="options"></div>
          <button id="submit-btn">Submit</button>
          <p id="score">Score: 0</p>
      `;
  
      // Reattach event listener for the Submit button
      document.getElementById("submit-btn").addEventListener("click", handleSubmit);
  
      // Load the first question
      loadQuestion();
}

// Initialize the quiz by loading the questions
loadQuestions();

// Attach event listener to the Submit button
document.getElementById("submit-btn").addEventListener("click", handleSubmit);


