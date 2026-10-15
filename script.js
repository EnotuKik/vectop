// ==========================================
// БАЗА ДАНИХ ТА СТРУКТУРА КЛАСІВ (ЧАСТИНА 1)
// ==========================================
const schoolDatabase = {
    "8": { algebra: [], geometry: [] },
    "9": {
        algebra: [
            { id: "9-inequalities-single", title: "📈 1. Лінійні та квадратні нерівності", theory: "При множенні або діленні нерівності на від'ємне число знак нерівності перевертається." },
            { id: "9-inequalities-systems", title: "⛓ 2. Системи нерівностей", theory: "Розв'язком системи нерівностей є перетин проміжків кожної нерівності." },
            { id: "9-inequalities-totality", title: "🔏 3. Сукупності нерівностей", theory: "Сукупність означає об'єднання розв'язків кожної нерівності разом." }
        ],
        geometry: []
    },
    "10": { algebra: [], geometry: [] },
    "11": { algebra: [], geometry: [] }
};

const positivePhrases = [
    "Чудова робота! Ти демонструєш справжній інженерний потенціал! ✨",
    "Блискуче! Твій рівень логіки ідеально підходить для фізмат напрямку Лиги Плюща! 🚀",
    "Приголомшливий результат. Ти бачиш математику глибше, ніж більшість! 🧠",
    "Просто неймовірно! З такою базою НМТ буде складено на максимум. 🌟"
];

const negativePhrases = [
    "Потрібно ще потренуватися. Зосередься на правилах інтервалів і знаках скобок! 📐",
    "Математика любить практику. Спробуй пройти тест ще раз, і результат точно буде кращим! 🔧",
    "Помилки — це частина навчання. Прочитай розбір завдань нижче і розберися в деталях. 💡"
];

let currentClass = "";
let currentTopicId = "";
let taskIndex = 0;
let correctCount = 0;
let sessionTasks = [];
let currentMode = "easy"; 

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(`screen-${screenId}`).classList.add('active');
}

