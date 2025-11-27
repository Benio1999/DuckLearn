/*******************************************************
 * Quiz Gamificado do Duck Learn
 * - Banco de perguntas com diferentes matérias
 * - Renderização com feedback visual
 * - Sistema de pontuação e progresso
 * - Barra de progresso animada
 *******************************************************/

/* Banco de perguntas */
const questions = [
  {
    question: "Qual é a capital do Brasil?",
    options: ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador"],
    answer: 2
  },
  {
    question: "Quanto é 2 + 2?",
    options: ["3", "4", "5", "22"],
    answer: 1
  },
  {
    question: "Qual linguagem roda no navegador?",
    options: ["Python", "C#", "JavaScript", "Go"],
    answer: 2
  },
  {
    question: "O que significa HTML?",
    options: [
      "Hyper Text Markup Language",
      "High Transfer Machine Learning",
      "Home Tool Markup Language",
      "Hyper Transfer Media Link"
    ],
    answer: 0
  },
  {
    question: "Qual é o maior planeta do sistema solar?",
    options: ["Saturno", "Marte", "Júpiter", "Netuno"],
    answer: 2
  },
  {
    question: "Qual é a fórmula da fotossíntese? (simplificada)",
    options: [
      "CO2 + H2O → Glicose + O2",
      "Glicose + O2 → CO2 + H2O",
      "O2 + H2O → Glicose + CO2",
      "CO2 → Glicose + O2"
    ],
    answer: 0
  }
];

/* Estado do quiz */
let currentIndex = 0;
let score = 0;

/* Referências ao DOM */
const quizEl = document.getElementById("quiz");
const scoreEl = document.getElementById("score");
const progressEl = document.getElementById("progress");
const progressBar = document.getElementById("progressBar");
const restartBtn = document.getElementById("restartBtn");

/* Inicialização */
function init() {
  updateProgress();
  renderQuestion();
  restartBtn.addEventListener("click", restart);
}
init();

/* Renderização da pergunta */
function renderQuestion() {
  if (currentIndex >= questions.length) {
    showFinal();
    return;
  }

  quizEl.innerHTML = "";
  const q = questions[currentIndex];

  // Título da pergunta
  const title = document.createElement("h2");
  title.textContent = q.question;
  quizEl.appendChild(title);

  // Container de opções
  const optionsEl = document.createElement("div");
  optionsEl.className = "options";

  // Cria um botão para cada opção
  q.options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.className = "btn";
    btn.textContent = opt;

    // Ao clicar, verifica resposta
    btn.addEventListener("click", () => {
      const isCorrect = idx === q.answer;

      // Bloqueia novas respostas
      Array.from(optionsEl.children).forEach(b => (b.disabled = true));

      // Marca corretos e errados
      Array.from(optionsEl.children).forEach((b, i) => {
        if (i === q.answer) b.classList.add("correct");
        if (i === idx && !isCorrect) b.classList.add("wrong");
      });

      // Atualiza pontuação
      if (isCorrect) {
        score++;
        scoreEl.textContent = `Pontuação: ${score}`;
      }

      // Avança para próxima pergunta
      setTimeout(() => {
        currentIndex++;
        updateProgress();
        renderQuestion();
      }, 800);
    });

    optionsEl.appendChild(btn);
  });

  quizEl.appendChild(optionsEl);
}

/* Atualiza progresso e barra */
function updateProgress() {
  const percentual = (currentIndex / questions.length) * 100;
  progressBar.style.width = percentual + "%";
  progressEl.textContent = `Pergunta: ${Math.min(currentIndex + 1, questions.length)}/${questions.length}`;
  scoreEl.textContent = `Pontuação: ${score}`;
}

/* Tela final */
function showFinal() {
  quizEl.innerHTML = "";

  const title = document.createElement("h2");
  title.textContent = "🎉 Parabéns! Quiz Concluído!";
  quizEl.appendChild(title);

  const percentual = Math.round((score / questions.length) * 100);
  const result = document.createElement("p");
  result.textContent = `Você acertou ${score} de ${questions.length} perguntas (${percentual}%)`;
  result.style.fontSize = "1.2rem";
  result.style.fontWeight = "600";
  result.style.color = "#410179";
  quizEl.appendChild(result);

  // Mensagem motivacional
  const message = document.createElement("p");
  let motivacao = "";
  if (percentual >= 80) {
    motivacao = "🏆 Excelente desempenho! Você é um mestre!";
  } else if (percentual >= 60) {
    motivacao = "👏 Ótimo trabalho! Continue praticando!";
  } else if (percentual >= 40) {
    motivacao = "💪 Bom começo! Pratique mais para melhorar!";
  } else {
    motivacao = "📚 Continue estudando, você vai conseguir!";
  }
  message.textContent = motivacao;
  message.style.fontSize = "1.1rem";
  message.style.marginTop = "1rem";
  quizEl.appendChild(message);

  const tip = document.createElement("p");
  tip.style.color = "#666";
  tip.style.marginTop = "1.5rem";
  tip.textContent = "Clique em 'Reiniciar Quiz' para tentar novamente.";
  quizEl.appendChild(tip);

  progressBar.style.width = "100%";
}

/* Reinício do quiz */
function restart() {
  currentIndex = 0;
  score = 0;
  updateProgress();
  renderQuestion();
}