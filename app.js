// ─── 상태 ─────────────────────────────────────────────────────
let currentLang = 'both';
let currentLevel = 'all';
let currentTopicIdx = null;

// ─── DOM ──────────────────────────────────────────────────────
const homeView   = document.getElementById('homeView');
const studyView  = document.getElementById('studyView');
const topicGrid  = document.getElementById('topicGrid');
const studyTitle = document.getElementById('studyTitle');
const studyLevel = document.getElementById('studyLevel');
const phraseBody = document.getElementById('phraseBody');
const quizPreview= document.getElementById('quizPreview');
const hideBtns   = document.getElementById('hideBtns');

// ─── 언어 토글 ────────────────────────────────────────────────
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentLang = btn.dataset.lang;
    if (currentTopicIdx !== null) renderStudy(currentTopicIdx);
    updateTableHeaders();
  });
});

// ─── 레벨 필터 ───────────────────────────────────────────────
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentLevel = btn.dataset.level;
    renderTopicGrid();
  });
});

// ─── 뒤로 가기 ───────────────────────────────────────────────
document.getElementById('backBtn').addEventListener('click', () => {
  studyView.classList.add('hidden');
  homeView.classList.remove('hidden');
  currentTopicIdx = null;
});

// ─── PDF 저장 ─────────────────────────────────────────────────
document.getElementById('pdfBtn').addEventListener('click', () => {
  if (currentTopicIdx === null) return;
  generatePDF(currentTopicIdx);
});

// ─── 주제 그리드 렌더링 ───────────────────────────────────────
function renderTopicGrid() {
  topicGrid.innerHTML = '';
  const filtered = currentLevel === 'all'
    ? TOPICS
    : TOPICS.filter(t => t.level === currentLevel);

  filtered.forEach((topic, i) => {
    const realIdx = TOPICS.indexOf(topic);
    const card = document.createElement('div');
    card.className = 'topic-card';
    card.innerHTML = `
      <span class="badge ${badgeClass(topic.level)}">${topic.level}</span>
      <h3>${topic.title}</h3>
      <p>${topic.desc}</p>
    `;
    card.addEventListener('click', () => openStudy(realIdx));
    topicGrid.appendChild(card);
  });
}

function badgeClass(level) {
  if (level === '중급') return 'mid';
  if (level === '비즈니스') return 'biz';
  return '';
}

// ─── 학습 뷰 열기 ─────────────────────────────────────────────
function openStudy(idx) {
  currentTopicIdx = idx;
  homeView.classList.add('hidden');
  studyView.classList.remove('hidden');
  renderStudy(idx);
  window.scrollTo(0, 0);
}

// ─── 학습 뷰 렌더링 ───────────────────────────────────────────
function renderStudy(idx) {
  const topic = TOPICS[idx];

  studyTitle.textContent = topic.title;
  studyLevel.textContent = topic.level;
  studyLevel.className = 'badge ' + badgeClass(topic.level);

  renderHideBtns();
  renderPhraseTable(topic);
  renderQuizPreview(topic);
  updateTableHeaders();
}

// ─── 숨기기 버튼 ──────────────────────────────────────────────
function renderHideBtns() {
  hideBtns.innerHTML = '';
  const cols = getActiveCols();

  cols.forEach(col => {
    const label = col === 'en' ? '영어 숨기기' : col === 'zh' ? '중국어 숨기기' : '발음 숨기기';
    const btn = document.createElement('button');
    btn.className = 'hide-btn';
    btn.dataset.col = col;
    btn.textContent = label;
    btn.addEventListener('click', () => toggleCol(col, btn));
    hideBtns.appendChild(btn);
  });
}

function getActiveCols() {
  if (currentLang === 'en') return ['en'];
  if (currentLang === 'zh') return ['zh', 'py'];
  return ['en', 'zh', 'py'];
}

function toggleCol(col, btn) {
  const cells = document.querySelectorAll(`.col-${col}`);
  const isHidden = btn.classList.contains('hidden-active');

  if (isHidden) {
    cells.forEach(c => c.classList.remove('col-hidden'));
    btn.classList.remove('hidden-active');
    btn.textContent = col === 'en' ? '영어 숨기기' : col === 'zh' ? '중국어 숨기기' : '발음 숨기기';
  } else {
    cells.forEach(c => c.classList.add('col-hidden'));
    btn.classList.add('hidden-active');
    btn.textContent = col === 'en' ? '영어 보기' : col === 'zh' ? '중국어 보기' : '발음 보기';
  }
}

