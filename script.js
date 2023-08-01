const Questions = {
	general: [
		{
			q: "What is the capital of India?",
			a: [
				{ text: "Gandhinagar", isCorrect: false },
				{ text: "Surat", isCorrect: false },
				{ text: "Delhi", isCorrect: true },
				{ text: "Mumbai", isCorrect: false }
			]
		},

		{
			q: "What is the capital of Jharkhand?",
			a: [
				{ text: "Ranchi", isCorrect: true },
				{ text: "Surat", isCorrect: false },
				{ text: "Ramgarh", isCorrect: false },
				{ text: "Jamshedpur", isCorrect: false }
			]
		},

		{
			q: "Which of the following are called Key Industrial animals?",
			a: [
				{ text: "Producers", isCorrect: false },
				{ text: "Tertiary consumers", isCorrect: false },
				{ text: "Primary consumers", isCorrect: true },
				{ text: "None of these", isCorrect: false }
			]
		},

		{
			q: "Forming of Association in India is",
			a: [
				{ text: "Legal Right", isCorrect: false },
				{ text: "Illegal Right", isCorrect: false },
				{ text: "Natural Right", isCorrect: false },
				{ text: "Fundamental Right.", isCorrect: true }
			]
		},
		
	],
	history: [
		{
			q: "In which year did World War II start?",
			a: [
				{ text: "1939", isCorrect: true },
				{ text: "1914", isCorrect: false },
				{ text: "1945", isCorrect: false },
				{ text: "1941", isCorrect: false }
			]
		},

		{
			q: "Who among the given had translated the Upanishads from Sanskrit to Persian",
			a: [
				{ text: "Dara Shukoh", isCorrect: true },
				{ text: "Babar", isCorrect: false },
				{ text: "Mirza Galib", isCorrect: false },
				{ text: "Abul Fazal", isCorrect: false }
			]
		},

		{
			q: "The term Samantas is usually seen in the medieval history of India about",
			a: [
				{ text: "Artists", isCorrect: false },
				{ text: "Big Landlords", isCorrect: true },
				{ text: "Servants", isCorrect: false },
				{ text: "Queens", isCorrect: false }
			]
		},

		{
			q: " Which of the given coins was known as 'Karshapana' in ancient literature?",
			a: [
				{ text: "Gold coins", isCorrect: false },
				{ text: "Bronze coins", isCorrect: false },
				{ text: "Punch marked coins", isCorrect: true },
				{ text: "Iron coins", isCorrect: false }
			]
		},
		
	],
	science: [
		{
			q: "What is the chemical symbol for water?",
			a: [
				{ text: "O2", isCorrect: false },
				{ text: "H2O", isCorrect: true },
				{ text: "CO2", isCorrect: false },
				{ text: "NaCl", isCorrect: false }
			]
		},
		
		{
			q: "Which of the given is a disease caused by protozoa?",
			a: [
				{ text: "Cancer", isCorrect: false },
				{ text: "Typhoid", isCorrect: false },
				{ text: "Kala-azar", isCorrect: true },
				{ text: "Chicken Pox", isCorrect: false }
			]
		},

		{
			q: "The driving force of an ecosystem is",
			a: [
				{ text: "Carbon Mono oxide", isCorrect: false },
				{ text: "Biogas", isCorrect: false },
				{ text: "Solar Energy", isCorrect: true },
				{ text: "Carbon dioxide", isCorrect: false }
			]
		},

		{
			q: "When the metal reacts with dilute acid, which gas is formed?",
			a: [
				{ text: "Carbon Dioxide", isCorrect: false },
				{ text: "Helium", isCorrect: false },
				{ text: "Neon", isCorrect: false },
				{ text: "Hydrogen", isCorrect: true }
			]
		},
	],
};
  
  const urlParams = new URLSearchParams(window.location.search);
  const selectedCategory = urlParams.get("category");
  
  let currentQuestion = 0;
  let score = 0;
  let timerInterval = null;
  const timeLimit = 5;
  let userAnswers = [];

  function displayReview() {
    const reviewContainer = document.getElementById("review");
    reviewContainer.innerHTML = "";

    const heading = document.createElement("h2");
    heading.textContent = "Review Your Answers";
    reviewContainer.appendChild(heading);

    for (let i = 0; i < userAnswers.length; i++) {
        const questionDiv = document.createElement("div");
        questionDiv.classList.add("question-review");

        const question = document.createElement("p");
        question.textContent = `Q${i + 1}. ${userAnswers[i].question}`;
        questionDiv.appendChild(question);

        const answer = document.createElement("p");
        answer.textContent = `Your Answer: ${userAnswers[i].selectedAnswer}`;
        questionDiv.appendChild(answer);

        const correctAnswer = document.createElement("p");
        correctAnswer.textContent = `Correct Answer: ${getCorrectAnswer(i)}`;
        questionDiv.appendChild(correctAnswer);

        if (userAnswers[i].selectedAnswer === getCorrectAnswer(i)) {
            questionDiv.classList.add("correct");
        } else {
            questionDiv.classList.add("incorrect");
        }

        reviewContainer.appendChild(questionDiv);
    }

    document.getElementById("quizContent").style.display = "none";
    reviewContainer.style.display = "block";
}

