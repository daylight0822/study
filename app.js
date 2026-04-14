// ─── 주제 목록 ───────────────────────────────────────────────
const TOPICS = [
  { title: '자기소개', desc: '이름, 직업, 취미 등 기본적인 자기소개를 연습해보세요.', level: '기초' },
  { title: '카페에서', desc: '음료 주문, 추천 요청 등 카페 상황을 연습해보세요.', level: '기초' },
  { title: '쇼핑', desc: '물건 구매, 가격 흥정, 교환/환불 표현을 연습해보세요.', level: '기초' },
  { title: '식당에서', desc: '음식 주문, 메뉴 추천, 계산 등을 연습해보세요.', level: '기초' },
  { title: '날씨와 일상', desc: '날씨 이야기, 주말 계획 등 가벼운 대화를 연습해보세요.', level: '기초' },
  { title: '길 찾기', desc: '길을 묻고 답하는 표현을 연습해보세요.', level: '중급' },
  { title: '취미와 관심사', desc: '좋아하는 것들에 대해 이야기하는 연습을 해보세요.', level: '중급' },
  { title: '약속 잡기', desc: '만남 약속을 잡고 조율하는 표현을 연습해보세요.', level: '중급' },
  { title: '교통과 여행', desc: '대중교통 이용, 여행 계획 등을 연습해보세요.', level: '중급' },
  { title: '건강과 병원', desc: '증상 설명, 병원 예약 등을 연습해보세요.', level: '중급' },
  { title: '회사 소개', desc: '내 회사와 업무를 소개하는 비즈니스 표현을 연습해보세요.', level: '비즈니스' },
  { title: '비즈니스 미팅', desc: '회의에서 의견 제시, 동의/반대 표현을 연습해보세요.', level: '비즈니스' },
  { title: '이메일 표현', desc: '비즈니스 이메일에서 자주 쓰는 표현을 연습해보세요.', level: '비즈니스' },
  { title: '프레젠테이션', desc: '발표 시작, 전환, 마무리 표현을 연습해보세요.', level: '비즈니스' },
  { title: '협상과 제안', desc: '제안하고 협상하는 비즈니스 표현을 연습해보세요.', level: '비즈니스' },
];

// ─── 상태 ─────────────────────────────────────────────────────
let apiKey = localStorage.getItem('gemini_api_key') || '';
let currentLang = 'en';
let currentMode = 'chat';
let currentTopicIdx = 0;
let chatHistory = [];
let todayCount = 0;

// ─── DOM 요소 ─────────────────────────────────────────────────
const apiModal     = document.getElementById('apiModal');
const apiKeyInput  = document.getElementById('apiKeyInput');
const saveApiKey   = document.getElementById('saveApiKey');
const changeApiKey = document.getElementById('changeApiKey');
const appDiv       = document.getElementById('app');

const topicTitle   = document.getElementById('topicTitle');
const topicDesc    = document.getElementById('topicDesc');
const topicLevel   = document.getElementById('topicLevel');
const topicNum     = document.getElementById('topicNum');
const prevTopic    = document.getElementById('prevTopic');
const nextTopic    = document.getElementById('nextTopic');
const startChat    = document.getElementById('startChat');

const chatMessages = document.getElementById('chatMessages');
const userInput    = document.getElementById('userInput');
const sendBtn      = document.getElementById('sendBtn');

const todayCountEl  = document.getElementById('todayCount');
const streakCountEl = document.getElementById('streakCount');

// ─── 초기화 ───────────────────────────────────────────────────
function init() {
  if (apiKey) {
    apiModal.classList.add('hidden');
    appDiv.classList.remove('hidden');
    loadStats();
    renderTopic();
  }
}

