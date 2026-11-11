'use strict';
(() => {
 const reduced=matchMedia('(prefers-reduced-motion: reduce)'),fine=matchMedia('(hover: hover) and (pointer: fine)');
 const zh=document.documentElement.lang.startsWith('zh'),instrument=document.querySelector('.hello-instrument'),letters=[...document.querySelectorAll('.letter')],pointer=document.querySelector('.pointer'),nameStage=document.querySelector('.name-stage');
 let heroVisible=true,targetX=.5,strength=0,targetStrength=0,widths=[.2,.2,.2,.2,.2],frame=0,lastTime=0;
 let pointerX=-100,pointerY=-100,cursorX=-100,cursorY=-100,pointerVisible=false;
 function renderLetters(){
  if(!instrument)return;
  const gap=parseFloat(getComputedStyle(instrument.querySelector('h1')).columnGap)||4;
  letters.forEach((letter,i)=>letter.style.flexBasis='calc((100% - '+(gap*4)+'px) * '+widths[i]+')');
 }
 function tick(time){
  const dt=Math.min(40,lastTime?time-lastTime:16.7),alpha=1-Math.exp(-dt/115);lastTime=time;
  strength+=(targetStrength-strength)*alpha;
  const weights=[.1,.3,.5,.7,.9].map(a=>Math.exp(-Math.pow((targetX-a)/.18,2))),sum=weights.reduce((a,b)=>a+b,0);
  let moving=false;
  letters.forEach((_,i)=>{
   const goal=reduced.matches?.2:.2*(1-strength)+(.075+.625*weights[i]/sum)*strength;
   widths[i]+=(goal-widths[i])*alpha;
   if(Math.abs(goal-widths[i])>.00005)moving=true;
  });
  renderLetters();
  if(pointerVisible&&!reduced.matches&&fine.matches){
   cursorX+=(pointerX-cursorX)*(1-Math.exp(-dt/42));cursorY+=(pointerY-cursorY)*(1-Math.exp(-dt/42));
   pointer.style.transform='translate('+cursorX+'px,'+cursorY+'px) translate(-50%,-50%)';
   if(Math.abs(pointerX-cursorX)+Math.abs(pointerY-cursorY)>.15)moving=true;
  }
  frame=0;
  if(moving&&!document.hidden)frame=requestAnimationFrame(tick);else lastTime=0;
 }
 function wake(){if(!frame)frame=requestAnimationFrame(tick);}
 function aim(event){
  if(!instrument||reduced.matches||!heroVisible)return;
  const b=instrument.getBoundingClientRect();
  targetX=Math.max(0,Math.min(1,(event.clientX-b.left)/b.width));targetStrength=1;wake();
 }
 if(instrument){
  const hero=instrument.closest('.hero');
  hero.addEventListener('pointermove',aim,{passive:true});hero.addEventListener('pointerdown',aim,{passive:true});
  hero.addEventListener('pointerleave',()=>{targetStrength=0;wake();});
  hero.addEventListener('pointerup',event=>{if(event.pointerType==='touch'){targetStrength=0;wake();}},{passive:true});
  hero.addEventListener('pointercancel',()=>{targetStrength=0;wake();});
  instrument.addEventListener('keydown',event=>{
   if(!['ArrowLeft','ArrowRight','Home','End','Escape'].includes(event.key))return;
   event.preventDefault();
   if(event.key==='Escape')targetStrength=0;
   else{targetX=event.key==='Home'?0:event.key==='End'?1:Math.max(0,Math.min(1,targetX+(event.key==='ArrowRight'? .12 : -.12)));targetStrength=1;}
   wake();
  });
  new IntersectionObserver(entries=>{heroVisible=entries[0].isIntersecting;if(!heroVisible){targetStrength=0;wake();}}).observe(hero);
  addEventListener('resize',renderLetters,{passive:true});
 }
 if(pointer){
  document.addEventListener('pointermove',event=>{
   if(event.pointerType==='touch'||!fine.matches||reduced.matches)return;
   pointerX=event.clientX;pointerY=event.clientY;
   if(!pointerVisible){cursorX=pointerX;cursorY=pointerY;pointerVisible=true;document.body.classList.add('cursor-ready');}
   const row=event.target.closest('.project-card');
   pointer.classList.toggle('is-open',!!row);pointer.classList.toggle('is-link',!row&&!!event.target.closest('a,button'));wake();
  },{passive:true});
  document.addEventListener('pointerout',event=>{if(!event.relatedTarget){pointerVisible=false;document.body.classList.remove('cursor-ready');}});
 }
 if(!reduced.matches&&'IntersectionObserver'in window){
  document.documentElement.classList.add('motion-ready');
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}}),{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
 }

 const aboutFilm=document.querySelector('.about-film'),aboutPanels=[...document.querySelectorAll('.about-panel')],portrait=document.querySelector('.film-portrait'),filmName=document.querySelector('.film-name');
 const gallery=document.querySelector('.gallery-section'),viewport=document.querySelector('.gallery-viewport'),track=document.querySelector('.gallery-track'),cards=[...document.querySelectorAll('.project-card')],bar=document.querySelector('.gallery-progress>span');
 let activeCards=cards,travel=0,scrollTravel=0,galleryProgress=0,aboutProgress=0,sceneFrame=0,lastSceneTime=0;
 const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
 function setCount(id,value){const el=document.getElementById(id);if(el)el.textContent=String(value).padStart(2,'0');}
 function layoutGallery(){
  if(!gallery)return;
  activeCards=cards.filter(card=>!card.hidden);
  travel=Math.max(0,track.scrollWidth-viewport.clientWidth);
  scrollTravel=Math.max(innerHeight*1.25,travel*.48);
  gallery.style.height=(innerHeight+scrollTravel)+'px';
  setCount('visible-count',activeCards.length);
  requestScene();
 }
 function scene(time){
  const dt=Math.min(40,lastSceneTime?time-lastSceneTime:16.7),alpha=1-Math.exp(-dt/85);lastSceneTime=time;
  let moving=false;
  if(aboutFilm&&!reduced.matches){
   const b=aboutFilm.getBoundingClientRect(),target=clamp(-b.top/Math.max(1,aboutFilm.offsetHeight-innerHeight));
   aboutProgress+=(target-aboutProgress)*alpha;
   if(Math.abs(target-aboutProgress)>.0001)moving=true;
   const phase=aboutProgress*2;
   aboutPanels.forEach((panel,i)=>{
    const d=i-phase,opacity=clamp(1-Math.abs(d)*1.8);
    panel.style.opacity=opacity;
    panel.style.transform='translate3d('+(-d*25)+'px,'+(d*80)+'px,0)';
    panel.style.filter='blur('+(Math.min(1,Math.abs(d))*5)+'px)';
    panel.style.pointerEvents=opacity>.5?'auto':'none';
   });
   if(portrait)portrait.style.transform='translate3d('+((aboutProgress-.5)*5)+'%,0,0) scale('+(1.02+aboutProgress*.1)+')';
   if(filmName)filmName.style.transform='translate3d('+((.5-aboutProgress)*12)+'%,0,0)';
   document.querySelectorAll('.about-progress span').forEach((dot,i)=>dot.classList.toggle('active',i===Math.round(phase)));
  }
  if(gallery&&!reduced.matches){
   const rect=gallery.getBoundingClientRect(),target=clamp(-rect.top/Math.max(1,scrollTravel));
   galleryProgress+=(target-galleryProgress)*alpha;
   if(Math.abs(target-galleryProgress)>.00005)moving=true;
   const x=travel*galleryProgress;
   track.style.transform='translate3d('+(-x)+'px,0,0)';
   activeCards.forEach(card=>{
    const center=card.offsetLeft+card.offsetWidth/2-x,d=(center-viewport.clientWidth/2)/viewport.clientWidth;
    const magnitude=Math.min(1.5,Math.abs(d));
    card.style.transform='perspective(1300px) translate3d(0,'+(magnitude*magnitude*25)+'px,0) rotateX(var(--tilt-x,0deg)) rotateY(calc('+(-d*10)+'deg + var(--tilt-y,0deg))) scale('+(1-Math.min(.16,magnitude*.13))+')';
    card.style.opacity=1-Math.min(.55,magnitude*.38);
   });
   const index=Math.round(galleryProgress*Math.max(0,activeCards.length-1));
   setCount('gallery-current',Math.min(activeCards.length,index+1));
   if(bar)bar.style.transform='scaleX('+galleryProgress+')';
  }
  sceneFrame=0;
  if(moving&&!document.hidden)sceneFrame=requestAnimationFrame(scene);else lastSceneTime=0;
 }
 function requestScene(){if(!sceneFrame)sceneFrame=requestAnimationFrame(scene);}
 function scrollImmediately(top){
  const root=document.documentElement,previous=root.style.scrollBehavior;
  root.style.scrollBehavior='auto';
  window.scrollTo({top,behavior:'auto'});
  root.style.scrollBehavior=previous;
 }
 viewport?.addEventListener('wheel',event=>{
  if(reduced.matches||!travel||event.ctrlKey||Math.abs(event.deltaX)<=Math.abs(event.deltaY))return;
  const start=gallery.getBoundingClientRect().top+scrollY;
  const unit=event.deltaMode===1?16:event.deltaMode===2?viewport.clientWidth:1;
  const current=clamp((scrollY-start)/scrollTravel);
  const next=clamp(current+event.deltaX*unit/travel);
  if(next===current)return;
  event.preventDefault();scrollImmediately(start+next*scrollTravel);requestScene();
 },{passive:false});
 viewport?.addEventListener('dragstart',event=>event.preventDefault());
 function goToCard(index,behavior='smooth'){
  if(!gallery||!activeCards.length)return;
  const i=clamp(index,0,activeCards.length-1),ratio=activeCards.length>1?i/(activeCards.length-1):0;
  if(reduced.matches){const card=activeCards[i];viewport.scrollTo({left:card.offsetLeft-(viewport.clientWidth-card.offsetWidth)/2,behavior:'auto'});setCount('gallery-current',i+1);}
  else window.scrollTo({top:gallery.getBoundingClientRect().top+scrollY+ratio*scrollTravel,behavior:behavior});
 }
 function step(direction){const index=reduced.matches?Math.max(0,Number(document.getElementById('gallery-current').textContent)-1):Math.round(galleryProgress*Math.max(0,activeCards.length-1));goToCard(index+direction);}
 document.querySelector('[data-gallery-prev]')?.addEventListener('click',()=>step(-1));
 document.querySelector('[data-gallery-next]')?.addEventListener('click',()=>step(1));
 viewport?.addEventListener('scroll',()=>{if(!reduced.matches)return;let best=0,distance=Infinity;activeCards.forEach((card,i)=>{const d=Math.abs(card.offsetLeft+card.offsetWidth/2-viewport.scrollLeft-viewport.clientWidth/2);if(d<distance){distance=d;best=i;}});setCount('gallery-current',best+1);if(bar)bar.style.transform='scaleX('+(activeCards.length>1?best/(activeCards.length-1):1)+')';},{passive:true});
 viewport?.addEventListener('keydown',event=>{
  if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();step(event.key==='ArrowRight'?1:-1);}
 });
 cards.forEach(card=>{
  card.addEventListener('focus',()=>{if(card.matches(':focus-visible'))goToCard(activeCards.indexOf(card));});
  card.addEventListener('pointermove',event=>{
   if(!fine.matches||reduced.matches)return;
   const b=card.getBoundingClientRect();
   card.style.setProperty('--tilt-x',((.5-(event.clientY-b.top)/b.height)*3)+'deg');
   card.style.setProperty('--tilt-y',(((event.clientX-b.left)/b.width-.5)*3)+'deg');
  },{passive:true});
  card.addEventListener('pointerleave',()=>{card.style.setProperty('--tilt-x','0deg');card.style.setProperty('--tilt-y','0deg');});
 });
 let drag=null,suppressClick=false;
 viewport?.addEventListener('pointerdown',event=>{
  if(event.button!==0||reduced.matches)return;
  drag={x:event.clientX,y:event.clientY,start:scrollY,active:false,id:event.pointerId};
 },{passive:true});
 viewport?.addEventListener('pointermove',event=>{
  if(!drag||!travel)return;
  const dx=event.clientX-drag.x,dy=event.clientY-drag.y;
  if(!drag.active&&Math.abs(dx)>8&&Math.abs(dx)>Math.abs(dy)*1.2){drag.active=true;viewport.setPointerCapture(event.pointerId);viewport.classList.add('is-dragging');}
  if(drag.active){event.preventDefault();scrollImmediately(drag.start-dx/travel*scrollTravel);requestScene();suppressClick=true;}
 },{passive:false});
 function endDrag(){if(drag?.active){viewport.classList.remove('is-dragging');setTimeout(()=>{suppressClick=false;},0);}drag=null;}
 viewport?.addEventListener('pointerup',endDrag);viewport?.addEventListener('pointercancel',endDrag);
 viewport?.addEventListener('click',event=>{if(suppressClick){event.preventDefault();event.stopPropagation();suppressClick=false;}},true);
 document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
  document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
  cards.forEach(card=>{card.hidden=button.dataset.filter!=='all'&&card.dataset.category!==button.dataset.filter;});
  galleryProgress=0;layoutGallery();goToCard(0);
 }));
 addEventListener('scroll',requestScene,{passive:true});
 addEventListener('resize',()=>{layoutGallery();requestScene();},{passive:true});
 reduced.addEventListener('change',()=>{
  if(reduced.matches){document.documentElement.classList.remove('motion-ready');document.body.classList.remove('cursor-ready');targetStrength=0;}
  layoutGallery();requestScene();wake();
 });
 layoutGallery();requestScene();
 const config=window.SITE_CONFIG||{},filing=document.querySelector('#filing-info');
 function filingLink(value,href){if(!filing)return;const a=document.createElement('a');a.textContent=value;a.href=href;a.target='_blank';a.rel='noopener noreferrer';filing.append(a);}
 if(config.icpNumber)filingLink(config.icpNumber,'https://beian.miit.gov.cn/');
 if(config.publicSecurityNumber&&/^\d+$/.test(config.publicSecurityCode||''))filingLink(config.publicSecurityNumber,'https://beian.mps.gov.cn/#/query/webSearch?code='+encodeURIComponent(config.publicSecurityCode));
 if(config.siteUrl){try{const origin=new URL(config.siteUrl);if(['https:','http:'].includes(origin.protocol)){const canonical=document.createElement('link');canonical.rel='canonical';canonical.href=new URL(location.pathname,origin).href;document.head.append(canonical);}}catch{}}
})();
