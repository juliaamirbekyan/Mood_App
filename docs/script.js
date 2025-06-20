const quotes = {
  happy: [
    "«Երջանկությունը կաթիլ է լույսի, որ ծնվում է սրտիդ մեջ ու տարածվում աշխարհով մեկ»",
    "«Ջերմ ժպիտը հոգու արևն է․ թող այն այսօր չմարի»",
    "«Երբ շնորհակալ ես, նույնիսկ սովորական օրը դառնում է տոն»"
  ],
  sad: [
    "«Տխրությունն անցողիկ մառախուղ է․ մաքուր հոգին վերջում միշտ գտնում է արևը»",
    "«Արցունքն ազատություն է, որ սիրտն է շնորհում աչքերին»",
    "«Տխուր գիշերվա ավարտին միշտ ծագում է նոր լուսաբաց»"
  ],
  inspired: [
    "«Երթա՛ առաջ, քամին միշտ հռնդում է խիզախ ճանապարհորդի թիկունքին»",
    "«Նպատակը լույս է, որ կուրացնում է կասկածներին»",
    "«Մեծ խորհուրդները սկսվում են փոքր քայլից, բայց հաստատակամ»"
  ],
  angry: [
    "«Զայրույթը կրակ է, որ առաջինը այրում է իր տան տերը»",
    "«Մեկ խորը շունչը կարող է փրկել հազար ափսոսանք»",
    "«Բառերը, որ արտասանվում են զայրացած, դառնում են քար, իսկ լռությունը՝ հանգչած հուր»"
  ],
  calm: [
    "«Խաղաղ հոգին ջրի հայելի է, որում ամբոխված երկինքը պարզ է»",
    "«Լռության մեջ կարելի է լսել սրտի իսկական զարկերը»",
    "«Հանգստությունը ուժի ամենահզոր ձևն է՝ անտես, բայց անխորտակելի»"
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