// ─── API 키 저장 ──────────────────────────────────────────────
saveApiKey.addEventListener('click', () => {
  const key = apiKeyInput.value.trim();
  if (!key) return alert('API 키를 입력해주세요.');
  apiKey = key;
  localStorage.setItem('gemini_api_key', key);
  apiModal.classList.add('hidden');
  appDiv.classList.remove('hidden');
  loadStats();
  renderTopic();
});

changeApiKey.addEventListener('click', () => {
  apiKeyInput.value = apiKey;
  apiModal.classList.remove('hidden');
});

// ─── 언어 탭 ──────────────────────────────────────────────────
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    currentLang = tab.dataset.lang;
    chatHistory = [];
    clearChat();
    addAiMessage('언어를 변경했어요. 주제를 선택하고 시작해보세요!');
  });
});

// ─── 모드 탭 ──────────────────────────────────────────────────
document.querySelectorAll('.mode-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.mode-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    currentMode = tab.dataset.mode;
    chatHistory = [];
    clearChat();
    if (currentMode === 'chat') {
      addAiMessage('대화 연습 모드예요. 주제를 선택하고 시작해보세요!');
    } else {
      addAiMessage('문장 교정 모드예요. 영어 또는 중국어 문장을 입력하면 교정해드릴게요.');
    }
  });
});

// ─── 주제 렌더링 ──────────────────────────────────────────────
function renderTopic() {
  const t = TOPICS[currentTopicIdx];
  topicTitle.textContent = t.title;
  topicDesc.textContent = t.desc;
  topicNum.textContent = `${currentTopicIdx + 1} / ${TOPICS.length}`;

  topicLevel.textContent = t.level;
  topicLevel.className = 'badge';
  if (t.level === '중급') topicLevel.classList.add('mid');
  if (t.level === '비즈니스') topicLevel.classList.add('business');
}

prevTopic.addEventListener('click', () => {
  if (currentTopicIdx > 0) {
    currentTopicIdx--;
    renderTopic();
  }
});

nextTopic.addEventListener('click', () => {
  if (currentTopicIdx < TOPICS.length - 1) {
    currentTopicIdx++;
    renderTopic();
  }
});

startChat.addEventListener('click', () => {
  chatHistory = [];
  clearChat();
  const topic = TOPICS[currentTopicIdx].title;
  const langName = currentLang === 'en' ? '영어' : '중국어';
  addAiMessage(`좋아요! 오늘의 주제는 "${topic}"이에요.\n${langName}로 자유롭게 대화해보세요. 틀려도 괜찮아요!`);
});

// ─── 채팅 UI ──────────────────────────────────────────────────
function clearChat() {
  chatMessages.innerHTML = '';
}

function addAiMessage(text) {
  const div = document.createElement('div');
  div.className = 'msg ai';
  div.innerHTML = `<span>${escapeHtml(text)}</span>`;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addUserMessage(text) {
  const div = document.createElement('div');
  div.className = 'msg user';
  div.innerHTML = `<span>${escapeHtml(text)}</span>`;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addLoadingMessage() {
  const div = document.createElement('div');
  div.className = 'msg ai loading';
  div.id = 'loadingMsg';
  div.innerHTML = `<span>답변 생성 중...</span>`;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeLoadingMessage() {
  const el = document.getElementById('loadingMsg');
  if (el) el.remove();
}

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, '<br/>');
}

// ─── 전송 ────────────────────────────────────────────────────
sendBtn.addEventListener('click', handleSend);
userInput.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    handleSend();
  }
});

async function handleSend() {
  const text = userInput.value.trim();
  if (!text || sendBtn.disabled) return;

  userInput.value = '';
  sendBtn.disabled = true;
  addUserMessage(text);
  addLoadingMessage();

  try {
    const reply = await callGemini(text);
    removeLoadingMessage();
    addAiMessage(reply);
    updateTodayCount();
  } catch (err) {
    removeLoadingMessage();
    addAiMessage('오류가 발생했어요: ' + err.message);
  } finally {
    sendBtn.disabled = false;
    userInput.focus();
  }
}