// ─── 표 렌더링 ────────────────────────────────────────────────
function updateTableHeaders() {
  const thEn = document.querySelector('th.col-en');
  const thZh = document.querySelector('th.col-zh');
  const thPy = document.querySelector('th.col-py');

  const showEn = currentLang === 'en' || currentLang === 'both';
  const showZh = currentLang === 'zh' || currentLang === 'both';
  const showPy = currentLang === 'zh' || currentLang === 'both';

  thEn.classList.toggle('col-hidden', !showEn);
  thZh.classList.toggle('col-hidden', !showZh);
  thPy.classList.toggle('col-hidden', !showPy);
}

function renderPhraseTable(topic) {
  phraseBody.innerHTML = '';
  const showEn = currentLang === 'en' || currentLang === 'both';
  const showZh = currentLang === 'zh' || currentLang === 'both';
  const showPy = currentLang === 'zh' || currentLang === 'both';

  topic.phrases.forEach(p => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="ko">${p.ko}</td>
      <td class="en col-en${showEn ? '' : ' col-hidden'}">${p.en}</td>
      <td class="zh col-zh${showZh ? '' : ' col-hidden'}">${p.zh}</td>
      <td class="py col-py${showPy ? '' : ' col-hidden'}">${p.py}</td>
    `;
    phraseBody.appendChild(tr);
  });
}

// ─── 퀴즈 미리보기 ────────────────────────────────────────────
function renderQuizPreview(topic) {
  quizPreview.innerHTML = '';
  topic.quiz.forEach((q, i) => {
    const showEn = currentLang === 'en' || currentLang === 'both';
    const showZh = currentLang === 'zh' || currentLang === 'both';

    const div = document.createElement('div');
    div.className = 'quiz-item';
    div.innerHTML = `
      <div class="quiz-num">Q${i + 1}</div>
      <div class="quiz-ko">${q.ko}</div>
      <div class="quiz-blank">
        ${showEn ? `<div class="blank-row"><span class="blank-label">영어</span><div class="blank-line"></div></div>` : ''}
        ${showZh ? `<div class="blank-row"><span class="blank-label">중국어</span><div class="blank-line"></div></div>` : ''}
        ${showZh ? `<div class="blank-row"><span class="blank-label">발음</span><div class="blank-line"></div></div>` : ''}
      </div>
    `;
    quizPreview.appendChild(div);
  });
}

// ─── PDF 생성 ─────────────────────────────────────────────────
function generatePDF(idx) {
  const topic = TOPICS[idx];
  const showEn = currentLang === 'en' || currentLang === 'both';
  const showZh = currentLang === 'zh' || currentLang === 'both';
  const langLabel = currentLang === 'en' ? '영어' : currentLang === 'zh' ? '중국어' : '영어 + 중국어';
  const today = new Date().toLocaleDateString('ko-KR');

  const phraseRows = topic.phrases.map(p => `
    <tr>
      <td class="ko">${p.ko}</td>
      ${showEn ? `<td class="blank-cell"><div class="write-line"></div><div class="answer en">${p.en}</div></td>` : ''}
      ${showZh ? `<td class="blank-cell"><div class="write-line"></div><div class="answer zh">${p.zh}</div><div class="answer py">${p.py}</div></td>` : ''}
    </tr>
  `).join('');

  const quizItems = topic.quiz.map((q, i) => `
    <div class="quiz-item">
      <div class="quiz-num">Q${i + 1}</div>
      <div class="quiz-ko">${q.ko}</div>
      ${showEn ? `<div class="answer-area"><span class="lang-label">영어</span><div class="write-line"></div><div class="answer en">${q.en}</div></div>` : ''}
      ${showZh ? `<div class="answer-area"><span class="lang-label">중국어</span><div class="write-line"></div><div class="answer zh">${q.zh} <span class="py">${q.py}</span></div></div>` : ''}
    </div>
  `).join('');

  const html = `
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<title>${topic.title} 워크시트</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: -apple-system, 'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif;
    font-size: 13px;
    color: #1a1a2e;
    padding: 30px 40px;
  }
  /* 헤더 */
  .header {
    border-bottom: 3px solid #6c63ff;
    padding-bottom: 14px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  .header-left h1 { font-size: 22px; font-weight: 800; color: #6c63ff; }
  .header-left .sub { font-size: 12px; color: #888; margin-top: 4px; }
  .header-right { text-align: right; font-size: 12px; color: #888; line-height: 1.8; }

  /* 섹션 */
  .section { margin-bottom: 28px; }
  .section-title {
    font-size: 14px;
    font-weight: 700;
    color: #6c63ff;
    margin-bottom: 10px;
    padding: 6px 12px;
    background: #f0eeff;
    border-radius: 6px;
  }

  /* 표현 테이블 */
  table { width: 100%; border-collapse: collapse; }
  th {
    padding: 8px 10px;
    background: #f8f8fc;
    font-size: 11px;
    font-weight: 600;
    color: #666;
    border: 1px solid #e0e0e8;
    text-align: left;
  }
  td {
    padding: 8px 10px;
    border: 1px solid #e0e0e8;
    vertical-align: top;
  }
  td.ko { font-weight: 600; width: 35%; }
  td.blank-cell { width: ${showEn && showZh ? '32%' : '65%'}; }

  /* 쓰기 줄 */
  .write-line {
    border-bottom: 1.5px solid #ccc;
    height: 28px;
    margin-bottom: 4px;
  }

  /* 정답 (인쇄 시 숨김) */
  .answer { font-size: 10px; color: #bbb; margin-top: 2px; }
  .answer.en { color: #9999cc; }
  .answer.zh { color: #cc9999; }
  .answer.py { font-size: 9px; color: #ccc; }

  /* 퀴즈 */
  .quiz-item {
    padding: 12px 0;
    border-bottom: 1px solid #f0f0f0;
  }
  .quiz-item:last-child { border-bottom: none; }
  .quiz-num { font-size: 10px; color: #aaa; margin-bottom: 3px; }
  .quiz-ko { font-weight: 700; font-size: 14px; margin-bottom: 8px; }
  .answer-area {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    margin-bottom: 6px;
  }
  .lang-label {
    font-size: 10px;
    color: #999;
    width: 40px;
    flex-shrink: 0;
    padding-top: 6px;
  }
  .answer-area .write-line { flex: 1; }
  .answer-area .answer { flex: 1; }

  /* 메모 */
  .memo-lines { display: flex; flex-direction: column; gap: 16px; }
  .memo-line { border-bottom: 1px solid #ddd; height: 24px; }

  /* 인쇄 설정 */
  @media print {
    body { padding: 20px 30px; }
    .answer { display: none; }
  }

  @page {
    size: A4;
    margin: 15mm;
  }
</style>
</head>
<body>
  <div class="header">
    <div class="header-left">
      <h1>${topic.title}</h1>
      <div class="sub">Language Study · ${langLabel} · ${topic.level}</div>
    </div>
    <div class="header-right">
      날짜: ${today}<br/>
      이름: _______________
    </div>
  </div>

  <!-- 핵심 표현 -->
  <div class="section">
    <div class="section-title">핵심 표현 학습</div>
    <table>
      <thead>
        <tr>
          <th>한국어</th>
          ${showEn ? '<th>영어</th>' : ''}
          ${showZh ? '<th>중국어 / 발음</th>' : ''}
        </tr>
      </thead>
      <tbody>${phraseRows}</tbody>
    </table>
  </div>

  <!-- 퀴즈 -->
  <div class="section">
    <div class="section-title">퀴즈 — 한국어를 보고 번역해보세요</div>
    ${quizItems}
  </div>

  <!-- 메모 -->
  <div class="section">
    <div class="section-title">오늘의 메모</div>
    <div class="memo-lines">
      ${Array(5).fill('<div class="memo-line"></div>').join('')}
    </div>
  </div>

  <script>window.onload = () => window.print();<\/script>
</body>
</html>`;

  const win = window.open('', '_blank');
  win.document.write(html);
  win.document.close();
}

// ─── 초기화 ───────────────────────────────────────────────────
renderTopicGrid();
