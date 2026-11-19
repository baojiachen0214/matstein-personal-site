'use strict';
(() => {
 const reduced=matchMedia('(prefers-reduced-motion: reduce)'),fine=matchMedia('(hover: hover) and (pointer: fine)');
 const zh=document.documentElement.lang.startsWith('zh'),instrument=document.querySelector('.hello-instrument'),letters=[...document.querySelectorAll('.letter')],pointer=document.querySelector('.pointer'),nameStage=document.querySelector('.name-stage');
 const glyphWidths=letters.map(letter=>Number(letter.querySelector('svg')?.getAttribute('viewBox').split(/\s+/)[2])||1);
 const glyphTotal=glyphWidths.reduce((sum,width)=>sum+width,0)||1;
 const baseWidths=glyphWidths.map(width=>width/glyphTotal);
 let heroVisible=true,targetX=.5,strength=0,targetStrength=0,widths=[...baseWidths],frame=0,lastTime=0;
 let pointerX=-100,pointerY=-100,cursorX=-100,cursorY=-100,pointerVisible=false;
 function renderLetters(){
  if(!instrument)return;
  const gap=parseFloat(getComputedStyle(instrument.querySelector('h1')).columnGap)||4;
  letters.forEach((letter,i)=>letter.style.flexBasis='calc((100% - '+(gap*4)+'px) * '+widths[i]+')');
 }
 function tick(time){
  const dt=Math.min(40,lastTime?time-lastTime:16.7),alpha=1-Math.exp(-dt/170);lastTime=time;
  strength+=(targetStrength-strength)*alpha;
  // A broad influence and a firm width floor keep every glyph legible.
  const weights=[.1,.3,.5,.7,.9].map(a=>Math.exp(-Math.pow((targetX-a)/.32,2))),sum=weights.reduce((a,b)=>a+b,0)||1;
  let moving=false;
  letters.forEach((_,i)=>{
   const goal=reduced.matches?baseWidths[i]:baseWidths[i]*(1-strength)+(.17+.15*weights[i]/sum)*strength;
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
  renderLetters();
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
 let activeCards=cards,aboutProgress=0,sceneFrame=0,lastSceneTime=0,galleryIndex=0;
 const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
 function setCount(id,value){const el=document.getElementById(id);if(el)el.textContent=String(value).padStart(2,'0');}
 function updateGallery(){
  if(!viewport||!activeCards.length)return;
  const box=viewport.getBoundingClientRect(),center=box.left+viewport.clientLeft+viewport.clientWidth/2;
  let nearest=0,distance=Infinity;
  activeCards.forEach((card,i)=>{
   const cardBox=card.getBoundingClientRect(),d=Math.abs(cardBox.left+cardBox.width/2-center);
   if(d<distance){distance=d;nearest=i;}
  });
  galleryIndex=nearest;
  setCount('gallery-current',nearest+1);
  const max=Math.max(0,viewport.scrollWidth-viewport.clientWidth);
  if(bar)bar.style.transform='scaleX('+(max?clamp(viewport.scrollLeft/max):1)+')';
  document.querySelector('[data-gallery-prev]')?.toggleAttribute('disabled',nearest===0);
  document.querySelector('[data-gallery-next]')?.toggleAttribute('disabled',nearest===activeCards.length-1);
  activeCards.forEach((card,i)=>card.classList.toggle('is-current',i===nearest));
 }
 function layoutGallery(){
  if(!gallery||!viewport||!track)return;
  activeCards=cards.filter(card=>!card.hidden);
  setCount('visible-count',activeCards.length);
  const cardWidth=activeCards[0]?.getBoundingClientRect().width||0;
  track.style.setProperty('--gallery-gutter',Math.max(0,(viewport.clientWidth-cardWidth)/2)+'px');
  // Horizontal movement belongs to the native scroll container. The card and
  // its hit area never move independently, including during Safari clicks.
  gallery.style.removeProperty('height');
  track.style.removeProperty('transform');
  cards.forEach(card=>{card.style.removeProperty('transform');card.style.removeProperty('opacity');});
  requestAnimationFrame(updateGallery);
 }
 function scene(time){
  const dt=Math.min(40,lastSceneTime?time-lastSceneTime:16.7),alpha=1-Math.exp(-dt/100);lastSceneTime=time;
  let moving=false;
  if(aboutFilm&&!reduced.matches){
   const b=aboutFilm.getBoundingClientRect(),target=clamp(-b.top/Math.max(1,aboutFilm.offsetHeight-innerHeight));
   aboutProgress+=(target-aboutProgress)*alpha;
   if(Math.abs(target-aboutProgress)>.0001)moving=true;
   const phase=aboutProgress*2;
   aboutPanels.forEach((panel,i)=>{
    const d=i-phase,opacity=clamp(1-Math.abs(d)*1.8);
    panel.style.opacity=opacity;
    panel.style.transform='translate3d('+(-d*18)+'px,'+(d*55)+'px,0)';
    panel.style.filter='blur('+(Math.min(1,Math.abs(d))*3)+'px)';
    panel.style.pointerEvents=opacity>.5?'auto':'none';
   });
   if(portrait)portrait.style.transform='translate3d('+((aboutProgress-.5)*4)+'%,0,0) scale('+(1.02+aboutProgress*.07)+')';
   if(filmName)filmName.style.transform='translate3d('+((.5-aboutProgress)*8)+'%,0,0)';
   document.querySelectorAll('.about-progress span').forEach((dot,i)=>dot.classList.toggle('active',i===Math.round(phase)));
  }
  sceneFrame=0;
  if(moving&&!document.hidden)sceneFrame=requestAnimationFrame(scene);else lastSceneTime=0;
 }
 function requestScene(){if(!sceneFrame)sceneFrame=requestAnimationFrame(scene);}
 function goToCard(index,behavior='smooth'){
  if(!viewport||!activeCards.length)return;
  const i=clamp(index,0,activeCards.length-1),card=activeCards[i];
  const viewportBox=viewport.getBoundingClientRect(),cardBox=card.getBoundingClientRect();
  const centerDelta=cardBox.left+cardBox.width/2-(viewportBox.left+viewport.clientLeft+viewport.clientWidth/2);
  const left=clamp(viewport.scrollLeft+centerDelta,0,Math.max(0,viewport.scrollWidth-viewport.clientWidth));
  viewport.scrollTo({left,behavior:reduced.matches?'auto':behavior});
 }
 function step(direction){goToCard(galleryIndex+direction);}
 document.querySelector('[data-gallery-prev]')?.addEventListener('click',()=>step(-1));
 document.querySelector('[data-gallery-next]')?.addEventListener('click',()=>step(1));
 viewport?.addEventListener('scroll',updateGallery,{passive:true});
 viewport?.addEventListener('keydown',event=>{
  if(event.altKey||event.ctrlKey||event.metaKey||event.shiftKey)return;
  if(event.key==='ArrowLeft'||event.key==='ArrowRight'){
   event.preventDefault();step(event.key==='ArrowRight'?1:-1);
  }else if(event.key==='Home'||event.key==='End'){
   event.preventDefault();goToCard(event.key==='Home'?0:activeCards.length-1);
  }
 });
 cards.forEach(card=>card.addEventListener('focus',()=>{
  if(card.matches(':focus-visible'))goToCard(activeCards.indexOf(card));
 }));
 // Touch and trackpads use native scrolling. Mouse dragging starts only after
 // a deliberate horizontal gesture, so an ordinary link click stays a click.
 let drag=null,suppressedClick=null;
 viewport?.addEventListener('dragstart',event=>event.preventDefault());
 viewport?.addEventListener('pointerdown',event=>{
  suppressedClick=null;
  if(event.pointerType!=='mouse'||event.button!==0||event.ctrlKey||event.metaKey||event.altKey||event.shiftKey)return;
  drag={x:event.clientX,y:event.clientY,left:viewport.scrollLeft,active:false,id:event.pointerId};
 },{passive:true});
 viewport?.addEventListener('pointermove',event=>{
  if(!drag||event.pointerId!==drag.id)return;
  const dx=event.clientX-drag.x,dy=event.clientY-drag.y;
  if(!drag.active&&Math.abs(dy)>10&&Math.abs(dy)>Math.abs(dx)){drag=null;return;}
  if(!drag.active&&Math.abs(dx)>10&&Math.abs(dx)>Math.abs(dy)*1.4){
   drag.active=true;viewport.classList.add('is-dragging');
   viewport.setPointerCapture(event.pointerId);
  }
  if(drag.active){event.preventDefault();viewport.scrollLeft=drag.left-dx;}
 },{passive:false});
 function endDrag(event){
  if(!drag||event.pointerId!==drag.id)return;
  const ended=drag;drag=null;
  if(ended.active){
   suppressedClick={until:performance.now()+500,x:event.clientX,y:event.clientY};
   viewport.classList.remove('is-dragging');
   if(viewport.hasPointerCapture(event.pointerId))viewport.releasePointerCapture(event.pointerId);
   // Snap after releasing the pointer; while dragging there is no scroll snap.
   updateGallery();goToCard(galleryIndex);
  }
 }
 viewport?.addEventListener('pointerup',endDrag);
 viewport?.addEventListener('pointercancel',endDrag);
 viewport?.addEventListener('lostpointercapture',event=>{
  if(drag?.id===event.pointerId){drag=null;viewport.classList.remove('is-dragging');}
 });
 viewport?.addEventListener('click',event=>{
  // Suppress only the compatibility click belonging to the completed drag.
  // A fresh pointerdown or keyboard activation always remains available.
  if(suppressedClick&&event.detail!==0&&performance.now()<suppressedClick.until&&Math.hypot(event.clientX-suppressedClick.x,event.clientY-suppressedClick.y)<24){
   event.preventDefault();event.stopPropagation();
  }
  suppressedClick=null;
 },true);
 document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
  document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
  cards.forEach(card=>{card.hidden=button.dataset.filter!=='all'&&card.dataset.category!==button.dataset.filter;});
  galleryIndex=0;layoutGallery();goToCard(0,'auto');
 }));
 addEventListener('scroll',requestScene,{passive:true});
 addEventListener('resize',()=>{layoutGallery();requestScene();},{passive:true});
 reduced.addEventListener('change',()=>{
  if(reduced.matches){document.documentElement.classList.remove('motion-ready');document.body.classList.remove('cursor-ready');targetStrength=0;}
  layoutGallery();requestScene();wake();
 });
 layoutGallery();requestScene();
})();