// ─── Gemini API 호출 ──────────────────────────────────────────
async function callGemini(userText) {
  const systemPrompt = getSystemPrompt();

  // 대화 히스토리에 현재 메시지 추가
  chatHistory.push({ role: 'user', parts: [{ text: userText }] });

  const body = {
    system_instruction: { parts: [{ text: systemPrompt }] },
    contents: chatHistory,
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 1024,
    }
  };

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }
  );

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error?.message || '알 수 없는 오류');
  }

  const data = await res.json();
  const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || '응답을 받지 못했어요.';

  // 히스토리에 AI 응답 추가
  chatHistory.push({ role: 'model', parts: [{ text: reply }] });

  return reply;
}

// ─── 시스템 프롬프트 ──────────────────────────────────────────
function getSystemPrompt() {
  const topic = TOPICS[currentTopicIdx].title;

  if (currentMode === 'correct') {
    if (currentLang === 'en') {
      return `You are a friendly English tutor for a Korean intermediate learner.
The user will write English sentences. Your job:
1. If there are mistakes, point them out kindly in Korean and provide the corrected version.
2. If the sentence is correct, praise them briefly in Korean.
3. Suggest a more natural or advanced alternative if possible.
4. Keep your response concise.`;
    } else {
      return `You are a friendly Mandarin Chinese tutor for a Korean beginner.
The user may write in Pinyin or attempt Chinese characters. Your job:
1. Show the corrected sentence with: 汉字 (Pinyin) — Korean meaning for each word.
2. Explain mistakes kindly in Korean.
3. Provide a model sentence they can practice.
Keep your response clear and beginner-friendly.`;
    }
  }

  // 대화 모드
  if (currentLang === 'en') {
    return `You are a warm and encouraging English conversation partner for a Korean intermediate learner.
Today's topic: "${topic}"

Rules:
- Respond naturally in English to keep the conversation flowing.
- After your response, add a brief section in Korean (separated by a line break and "💡 피드백:") pointing out any grammar/expression mistakes the user made, with corrections.
- If the user's sentence was perfect, briefly say so in Korean.
- Keep responses conversational and not too long.
- Gently guide them back to the topic if they go off track.`;
  } else {
    return `You are a warm and encouraging Mandarin Chinese conversation partner for a Korean beginner.
Today's topic: "${topic}"

Rules:
- Respond in simple, clear Mandarin Chinese.
- Format every Chinese sentence as: 汉字 (Pīnyīn) [Korean meaning]
  Example: 你好！(Nǐ hǎo!) [안녕하세요!]
- After your response, add a "💡 피드백:" section in Korean pointing out any mistakes.
- If the user wrote in Pinyin, accept it and gently show the correct characters too.
- Keep sentences short and beginner-friendly.`;
  }
}

// ─── 통계 ────────────────────────────────────────────────────
function updateTodayCount() {
  const today = new Date().toDateString();
  const stored = JSON.parse(localStorage.getItem('study_stats') || '{}');

  if (stored.date !== today) {
    stored.date = today;
    stored.count = 0;
    // 연속 학습일 계산
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (stored.lastDate === yesterday.toDateString()) {
      stored.streak = (stored.streak || 0) + 1;
    } else if (stored.lastDate !== today) {
      stored.streak = 1;
    }
    stored.lastDate = today;
  }

  stored.count = (stored.count || 0) + 1;
  localStorage.setItem('study_stats', JSON.stringify(stored));

  todayCountEl.textContent = stored.count;
  streakCountEl.textContent = stored.streak || 1;
}

function loadStats() {
  const today = new Date().toDateString();
  const stored = JSON.parse(localStorage.getItem('study_stats') || '{}');

  if (stored.date === today) {
    todayCountEl.textContent = stored.count || 0;
  }
  streakCountEl.textContent = stored.streak || 0;
}

// ─── 시작 ────────────────────────────────────────────────────
init();