function getCorrectAnswer(questionIndex) {
    return Questions[selectedCategory][questionIndex].a.find(answer => answer.isCorrect).text;
}
  
  function loadQuestion() {
	const question = document.getElementById("ques");
	const options = document.getElementById("opt");
  
	if (currentQuestion < Questions[selectedCategory].length) {
	  const currentQuestionData = Questions[selectedCategory][currentQuestion];
  
	  question.textContent = currentQuestionData.q;
	  options.innerHTML = "";
  
	  for (let i = 0; i < currentQuestionData.a.length; i++) {
		const choicesDiv = document.createElement("div");
		const choice = document.createElement("input");
		const choiceLabel = document.createElement("label");
  
		choice.type = "radio";
		choice.name = "answer";
		choice.value = i;
  
        choiceLabel.textContent = currentQuestionData.a[i].text;
        choiceLabel.setAttribute("for", `option_${i}`);
  
		choicesDiv.appendChild(choice);
		choicesDiv.appendChild(choiceLabel);
		options.appendChild(choicesDiv);
	  }
	  clearInterval(timerInterval);
      document.getElementById("timer").textContent = `Time Left: ${timeLimit}`;
      startTimer();
	} else {

      const submitButton = document.getElementById("btn");
	  const timer = document.getElementById("timer");

	  options.style.display = "none";
	  question.style.display = "none";
	  submitButton.style.display = "none";
	  timer.style.display = "none";

	  loadScore();
	  stopTimer();
	  displayReview();
	}
  }
  
  function startTimer() {
	let timeLeft = timeLimit;
    document.getElementById("timer").textContent = `Time Left: ${timeLeft}`;

    clearInterval(timerInterval);
	timerInterval = setInterval(() => {
		timeLeft--;
		document.getElementById("timer").textContent = `Time Left: ${timeLeft}`;

		if (timeLeft <= 0) {
			clearInterval(timerInterval);
			checkAns();
		}
	}, 1000);
  }

  function stopTimer() {
	clearInterval(timerInterval);
  }

  document.getElementById("timer").textContent = `Time Left: ${timeLimit}`;
  loadQuestion();
  startTimer();

  function addElementsBack() {
	const options = document.getElementById("opt");
	const question = document.getElementById("ques");
	const submitButton = document.getElementById("btn");
	const timer = document.getElementById("timer");
  
	options.style.display = "block";
	question.style.display = "block";
	submitButton.style.display = "block";
	timer.style.display = "block";
  }

  function reStart() {
	const reviewContainer = document.getElementById("review");
	const totalScore = document.getElementById("score");
	const restartButton = document.getElementById("restart-btn");
  
	reviewContainer.innerHTML = ""; // Remove the review section
	totalScore.textContent = ""; // Remove the score display
	restartButton.style.display = "none"; // Hide the restart button
  
	currentQuestion = 0;
	score = 0;
	userAnswers = [];
  
	addElementsBack(); // Add back the removed elements
  
	loadQuestion(); // Start the quiz again
  }
  
  function mainPage(){
	window.location.href = "index.html";
  }

  function loadScore() {
	const totalScore = document.getElementById("score");
	if(score<=1) 
	totalScore.textContent = `You scored ${score} out of ${Questions[selectedCategory].length}!Try Again!`;
	else
	totalScore.textContent = `You scored ${score} out of ${Questions[selectedCategory].length}!Greate Job!`;
	const btn = document.getElementById("restart-btn");
	btn.style.display= "block";
	const btn2 = document.getElementById("logout-btn");
	btn2.style.display= "block";
  }
  
  function checkAns() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');

    if (selectedAnswer) {
        const selectedAns = parseInt(selectedAnswer.value);
        const currentQuestionData = Questions[selectedCategory][currentQuestion];

        if (currentQuestionData.a[selectedAns].isCorrect) {
            score++;
            console.log("Correct");
        }

        userAnswers.push({ question: currentQuestionData.q, selectedAnswer: currentQuestionData.a[selectedAns].text });

        currentQuestion++;
        loadQuestion();
		
    } else {
        console.log("Time's up! Submitting unanswered question.");
        userAnswers.push({ question: Questions[selectedCategory][currentQuestion].q, selectedAnswer: "Unanswered" });

        currentQuestion++;
        loadQuestion();
	
    }
}
  