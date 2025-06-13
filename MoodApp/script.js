const quotes = {
  happy: [
    "Happiness is not something ready made. It comes from your own actions.",
    "The purpose of our lives is to be happy.",
    "Happiness depends upon ourselves."
  ],
  sad: [
    "Tears come from the heart and not from the brain.",
    "Every human walks around with a certain kind of sadness.",
    "Sadness flies away on the wings of time."
  ],
  inspired: [
    "The best way to get started is to quit talking and begin doing.",
    "Don’t watch the clock; do what it does. Keep going.",
    "Success usually comes to those who are too busy to be looking for it."
  ],
  angry: [
    "For every minute you remain angry, you give up sixty seconds of peace of mind.",
    "Speak when you are angry and you will make the best speech you will ever regret.",
    "Anger doesn’t solve anything. It builds nothing, but it can destroy everything."
  ],
  calm: [
    "Nothing can bring you peace but yourself.",
    "Peace begins with a smile.",
    "The nearer a man comes to a calm mind, the closer he is to strength."
  ]
};

const emojis = {
  happy: "🙂",
  sad: "😢",
  inspired: "💡",
  angry: "😠",
  calm: "😌"
};

const bgColors = {
  happy: "#FFEB99",
  sad: "#A0C4FF",
  inspired: "#FFD6A5",
  angry: "#FFADAD",
  calm: "#B9FBC0"
};

const moodButtons = document.querySelectorAll('.mood-btn');
const quoteBox = document.getElementById('quote');
const statsBtn = document.getElementById('statsBtn');
const statsPanel = document.getElementById('statsPanel');
const statsList = document.getElementById('statsList');
const countsList = document.getElementById('countsList');

const today = new Date().toISOString().slice(0, 10);
const selectedMoodToday = localStorage.getItem('mood-date') === today;

if (selectedMoodToday) {
  const mood = localStorage.getItem('mood-choice');
  const quote = localStorage.getItem('mood-quote');
  quoteBox.textContent = `"${quote}"`;
  quoteBox.style.backgroundColor = bgColors[mood];
  moodButtons.forEach(btn => {
    if (btn.dataset.mood === mood) btn.classList.add('selected');
    btn.disabled = true;
  });
}

moodButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (localStorage.getItem('mood-date') === today) return;
    const mood = button.dataset.mood;
    const randomQuote = quotes[mood][Math.floor(Math.random() * quotes[mood].length)];
    quoteBox.textContent = `"${randomQuote}"`;
    quoteBox.style.backgroundColor = bgColors[mood];
    localStorage.setItem('mood-date', today);
    localStorage.setItem('mood-choice', mood);
    localStorage.setItem('mood-quote', randomQuote);

    const stats = JSON.parse(localStorage.getItem('mood-stats') || '{}');
    stats[today] = mood;
    localStorage.setItem('mood-stats', JSON.stringify(stats));

    moodButtons.forEach(btn => {
      btn.classList.remove('selected');
      btn.disabled = true;
    });
    button.classList.add('selected');
  });
});

statsBtn.addEventListener('click', () => {
  const stats = JSON.parse(localStorage.getItem('mood-stats') || '{}');
  statsList.innerHTML = '';
  countsList.innerHTML = '';
  const thisMonth = new Date().toISOString().slice(0, 7);
  const moodCounts = {};

  Object.keys(stats).forEach(date => {
    if (date.startsWith(thisMonth)) {
      const mood = stats[date];
      const li = document.createElement('li');
      li.textContent = `${date}: ${emojis[mood]}`;
      statsList.appendChild(li);
      moodCounts[mood] = (moodCounts[mood] || 0) + 1;
    }
  });

  for (const mood in moodCounts) {
    const countLine = document.createElement('div');
    countLine.textContent = `${emojis[mood]}: ${moodCounts[mood]}`;
    countsList.appendChild(countLine);
  }

  statsPanel.style.display = statsPanel.style.display === 'block' ? 'none' : 'block';
});
