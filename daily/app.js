'use strict';
const STORE = 'haru-note-progress-v1';
let data, language='zh', lesson, reading=false, progress={schemaVersion:1,lessons:{}};
const $=id=>document.getElementById(id);
const element=(tag,className,text)=>{const e=document.createElement(tag);if(className)e.className=className;if(text!==undefined)e.textContent=text;return e;};
function notice(text){$('message').textContent=text;}
try{const saved=localStorage.getItem(STORE);if(saved)progress=validateProgress(JSON.parse(saved));}catch{progress={schemaVersion:1,lessons:{}};}
function validateProgress(input){
 if(!input||input.schemaVersion!==1||!input.lessons||typeof input.lessons!=='object'||Array.isArray(input.lessons))throw Error('기록 형식을 확인해 주세요.');
 const clean={schemaVersion:1,lessons:{}};
 if(Object.keys(input.lessons).length>2000)throw Error('기록이 너무 큽니다.');
 for(const [id,value] of Object.entries(input.lessons)){
  if(!/^(zh|en)-\d{4}-\d{2}-\d{2}-v\d+$/.test(id)||!value||typeof value!=='object')throw Error('학습지 ID가 올바르지 않아요.');
  if(!Array.isArray(value.checked)||value.checked.length>100||!value.checked.every(x=>typeof x==='string'&&/^[a-z0-9-]{1,100}$/.test(x))||typeof value.note!=='string'||value.note.length>10000)throw Error('저장된 내용의 형식을 확인해 주세요.');
  clean.lessons[id]={checked:[...new Set(value.checked)],note:value.note};
 }return clean;
}
function record(){if(!progress.lessons[lesson.id])progress.lessons[lesson.id]={checked:[],note:''};return progress.lessons[lesson.id];}
function save(){try{localStorage.setItem(STORE,JSON.stringify(progress));$('save-status').textContent='이 브라우저에 저장됨';}catch{$('save-status').textContent='저장 불가 · 기록을 내려받아 주세요';}}
function updateProgress(){const count=lesson.sentences.filter(s=>record().checked.includes(s.id)).length;$('progress-text').textContent=`다시 말해 본 문장 ${count} / ${lesson.sentences.length}`;$('progress-fill').style.width=`${count/lesson.sentences.length*100}%`;}
function renderDates(){const nav=$('dates');nav.replaceChildren();data.lessons.filter(l=>l.language===language).sort((a,b)=>b.date.localeCompare(a.date)).forEach(l=>{const b=element('button');b.setAttribute('aria-current',String(l.id===lesson.id));b.append(element('small','',`${l.date.slice(5).replace('-',' / ')} · ${l.sentences.length}문장`),element('strong','',l.topic));b.onclick=()=>selectLesson(l);nav.append(b);});}
function selectLesson(l){lesson=l;reading=false;render();}
function render(){
 document.documentElement.classList.toggle('en',language==='en');document.documentElement.classList.remove('reading-mode');
 $('reading').hidden=language!=='zh';$('reading').setAttribute('aria-pressed','false');$('reading').textContent='중국어만 읽기';$('grammar-all').setAttribute('aria-pressed','false');$('grammar-all').textContent='문법 모두 펼치기';
 $('lesson-meta').textContent=`${lesson.date.replaceAll('-',' . ')} / ${language==='zh'?'CHINESE':'ENGLISH'} · ${lesson.topic}`;
 $('lesson-title').textContent=lesson.title;$('lesson-desc').textContent=lesson.description;$('lesson-status').textContent=lesson.status;
 $('version').textContent=`학습지 ID: ${lesson.id} · 문장 순서는 고정되어 있어요.`;
 $('cards').replaceChildren();
 lesson.sentences.forEach((s,i)=>{
  const card=element('article','card');card.dataset.sentenceId=s.id;const header=element('div','card-heading');header.append(element('span','number',`SENTENCE ${String(i+1).padStart(2,'0')}`));
  const label=element('label','practice');const box=element('input');box.type='checkbox';box.checked=record().checked.includes(s.id);box.setAttribute('aria-label',`${i+1}번 문장 다시 말해 봤어요`);box.onchange=()=>{const r=record();r.checked=box.checked?[...new Set([...r.checked,s.id])]:r.checked.filter(id=>id!==s.id);save();updateProgress();};label.append(box,document.createTextNode('다시 말해 봤어요'));header.append(label);
  const sentence=element('p','sentence',s.text);sentence.lang=language==='zh'?'zh-CN':'en';card.append(header,sentence);
  if(s.pronunciation)card.append(element('p','pinyin',s.pronunciation));card.append(element('p','meaning',s.meaning));
  const detail=element('details','grammar');detail.append(element('summary','', '문법과 응용'),element('p','',s.grammar));const application=element('div','application');application.append(element('strong','','바꿔 말해 보기'),document.createTextNode(s.application));detail.append(application);card.append(detail);$('cards').append(card);
 });
 $('note').value=record().note;$('save-status').textContent='이 브라우저에만 저장';renderDates();updateProgress();
 document.querySelectorAll('[data-language]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.language===language)));
}
document.querySelectorAll('[data-language]').forEach(b=>b.onclick=()=>{if(!data)return;language=b.dataset.language;selectLesson(data.lessons.filter(l=>l.language===language).sort((a,b)=>b.date.localeCompare(a.date))[0]);});
$('reading').onclick=()=>{reading=!reading;document.documentElement.classList.toggle('reading-mode',reading);$('reading').setAttribute('aria-pressed',String(reading));$('reading').textContent=reading?'해설 다시 보기':'중국어만 읽기';};
$('grammar-all').onclick=()=>{if(reading)$('reading').click();const open=$('grammar-all').getAttribute('aria-pressed')!=='true';document.querySelectorAll('.grammar').forEach(d=>d.open=open);$('grammar-all').setAttribute('aria-pressed',String(open));$('grammar-all').textContent=open?'문법 모두 접기':'문법 모두 펼치기';};
$('note').oninput=()=>{record().note=$('note').value;save();};
$('print').onclick=()=>{const details=[...document.querySelectorAll('.grammar')];const states=details.map(d=>d.open);details.forEach(d=>d.open=true);const restore=()=>{details.forEach((d,i)=>d.open=states[i]);window.removeEventListener('afterprint',restore);};window.addEventListener('afterprint',restore);window.print();};
$('export').onclick=()=>{const blob=new Blob([JSON.stringify(progress,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=element('a');a.href=url;a.download=`haru-note-progress-${new Date().toISOString().slice(0,10)}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);notice('개인 기록 파일을 내려받았어요. 다른 사람에게 공유하지 않도록 주의해 주세요.');};
$('import').onclick=()=>$('import-file').click();
$('import-file').onchange=async e=>{const file=e.target.files[0];if(!file)return;try{if(file.size>2000000)throw Error('2MB 이하의 기록 파일을 선택해 주세요.');const imported=validateProgress(JSON.parse(await file.text()));if(!confirm('가져온 파일과 같은 학습지의 현재 체크·메모를 덮어쓸까요?'))return;progress.lessons={...progress.lessons,...imported.lessons};save();render();notice('이 브라우저로 기록을 가져왔어요. 서버에 올리지는 않았어요.');}catch(error){notice(error.message==='Unexpected end of JSON input'?'JSON 파일을 확인해 주세요.':`가져오지 못했어요: ${error.message}`);}finally{e.target.value='';}};
fetch('./lessons.json',{cache:'no-cache'}).then(r=>{if(!r.ok)throw Error('자료를 불러올 수 없어요.');return r.json();}).then(result=>{data=result;lesson=data.lessons.find(l=>l.id==='zh-2026-11-02-v1')||data.lessons[0];language=lesson.language;render();$('loading').hidden=true;$('lesson-content').hidden=false;}).catch(()=>{$('loading').textContent='학습지를 불러오지 못했어요. 인터넷 연결을 확인하고 새로고침해 주세요. 파일을 직접 열었다면 로컬 웹 서버로 실행해 주세요.';});
