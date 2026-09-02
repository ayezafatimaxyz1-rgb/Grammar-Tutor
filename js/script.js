// ===== Mobile nav toggle =====
const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');

navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

mainNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ===== Footer year =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Grammar tip of the day =====
const tips = [
  "“Fewer” is for things you can count (fewer apples); “less” is for things you can't (less time).",
  "“It's” is short for “it is” or “it has.” “Its” shows possession — no apostrophe needed.",
  "“They're” = they are. “Their” shows possession. “There” refers to a place.",
  "Use “who” for subjects and “whom” for objects: “Who called?” vs “To whom should I speak?”",
  "“Affect” is usually a verb (to influence); “effect” is usually a noun (a result).",
  "The present perfect (“I have finished”) links the past to now — the simple past (“I finished”) doesn't.",
  "“Between you and me,” not “between you and I” — prepositions take object pronouns.",
  "A comma splice joins two full sentences with just a comma. Use a period, semicolon, or conjunction instead.",
  "“Who's” means “who is” or “who has.” “Whose” shows possession.",
  "Avoid double negatives: say “I don't have any”, not “I don't have none.”",
];

const tipText = document.getElementById('tip-text');
const tipBtn = document.getElementById('tip-btn');
let lastTipIndex = -1;

function showRandomTip() {
  let index;
  do {
    index = Math.floor(Math.random() * tips.length);
  } while (index === lastTipIndex && tips.length > 1);
  lastTipIndex = index;
  tipText.textContent = tips[index];
}

tipBtn.addEventListener('click', showRandomTip);
showRandomTip();

// ===== Quiz =====
const quizQuestions = [
  {
    question: "Which sentence uses “fewer” correctly?",
    options: [
      "There are fewer books on the shelf.",
      "There is fewer water in the glass.",
      "She has fewer patience than me.",
    ],
    correctIndex: 0,
    explanation: "“Fewer” is for countable nouns like “books.” Use “less” for uncountable nouns like water or patience.",
  },
  {
    question: "Choose the correct option: “___ going to the store later.”",
    options: ["Their", "There", "They're"],
    correctIndex: 2,
    explanation: "“They're” is short for “they are,” which fits here: “They are going to the store later.”",
  },
  {
    question: "Which sentence is grammatically correct?",
    options: [
      "Me and him went to the lab.",
      "He and I went to the lab.",
      "Him and I went to the lab.",
    ],
    correctIndex: 1,
    explanation: "Subject pronouns (“he,” “I”) are used as the subject of a sentence, not object pronouns like “me” or “him.”",
  },
  {
    question: "Which uses the present perfect correctly?",
    options: [
      "I have seen that movie already.",
      "I have saw that movie already.",
      "I has seen that movie already.",
    ],
    correctIndex: 0,
    explanation: "Present perfect = have/has + past participle. “Have seen” is correct; “saw” is simple past, not a participle.",
  },
  {
    question: "Which sentence avoids the double negative?",
    options: [
      "I don't have no time.",
      "I don't have any time.",
      "I haven't got no time.",
    ],
    correctIndex: 1,
    explanation: "English generally avoids stacking two negatives. “Don't have any” expresses the same idea correctly.",
  },
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const quizQuestionEl = document.getElementById('quiz-question');
const quizOptionsEl = document.getElementById('quiz-options');
const quizFeedbackEl = document.getElementById('quiz-feedback');
const quizNextBtn = document.getElementById('quiz-next');
const quizScoreEl = document.getElementById('quiz-score');
const quizTotalEl = document.getElementById('quiz-total');
const quizProgressText = document.getElementById('quiz-progress-text');
const progressFill = document.getElementById('progress-fill');

quizTotalEl.textContent = quizQuestions.length;

function loadQuestion() {
  answered = false;
  quizFeedbackEl.textContent = '';
  quizNextBtn.disabled = true;
  quizNextBtn.innerHTML = currentQuestion === quizQuestions.length - 1
    ? 'See Results <i class="fa-solid fa-flag-checkered"></i>'
    : 'Next Question <i class="fa-solid fa-arrow-right"></i>';

  const q = quizQuestions[currentQuestion];
  quizQuestionEl.textContent = q.question;
  quizProgressText.textContent = `Question ${currentQuestion + 1} of ${quizQuestions.length}`;
  progressFill.style.width = `${((currentQuestion) / quizQuestions.length) * 100}%`;

  quizOptionsEl.innerHTML = '';
  q.options.forEach((option, i) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option';
    btn.type = 'button';
    btn.textContent = option;
    btn.addEventListener('click', () => selectAnswer(i, btn));
    quizOptionsEl.appendChild(btn);
  });
}

