const quizData = [
  {
    question: "Q.1) What does HTML stand for?",
    options: [
      "Hyperlinks and Text Markup Language",
      "Home Tool Markup Language",
      "Hyper Text Markup Language",
      "Hyper Tool Multi Language"
    ],
    answer: 2
  },
  {
    question: "Q.2) What does CSS stand for?",
    options: [
      "Cascading Style Sheets",
      "Creative Style System",
      "Colorful Style Sheet",
      "Computer Style Sheet"
    ],
    answer: 0
  },
  {
    question: "Q.3) Which language runs in a web browser?",
    options: ["Python", "C", "Java", "JavaScript"],
    answer: 3
  },
  {
    question: "Q.4) Which HTML tag is used for inserting an image?",
    options: ["<img>", "<image>", "<src>", "<pic>"],
    answer: 0
  },
  {
    question: "Q.5) How do you write a comment in CSS?",
    options: ["// comment", "# comment", "<!-- comment -->", "/* comment */"],
    answer: 3
  },
  {
    question: "Q.6) Which of the following is not a JavaScript data type?",
    options: ["String", "Boolean", "Float", "Undefined"],
    answer: 2
  }
];

let currentQuestion = 0;
let score = 0;

const introMessage = "Test your Web Dev Knowledge with us by taking this super easy and quick quiz. Let's Start shall we?😎😉";
let i = 0;

function typeIntro() {
  if (i < introMessage.length) {
    document.getElementById("introText").innerHTML += introMessage.charAt(i);
    i++;
    setTimeout(typeIntro, 60);
  }
}
typeIntro();

function startQuiz() {
  document.getElementById("intro").style.display = "none";
  document.querySelector(".quiz-container").style.display = "block";
}

function loadQuestion() {
  const q = quizData[currentQuestion];
  document.getElementById("question").innerText = q.question;
  q.options.forEach((opt, index) => {
    document.getElementById("opt" + index).innerText = opt;
  });
  document.querySelectorAll('input[name="option"]').forEach(input => input.checked = false);
  const progress = ((currentQuestion) / quizData.length) * 100;
  document.getElementById("progress-bar").style.width = progress + "%";
}

function nextQuestion() {
  const selected = document.querySelector('input[name="option"]:checked');
  if (!selected) {
    alert("Please select an answer!");
    return;
  }

    const selectedVal = parseInt(selected.value);
  userAnswers.push(selectedVal);

 if (selectedVal === quizData[currentQuestion].answer) {
  score++;
 }


  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
 
  } else {
    document.getElementById("quiz").style.display = "none";

    const title = document.querySelector("h1");
    const resultText = `You scored ${score} out of ${quizData.length}!`;

    if (score === quizData.length) {
      title.innerText = "🎉 Congratulations!";
    } else {
      title.innerText = "Simple Quiz";
    }

    document.getElementById("result").innerText = resultText;
    document.getElementById("restartBtn").style.display = "inline-block";
    document.getElementById("seeAnswersBtn").style.display = "inline-block";
    document.getElementById("progressWrapper").style.display = "none";

  }
}
// Load the first question on start
loadQuestion();

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  document.getElementById("quiz").style.display = "block";
  document.getElementById("result").innerText = "";
  document.getElementById("restartBtn").style.display = "none";
  document.querySelector("h1").innerText = "Simple Quiz";
  document.getElementById("progressWrapper").style.display = "block";

  loadQuestion();

 userAnswers = [];
 document.getElementById("seeAnswersBtn").style.display = "none";

}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

let userAnswers = [];

function showAnswers() {
  const quizElement = document.getElementById("quiz");
  const resultContainer = document.getElementById("resultContainer");
  
  // Hide the quiz and show result container
  quizElement.style.display = "none";
  resultContainer.style.display = "block";
  
  // Clear previous results
  const result = document.getElementById("result");
  result.innerHTML = "";
  
  quizData.forEach((q, idx) => {
    const userAnsIndex = userAnswers[idx];
    const correctAnsIndex = q.answer;

    const wrapper = document.createElement("div");
    wrapper.style.marginBottom = "1.5rem";

    // Question
    const question = document.createElement("p");
    question.innerHTML = `<strong>${q.question}</strong>`;
    wrapper.appendChild(question);

    // User's answer
    const userAnswerText = q.options[userAnsIndex];
    const userAnswer = document.createElement("p");
    userAnswer.innerText = `Your Answer: ${userAnswerText}`;

    if (userAnsIndex === correctAnsIndex) {
      userAnswer.style.color = "green";
    } else {
      userAnswer.style.color = "red";

      // Correct answer (if wrong)
      const correct = document.createElement("p");
      correct.innerText = `Correct Answer: ${q.options[correctAnsIndex]}`;
      correct.style.color = "green";
      wrapper.appendChild(correct);
    }

    wrapper.appendChild(userAnswer);
    result.appendChild(wrapper);
  });

  // Show the restart button (already in your HTML)
  document.getElementById("restartBtn").style.display = "inline-block";
  document.getElementById("seeAnswersBtn").style.display = "none";
}