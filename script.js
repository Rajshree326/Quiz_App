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
				{ text: "Gandhinagar", isCorrect: false },
				{ text: "Surat", isCorrect: false },
				{ text: "Ranchi", isCorrect: true },
				{ text: "Mumbai", isCorrect: false }
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
	  document.getElementById("opt").remove();
	  document.getElementById("ques").remove();
	  document.getElementById("btn").remove();
	  document.getElementById("timer").remove();
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

  function reStart() {
	window.location.href = "index.html";
  }
  
  function loadScore() {
	const totalScore = document.getElementById("score");
	totalScore.textContent = `You scored ${score} out of ${Questions[selectedCategory].length}`;
	const btn = document.getElementById("restart-btn");
	btn.style.display= "block";
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
  