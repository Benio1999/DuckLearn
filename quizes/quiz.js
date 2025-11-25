/*******************************************************
 * Quiz Básico em JavaScript
 * - Mantém um banco de perguntas
 * - Renderiza pergunta atual e opções
 * - Verifica resposta, atualiza pontuação e progresso
 * - Permite reiniciar
 *******************************************************/

/* -----------------------------
   1) Banco de perguntas
   - Cada item tem: question, options, answer
   - answer é o índice da opção correta
------------------------------*/
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
  }
];

/* -----------------------------
   2) Estado do quiz
   - currentIndex: qual pergunta está ativa
   - score: pontuação acumulada
------------------------------*/
let currentIndex = 0;
let score = 0;

/* -----------------------------
   3) Referências ao DOM
------------------------------*/
const quizEl = document.getElementById("quiz");
const scoreEl = document.getElementById("score");
const progressEl = document.getElementById("progress");
const restartBtn = document.getElementById("restartBtn");

/* -----------------------------
   4) Inicialização
   - Configura progresso inicial
   - Renderiza a primeira pergunta
   - Liga o botão de reinício
------------------------------*/
function init() {
  updateProgress();
  renderQuestion();
  restartBtn.addEventListener("click", restart);
}
init();

/* -----------------------------
   5) Renderização da pergunta
   - Limpa o container
   - Cria título, opções e eventos de clique
------------------------------*/
function renderQuestion() {
  // Se terminou, mostra resultado final
  if (currentIndex >= questions.length) {
    showFinal();
    return;
  }

  // Limpa a área
  quizEl.innerHTML = "";

  // Pega pergunta atual
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

    // Ao clicar, verifica resposta e faz feedback visual
    btn.addEventListener("click", () => {
      const isCorrect = idx === q.answer;

      // Bloqueia novas respostas (desabilita todos os botões)
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

      // Avança para próxima pergunta depois de um pequeno delay
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

/* -----------------------------
   6) Progresso e pontuação
   - Atualiza os badges de status
------------------------------*/
function updateProgress() {
  progressEl.textContent = `Pergunta: ${Math.min(currentIndex + 1, questions.length)}/${questions.length}`;
  scoreEl.textContent = `Pontuação: ${score}`;
}

/* -----------------------------
   7) Tela final
   - Mostra pontuação total e opção de reiniciar
------------------------------*/
function showFinal() {
  quizEl.innerHTML = "";

  const title = document.createElement("h2");
  title.textContent = "Fim do quiz!";
  quizEl.appendChild(title);

  const result = document.createElement("p");
  result.textContent = `Você acertou ${score} de ${questions.length} perguntas.`;
  quizEl.appendChild(result);

  const tip = document.createElement("p");
  tip.className = "muted";
  tip.textContent = "Clique em 'Reiniciar quiz' para tentar novamente.";
  quizEl.appendChild(tip);
}

/* -----------------------------
   8) Reinício do quiz
   - Zera estado e re-renderiza
------------------------------*/
function restart() {
  currentIndex = 0;
  score = 0;
  updateProgress();
  renderQuestion();
}