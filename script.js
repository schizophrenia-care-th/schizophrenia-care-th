const nav=document.getElementById('nav');
document.getElementById('menuBtn').addEventListener('click',()=>nav.classList.toggle('open'));
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

const themeBtn=document.getElementById('themeBtn');
const savedTheme=localStorage.getItem('theme');
if(savedTheme==='dark') document.body.classList.add('dark');
themeBtn.addEventListener('click',()=>{
  document.body.classList.toggle('dark');
  localStorage.setItem('theme',document.body.classList.contains('dark')?'dark':'light');
});

const checks=[...document.querySelectorAll('#checklist input')];
const todayKey='schizo-care-'+new Date().toISOString().slice(0,10);
const saved=JSON.parse(localStorage.getItem(todayKey)||'{}');
checks.forEach(c=>{c.checked=!!saved[c.dataset.key]; c.addEventListener('change',saveChecks)});
function saveChecks(){
  const data={}; checks.forEach(c=>data[c.dataset.key]=c.checked);
  localStorage.setItem(todayKey,JSON.stringify(data)); updateProgress();
}
function updateProgress(){
  const n=checks.filter(c=>c.checked).length;
  document.getElementById('progress').textContent=`${n}/${checks.length}`;
}
document.getElementById('resetChecks').addEventListener('click',()=>{
  checks.forEach(c=>c.checked=false); saveChecks();
});
updateProgress();