function toggleMenu() { document.getElementById('side-menu').classList.toggle('open'); }
function toggleTheme() {
    const htmlNode = document.documentElement;
    htmlNode.setAttribute('data-theme', htmlNode.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
}

function goFromMenu(classNum) { toggleMenu(); selectClass(classNum); }

function selectClass(classNum) {
    currentClass = classNum;
    document.getElementById('class-title-display').innerText = `${classNum} Клас — Програма`;
    const algContainer = document.getElementById('algebra-topics');
    const geomContainer = document.getElementById('geometry-topics');
    algContainer.innerHTML = ""; geomContainer.innerHTML = "";
    
    if (schoolDatabase[classNum].algebra.length === 0) algContainer.innerHTML = "<p class='hint-text'>Матеріали додаються...</p>";
    schoolDatabase[classNum].algebra.forEach(topic => {
        const btn = document.createElement('button');
        btn.className = "topic-item-btn";
        btn.innerHTML = `${topic.title} <span>➔</span>`;
        btn.onclick = () => startLesson(topic.id, "easy");
        algContainer.appendChild(btn);
    });
    if (schoolDatabase[classNum].geometry.length === 0) geomContainer.innerHTML = "<p class='hint-text'>Матеріали додаються...</p>";
    showScreen('topics');
}

function generateSessionTasks(topicId, mode) {
    let list = [];
    currentMode = mode;

    if (topicId === "9-inequalities-single") {
        for (let i = 0; i < 6; i++) {
            let val = Math.floor(Math.random() * 4) + 2; 
            let aParam = Math.floor(Math.random() * 4) + 2; 
            
            if (mode === "easy") {
                if (i % 2 === 0) {
                    list.push({
                        type: "text", html: `Розв'яжіть лінійну нерівність: <b>-${val}x < ${val * 3}</b>. Запишіть отриманий проміжок.`,
                        ans: "(-3;∞)", left: -3, right: 99, leftInclude: false, rightInclude: false,
                        explain: `При діленні на від'ємне число -${val} знак змінюється з < на >. Отримуємо x > -3. Проміжок: від -3 до плюс нескінченності.`
                    });
                } else {
                    list.push({
                        type: "text", html: `Знайдіть НАЙБІЛЬШИЙ цілий розв'язок квадратної нерівності: <b>x² ≤ ${val * val}</b>.`,
                        ans: `${val}`, left: -val, right: val, leftInclude: true, rightInclude: true,
                        explain: `Розв'язком нерівності є відрізок [-${val}; ${val}]. Найбільшим цілим числом у цьому інтервалі є число ${val}.`
                    });
                }
            } else {
                if (i % 2 === 0) {
                    list.push({
                        type: "fraction", num: `x - ${val}`, den: `x + ${val + 2}`, post: "≤ 0",
                        q: "Розв'яжіть дробову нерівність методом інтервалів. Запишіть отриманий проміжок.",
                        ans: `(-${val+2};${val}]`, left: -(val+2), right: val, leftInclude: false, rightInclude: true,
                        explain: `Нуль чисельника: x = ${val} (включається). Нуль знаменника: x = -${val+2} (виколота точка, бо ділити на 0 не можна).`
                    });
                } else {
                    let dVal = aParam * 2;
                    let correctA = (dVal * dVal) / 4;
                    list.push({
                        type: "text", html: `🔥 [Параметри] При якому значенні параметра <b>а</b> квадратна нерівність <b>x² - ${dVal}x + a ≥ 0</b> має рівно ОДИН дійсний розв'язок?`,
                        ans: `${correctA}`, left: -99, right: 99, leftInclude: false, rightInclude: false,
                        explain: `Квадратний тричлен має один корінь, коли його дискримінант дорівнює нулю: D = b² - 4ac = 0. Звідси отримуємо а = ${correctA}.`
                    });
                }
            }
        }
    } else if (topicId === "9-inequalities-systems") {
        for (let i = 0; i < 6; i++) {
            let leftVal = Math.floor(Math.random() * 3) - 1; 
            let rightVal = Math.floor(Math.random() * 3) + 5; 
            
            if (mode === "easy") {
                if (i % 2 === 0) {
                    list.push({
                        type: "system", lines: [`x > ${leftVal}`, `x ≤ ${rightVal}`], q: "Розв'яжіть систему нерівностей та запишіть проміжок перетину.",
                        ans: `(${leftVal};${rightVal}]`, left: leftVal, right: rightVal, leftInclude: false, rightInclude: true,
                        explain: `Спільною зоною перетину для обох умов є проміжок від ${leftVal} до ${rightVal} включно.`
                    });
                } else {
                    let count = rightVal - leftVal;
                    list.push({
                        type: "system", lines: [`x > ${leftVal}`, `x ≤ ${rightVal}`], q: "Знайдіть КІЛЬКІСТЬ цілих розв'язків цієї системи нерівностей.",
                        ans: `${count}`, left: leftVal, right: rightVal, leftInclude: false, rightInclude: true,
                        explain: `Рахуємо цілі числа в інтервалі (${leftVal}; ${rightVal}]. Їх кількість дорівнює ${count}.`
                    });
                }
            } else {
                if (i % 2 === 0) {
                    list.push({
                        type: "system", lines: [`x - ${rightVal} ≥ 0`, `${rightVal + 4} - x > 0`], q: "Знайдіть область визначення функції (ОДЗ) <b>y = √(x - " + rightVal + ") + 1/√(" + (rightVal + 4) + " - x)</b>. Запишіть інтервал.",
                        ans: `[${rightVal};${rightVal+4})`, left: rightVal, right: rightVal+4, leftInclude: true, rightInclude: false,
                        explain: `Перший корінь вимагає x ≥ ${rightVal}. Другий корінь у знаменнику вимагає x < ${rightVal+4}. Перетин: [${rightVal}; ${rightVal+4}).`
                    });
                } else {
                    list.push({
                        type: "system", lines: [`x > ${rightVal}`, `x < a`], q: "🔥 [Параметри] При якому найменшому цілому значенні параметра <b>а</b> system нерівностей має хоча б один спільний розв'язок?",
                        ans: `${rightVal + 1}`, left: -99, right: 99, leftInclude: false, rightInclude: false,
                        explain: `Щоб інтервали перетиналися, параметр 'а' має бути строго більшим за ${rightVal}. Найменше ціле число — це ${rightVal + 1}.`
                    });
                }
            }
        }
    } else if (topicId === "9-inequalities-totality") {
        for (let i = 0; i < 6; i++) {
            let leftVal = Math.floor(Math.random() * 2) - 4; 
            let rightVal = Math.floor(Math.random() * 2) + 3; 
            
            if (mode === "easy") {
                if (i % 2 === 0) {
                    list.push({
                        type: "totality", lines: [`x ≤ ${leftVal}`, `x ≥ ${rightVal}`], q: "Розв'яжіть сукупність. Запишіть об'єднання проміжків через кому без пробілів.",
                        ans: `(-∞;${leftVal}],[${rightVal};∞)`, left: leftVal, right: rightVal, leftInclude: true, rightInclude: true, isTotalityFlag: true,
                        explain: `Сукупність об'єднує всі розв'язки разом, утворюючи два окремих промені.`
                    });
                } else {
                    list.push({
                        type: "totality", lines: [`x < ${leftVal}`, `x ≥ ${leftVal - 2}`], q: "Знайдіть підсумковий об'єднаний проміжок для цієї сукупності.",
                        ans: "(-∞;∞)", left: -99, right: 99, leftInclude: false, rightInclude: false,
                        explain: `Проміжки спрямовані в протилежні боки і повністю перекривають всю числову пряму.`
                    });
                }
            } else {
                if (i % 2 === 0) {
                    let skippedCount = (rightVal - leftVal) - 1;
                    list.push({
                        type: "totality", lines: [`x < ${leftVal}`, `x > ${rightVal}`], q: "🔥 Скільки цілих чисел НЕ є розв'язком цієї сукупності нерівностей?",
                        ans: `${skippedCount + 2}`, left: leftVal, right: rightVal, leftInclude: false, rightInclude: false, isTotalityFlag: true,
                        explain: `Нам не підходить проміжок [${leftVal}; ${rightVal}]. Рахуємо цілі числа всередині порожньої зони разом з межами: всього ${skippedCount + 2} чисел.`
                    });
                } else {
                    list.push({
                        type: "totality", lines: [`x < ${leftVal}`, `x ≥ ${leftVal}`], q: "Визначіть об'єднаний розв'язок сукупності.",
                        ans: "(-∞;∞)", left: -99, right: 99, leftInclude: false, rightInclude: false,
                        explain: `Сукупність повністю покриває вісь Ox. Відповідь: від мінус до плюс нескінченності.`
                    });
                }
            }
        }
    }
    return list;
}

function startLesson(topicId, mode) {
    currentTopicId = topicId;
    taskIndex = 0;
    correctCount = 0;
    sessionTasks = generateSessionTasks(topicId, mode); 
    
    const topicData = schoolDatabase['9'].algebra.find(t => t.id === topicId);
    document.getElementById('lesson-title').innerText = topicData.title;
    document.getElementById('lesson-theory').innerHTML = topicData.theory;
    
    document.getElementById('practice-card').style.display = "block";
    document.getElementById('result-card').style.display = "none";
    document.getElementById('step-badge').innerText = mode === "easy" ? "Крок 2: 🤖 ШІ-Тестування (Базове)" : "🔥 Крок 2: Ускладнений рівень (Параметри & Дроби)";
    
    showQuestion();
    showScreen('lesson');
}

function showQuestion() {
    const task = sessionTasks[taskIndex];
    document.getElementById('task-number').innerText = `${taskIndex + 1} з ${sessionTasks.length}`;
    const wrapper = document.getElementById('math-wrapper');
    wrapper.className = "math-layout";
    
    if (task.type === "system" || task.type === "totality") {
        wrapper.classList.add(task.type === "system" ? "math-system" : "math-totality");
        let linesHtml = task.lines.map(line => `<div>${line}</div>`).join('');
        wrapper.innerHTML = `<div class="math-lines">${linesHtml}</div><p class="question-text" style="margin-left:25px;">${task.q}</p>`;
    } else if (task.type === "fraction") {
        wrapper.innerHTML = `<p class="question-text" style="margin-right: 15px;">${task.q}</p> <div class="math-fraction"> <div class="fraction-numerator">${task.num}</div> <div class="fraction-denominator">${task.den}</div> </div> <p class="question-text" style="margin-left: 10px;">${task.post}</p>`;
    } else {
        wrapper.innerHTML = `<p class="question-text">${task.html}</p>`;
    }
    clearMathInput();
}

function insertMath(char) {
    const input = document.getElementById('user-answer');
    input.value += char;
    input.focus();
}
function clearMathInput() { document.getElementById('user-answer').value = ""; }

function submitAnswer() {
    const task = sessionTasks[taskIndex];
    const uAns = document.getElementById('user-answer').value.replace(/\s+/g, '');
    if (!uAns) { alert("Введіть відповідь!"); return; }
    
    if (uAns === task.ans) correctCount++;
    taskIndex++;
    
    if (taskIndex >= sessionTasks.length) showResults();
    else showQuestion();
}

function createSvgAxis(left, right, leftInc, rightInc, isTotality) {
    let leftX = 140;
    let rightX = 270;
    let strokeHtml = "";
    
    if (isTotality) {
        strokeHtml += `<line x1="20" y1="25" x2="${leftX}" y2="25" stroke="#ef4444" stroke-width="6" stroke-dasharray="2,4"/>`;
        strokeHtml += `<line x1="${rightX}" y1="25" x2="370" y2="25" stroke="#ef4444" stroke-width="6" stroke-dasharray="2,4"/>`;
    } else {
        let startX = left === -99 ? 20 : leftX;
        let endX = right === 99 ? 370 : rightX;
        strokeHtml += `<line x1="${startX}" y1="25" x2="${endX}" y2="25" stroke="#3b82f6" stroke-width="6" stroke-dasharray="2,4"/>`;
    }

    let leftCircle = left !== -99 ? `<circle cx="${leftX}" cy="25" r="5" fill="${leftInc ? 'var(--text-main)' : 'var(--card-bg)'}" stroke="${isTotality ? '#ef4444' : '#3b82f6'}" stroke-width="2"/> <text x="${leftX-8}" y="44" fill="var(--text-main)" font-size="12" font-weight="bold">${left}</text>` : "";
    let rightCircle = right !== 99 ? `<circle cx="${rightX}" cy="25" r="5" fill="${rightInc ? 'var(--text-main)' : 'var(--card-bg)'}" stroke="${isTotality ? '#ef4444' : '#3b82f6'}" stroke-width="2"/> <text x="${rightX-8}" y="44" fill="var(--text-main)" font-size="12" font-weight="bold">${right}</text>` : "";

    return `
        <svg class="axis-svg" viewBox="0 0 400 50">
            <line x1="10" y1="25" x2="390" y2="25" stroke="var(--text-muted)" stroke-width="2"/>
            <polygon points="390,21 400,25 390,29" fill="var(--text-muted)"/>
            <text x="385" y="15" fill="var(--text-muted)" font-size="12">x</text>
            \${strokeHtml}
            ${leftCircle}
            ${rightCircle}
        </svg>
    `;
}

function showResults() {
    document.getElementById('practice-card').style.display = "none";
    document.getElementById('result-card').style.display = "block";
    
    let finalGrade = Math.round((correctCount / sessionTasks.length) * 12);
    document.getElementById('score-val').innerText = finalGrade;
    
    const smallFeedback = document.getElementById('score-feedback-small');
    const hardBtn = document.getElementById('btn-hard-level');

    if (finalGrade >= 9) {
        let randIdx = Math.floor(Math.random() * positivePhrases.length);
        smallFeedback.innerText = positivePhrases[randIdx];
        smallFeedback.style.color = "#10b981";
    } else {
        let randIdx = Math.floor(Math.random() * negativePhrases.length);
        smallFeedback.innerText = negativePhrases[randIdx];
        smallFeedback.style.color = "#ef4444";
    }

    if (currentMode === "easy") {
        hardBtn.style.display = "inline-block";
    } else {
        hardBtn.style.display = "none";
    }

    const reviewZone = document.getElementById('solutions-review-zone');
    reviewZone.innerHTML = "";
    
    sessionTasks.forEach((task, index) => {
        const item = document.createElement('div');
        item.className = "review-item";
        
        let visualAxis = createSvgAxis(task.left, task.right, task.leftInclude, task.rightInclude, task.isTotalityFlag);
        let taskCondition = task.html || `${task.lines.join('; ')} ➔ ${task.q}`;

        item.innerHTML = `
            <h4>Завдання №\${index + 1}</h4>
            <p style="color:var(--text-muted); font-size:0.95rem;">Умова: \${taskCondition}</p>
            <p>Правильна відповідь: <b style="color:var(--success); font-size:1.15rem;">\${task.ans}</b></p>
            \${visualAxis}
            <div class="review-explain">
                <b>💡 Покроковий розбір:</b><br>\&nbsp;\${task.explain}
            </div>
        `;
        reviewZone.appendChild(item);
    });
}

function startHardLevel() {
    startLesson(currentTopicId, "hard");
}