function selectAnswer(selectedIndex, btnEl) {
  if (answered) return;
  answered = true;
  const q = quizQuestions[currentQuestion];
  const allButtons = quizOptionsEl.querySelectorAll('.quiz-option');
  allButtons.forEach((b) => (b.disabled = true));

  if (selectedIndex === q.correctIndex) {
    btnEl.classList.add('correct');
    score += 1;
    quizFeedbackEl.textContent = `Correct! ${q.explanation}`;
  } else {
    btnEl.classList.add('incorrect');
    allButtons[q.correctIndex].classList.add('correct');
    quizFeedbackEl.textContent = `Not quite. ${q.explanation}`;
  }

  quizScoreEl.textContent = score;
  quizNextBtn.disabled = false;
}

quizNextBtn.addEventListener('click', () => {
  currentQuestion += 1;
  if (currentQuestion >= quizQuestions.length) {
    quizQuestionEl.textContent = `You scored ${score} out of ${quizQuestions.length}!`;
    quizOptionsEl.innerHTML = '';
    quizFeedbackEl.textContent = score === quizQuestions.length
      ? 'Perfect score — grammar pro! Follow along on Instagram for more practice.'
      : 'Nice effort! Follow along on Instagram for daily practice like this.';
    quizNextBtn.style.display = 'none';
    progressFill.style.width = '100%';
    quizProgressText.textContent = 'Quiz complete';

    const restartBtn = document.createElement('button');
    restartBtn.className = 'btn btn-outline btn-sm';
    restartBtn.type = 'button';
    restartBtn.innerHTML = '<i class="fa-solid fa-rotate-left"></i> Retake Quiz';
    restartBtn.addEventListener('click', () => {
      currentQuestion = 0;
      score = 0;
      quizScoreEl.textContent = '0';
      quizNextBtn.style.display = '';
      loadQuestion();
    });
    quizOptionsEl.appendChild(restartBtn);
    return;
  }
  loadQuestion();
});

loadQuestion();

// ===== Instagram-style feed grid =====
const feedPosts = [
  { cat: 'Grammar Basics', title: 'Affect vs. Effect', gradient: 'linear-gradient(160deg,#14213d,#3a4d78)' },
  { cat: 'Common Mistakes', title: "Their / There / They're", gradient: 'linear-gradient(160deg,#1f3358,#b8863f)' },
  { cat: 'Tenses', title: 'Present Perfect Simple', gradient: 'linear-gradient(160deg,#14213d,#5b6478)' },
  { cat: 'Punctuation', title: 'The Oxford Comma', gradient: 'linear-gradient(160deg,#3a4d78,#14213d)' },
  { cat: 'Word Choice', title: 'Who vs. Whom', gradient: 'linear-gradient(160deg,#b8863f,#14213d)' },
  { cat: 'Writing Tips', title: 'Fixing Comma Splices', gradient: 'linear-gradient(160deg,#14213d,#d9b978)' },
];

const feedGrid = document.getElementById('feed-grid');

feedPosts.forEach((post) => {
  const a = document.createElement('a');
  a.className = 'feed-post';
  a.style.background = post.gradient;
  a.href = 'https://instagram.com/sarwars.english.lab';
  a.target = '_blank';
  a.rel = 'noopener';
  a.setAttribute('aria-label', `${post.title} — view on Instagram`);
  a.innerHTML = `
    <span class="feed-post-overlay">
      <i class="fa-regular fa-heart"></i>
      <i class="fa-regular fa-comment"></i>
    </span>
    <span>
      <span class="feed-post-cat">${post.cat}</span>
      <span class="feed-post-title">${post.title}</span>
    </span>
  `;
  feedGrid.appendChild(a);
});
