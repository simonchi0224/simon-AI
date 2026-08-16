function copyText(text,btn){navigator.clipboard?.writeText(text).then(()=>{const t=btn.textContent;btn.textContent='已複製';setTimeout(()=>btn.textContent=t,1200)})}
function paramSlide(){let n=Number(new URLSearchParams(location.search).get('slide'));return n>0&&n<=SLIDES.length?n:1}
function openTool(name){window.open(TOOLS[name],'_blank','noopener')}
