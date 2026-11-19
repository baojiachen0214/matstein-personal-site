"use strict";
(() => {
const messages = {
  "en": {
    "skip": "Skip to content",
    "navFeatures": "Features",
    "support": "Support",
    "appearance": "Appearance",
    "system": "System",
    "light": "Light",
    "dark": "Dark",
    "heroEyebrow": "NATIVE MIND MAPPING FOR MAC",
    "heroA": "OdenMap",
    "heroB": "Make sense of what you collect.",
    "heroLead": "Text, files and formulas in one map.\nConnect ideas on a canvas. Work through the details in an outline.",
    "join": "Explore OdenMap",
    "takeLook": "Guide & support",
    "macRequirements": "macOS 14 or later · Apple Silicon & Intel",
    "actualApp": "OdenMap for Mac",
    "enlarge": "The real app · Open full screenshot",
    "resourcesTitle": "Keep the source with the idea",
    "resourcesBody": "Images, PDFs and Markdown become resource nodes. Your references and thinking stay in one document.",
    "writingTitle": "One document. Two perspectives.",
    "writingBody": "Connect ideas on the canvas, then keep writing in the outline. The same topics, in the same hierarchy.",
    "mathTitle": "Typeset it. Keep it editable.",
    "mathBody": "TeX source stays with the node. From inline math to matrices, you can always return to the expression.",
    "exportBody": "Export in 12 formats, including PDF, vectors and offline HTML. Choose the right form for your next step.",
    "footerLine": "Ideas, sources and connections.",
    "privacy": "Privacy",
    "testNotes": "Test notes",
    "openSource": "Open source",
    "arcEyebrow": "OPEN-SOURCE COMPANION · ODEN ARC",
    "arcTitle": "Traceable sources.\nEditable maps.",
    "arcBody": "Give your AI assistant local tools to organize documents, images and tables into OdenMap files.",
    "arcSources": "Documents & sources",
    "arcLink": "Explore Oden ARC",
    "arcScope": "MIT-licensed tools for your own AI host. OdenMap is a separate, closed-source app.",
    "imageFit": "Fit to screen",
    "imageActual": "Original size",
    "imageZoom": "Screenshot size",
    "closeImage": "Close screenshot",
    "featureHeading": "From source material to a clear structure.",
    "exportTitle": "Take your map further",
    "demoLabel": "Interactive preview",
    "pauseDemo": "Pause preview",
    "playDemo": "Play preview",
    "canvasMode": "Canvas",
    "outlineMode": "Outline",
    "resourceProject": "Research plan",
    "resourcePDF": "Paper.pdf",
    "resourceMD": "Notes.md",
    "resourceImage": "Sketch.png",
    "topicSources": "Sources",
    "topicReasoning": "Reasoning",
    "topicConclusion": "Findings",
    "formulaDiffusion": "Derivation",
    "formulaProbability": "Probability",
    "formulaMatrix": "Matrix",
    "formulaLabel": "Formula in a topic",
    "formulaEditable": "TeX source retained",
    "exportPDF": "Documents & print",
    "exportSVG": "Vector graphics",
    "exportHTML": "Offline interactive page",
    "exportMD": "Keep writing",
    "exportPreviewTitle": "Research plan",
    "exportPreviewSources": "Sources",
    "exportPreviewNotes": "Reading notes",
    "exportPreviewFinding": "Findings",
    "nativeHeading": "Thoughtfully made for the Mac.",
    "nativeTitle": "Native at the core",
    "nativeBody": "Swift, SwiftUI and AppKit. Native menus, Quick Look and local documents.",
    "systemTitle": "Connect to your system",
    "systemBody": "Optional Calendar and Reminders access keeps topics connected to tasks.",
    "importTitle": "Bring your existing work",
    "importBody": "Import XMind, MindNode Classic, FreeMind, OPML and other supported formats.",
    "arcStructure": "Structure & evidence",
    "arcResult": "OdenMap document",
    "supportLine": "Have a question or something to share?",
    "supportAction": "Visit support",
    "exportPreviewToggle": "Expand or collapse the example branch"
  },
  "zh": {
    "skip": "跳到正文",
    "navFeatures": "功能",
    "support": "支持",
    "appearance": "外观",
    "system": "跟随系统",
    "light": "浅色",
    "dark": "深色",
    "heroEyebrow": "原生 MAC 思维导图",
    "heroA": "OdenMap",
    "heroB": "把资料组织成思路。",
    "heroLead": "文字、文件与公式，同处一张导图。\n用画布建立联系，用大纲写清细节。",
    "join": "探索 OdenMap",
    "takeLook": "使用与支持",
    "macRequirements": "macOS 14 及以上 · Apple Silicon 与 Intel",
    "actualApp": "OdenMap for Mac",
    "enlarge": "真实应用界面 · 点击放大",
    "resourcesTitle": "资料直接进入导图",
    "resourcesBody": "图片、PDF 与 Markdown 都能成为节点。参考资料与思路，留在同一份文稿里。",
    "writingTitle": "同一份内容，两种视角",
    "writingBody": "在画布中整理关系，切到大纲继续写作。主题与层级始终对应。",
    "mathTitle": "公式，始终可以修改",
    "mathBody": "TeX 源码随节点保存。从行内公式到矩阵，排版之后仍能继续编辑。",
    "exportBody": "导出 PDF、矢量图与离线 HTML 等 12 种格式，用合适的方式继续工作。",
    "footerLine": "想法、资料与联系，各得其所。",
    "privacy": "隐私",
    "testNotes": "测试记录",
    "openSource": "开源项目",
    "arcEyebrow": "开源伙伴 · ODEN ARC",
    "arcTitle": "资料有出处，\n导图可编辑。",
    "arcBody": "给你的 AI 助手一套本地工具，将文档、图片和表格组织为 OdenMap 文稿。",
    "arcSources": "文档与资料",
    "arcLink": "了解 Oden ARC",
    "arcScope": "MIT 许可，配合你自己的 AI 宿主使用。OdenMap 是独立的闭源应用。",
    "imageFit": "适应屏幕",
    "imageActual": "原始尺寸",
    "imageZoom": "截图显示尺寸",
    "closeImage": "关闭截图",
    "featureHeading": "从资料，到结构，再到表达。",
    "exportTitle": "把导图带去下一步",
    "demoLabel": "功能示意",
    "pauseDemo": "暂停演示",
    "playDemo": "播放演示",
    "canvasMode": "画布",
    "outlineMode": "大纲",
    "resourceProject": "研究计划",
    "resourcePDF": "文献.pdf",
    "resourceMD": "笔记.md",
    "resourceImage": "示意图.png",
    "topicSources": "资料",
    "topicReasoning": "推导",
    "topicConclusion": "结论",
    "formulaDiffusion": "推导",
    "formulaProbability": "概率",
    "formulaMatrix": "矩阵",
    "formulaLabel": "主题内公式",
    "formulaEditable": "保留 TeX 源码",
    "exportPDF": "文稿与打印",
    "exportSVG": "矢量图形",
    "exportHTML": "离线交互网页",
    "exportMD": "继续写作",
    "exportPreviewTitle": "研究计划",
    "exportPreviewSources": "参考资料",
    "exportPreviewNotes": "阅读笔记",
    "exportPreviewFinding": "整理结论",
    "nativeHeading": "围绕 Mac，认真打磨。",
    "nativeTitle": "原生构建",
    "nativeBody": "Swift、SwiftUI 与 AppKit。原生菜单、快速预览，本地文稿。",
    "systemTitle": "衔接系统工具",
    "systemBody": "日历与提醒事项按需授权，让主题与任务保持关联。",
    "importTitle": "接着已有的内容工作",
    "importBody": "导入 XMind、MindNode Classic、FreeMind、OPML 等格式。",
    "arcStructure": "结构与来源",
    "arcResult": "OdenMap 文稿",
    "supportLine": "想了解更多，或反馈一个问题？",
    "supportAction": "查看使用与支持",
    "exportPreviewToggle": "展开或折叠示例分支"
  }
};

const root=document.documentElement;
const systemDark=matchMedia('(prefers-color-scheme: dark)');
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
const storage={get(key){try{return localStorage.getItem(key)}catch{return null}},set(key,value){try{localStorage.setItem(key,value)}catch{}}};
let language=root.dataset.lang==='zh'?'zh':'en';
let theme=['system','light','dark'].includes(root.dataset.theme)?root.dataset.theme:'system';
const isLanding=root.dataset.landing==='true';
const titles={
 'index.html':{en:'OdenMap — Native mind mapping, resources & outlines for Mac',zh:'OdenMap — 原生 Mac 思维导图、资源画布与大纲'},
 'support.html':{en:'Support — OdenMap',zh:'使用与支持 — OdenMap'},
 'privacy.html':{en:'Privacy — OdenMap',zh:'隐私政策 — OdenMap'},
 'performance.html':{en:'Test notes — OdenMap',zh:'测试记录 — OdenMap'}
};
function updateScreenshot(){
 const image=document.querySelector('[data-shot="canvas"]');if(!image)return;
 const scheme=root.dataset.scheme||'light';
 const src='/odenmap/assets/odenverse-canvas-'+language+'-'+scheme+'.webp';
 if(image.getAttribute('src')!==src)image.src=src;
 const size=language==='zh'?[2160,1344]:[2400,1450];image.width=size[0];image.height=size[1];
 image.alt=language==='zh'?'OdenMap 原生 Mac 工作空间，包含相连主题、文件与公式。':'OdenMap native Mac workspace, with connected topics, files and formulas.';
}
function applyLanguage(next,save=false){
 language=next==='zh'?'zh':'en';root.dataset.lang=language;root.lang=language==='zh'?'zh-CN':'en';
 document.querySelectorAll('[data-i18n]').forEach(el=>{const value=messages[language][el.dataset.i18n];if(value!==undefined){el.textContent=value;el.style.whiteSpace=value.includes('\n')?'pre-line':''}});
 document.querySelectorAll('[lang="en"], [lang="zh-Hans"]').forEach(el=>{if(el!==root)el.hidden=el.lang!==(language==='zh'?'zh-Hans':'en')});
 const toggle=document.querySelector('#language-switch');
 if(toggle){toggle.textContent=language==='zh'?'EN':'中文';toggle.setAttribute('aria-label',language==='zh'?'Switch to English':'切换到简体中文')}
 document.querySelector('.appearance summary')?.setAttribute('aria-label',messages[language].appearance);
 document.querySelectorAll('[data-local]').forEach(a=>{
  const u=new URL(a.getAttribute('href'),document.baseURI);
  if(/\/odenmap\/(?:en\/)?(?:index\.html)?$/.test(u.pathname)){u.pathname=language==='zh'?'/odenmap/':'/odenmap/en/';u.searchParams.delete('lang')}
  else u.searchParams.set('lang',language);
  a.href=u.href;
 });
 document.querySelectorAll('[data-home]').forEach(a=>{a.href=language==='zh'?'/':'/en/'});
 document.querySelector('[data-zoom]')?.setAttribute('aria-label',language==='zh'?'放大查看完整截图':'View complete screenshot');
 document.querySelector('.desktop-nav')?.setAttribute('aria-label',language==='zh'?'主导航':'Main navigation');
 document.querySelector('.footer-bottom nav')?.setAttribute('aria-label',language==='zh'?'页脚':'Footer');
 document.querySelector('.mode-switch')?.setAttribute('aria-label',language==='zh'?'视图':'View');
 document.querySelector('.formula-tabs')?.setAttribute('aria-label',language==='zh'?'公式示例':'Formula examples');
 document.querySelector('.format-switch')?.setAttribute('aria-label',language==='zh'?'导出格式':'Export format');
 document.querySelector('.export-fold')?.setAttribute('aria-label',messages[language].exportPreviewToggle);
 document.querySelector('.structure-diagram')?.setAttribute('aria-label',language==='zh'?'同一组主题在画布与大纲之间重新排列。':'The same topics rearrange between a mind map and outline.');
 const dialog=document.querySelector('.image-dialog');
 if(dialog){dialog.setAttribute('aria-label',language==='zh'?'产品截图':'Screenshot');dialog.querySelector('.dialog-close').setAttribute('aria-label',messages[language].closeImage);dialog.querySelector('[role="group"]').setAttribute('aria-label',messages[language].imageZoom)}
 const page=location.pathname.split('/').pop()||'index.html';document.title=(titles[page]||titles['index.html'])[language];
 updateScreenshot();
 if(save){storage.set('oden-lang',language);const u=new URL(location.href);u.searchParams.set('lang',language);history.replaceState(null,'',u)}
}
function applyTheme(next,save=false){
 theme=['system','light','dark'].includes(next)?next:'system';
 root.dataset.theme=theme;root.dataset.scheme=theme==='system'?(systemDark.matches?'dark':'light'):theme;
 document.querySelector('meta[name="theme-color"]').content=root.dataset.scheme==='dark'?'#101113':'#fafafb';
 document.querySelectorAll('[data-theme-choice]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.themeChoice===theme)));
 updateScreenshot();if(save)storage.set('oden-theme',theme);
}
applyLanguage(language);applyTheme(theme);
document.querySelector('#language-switch')?.addEventListener('click',()=>{
 const next=language==='zh'?'en':'zh';
 if(isLanding){storage.set('oden-lang',next);location.href=(next==='zh'?'/odenmap/':'/odenmap/en/')+location.hash}
 else applyLanguage(next,true);
});
document.querySelectorAll('[data-theme-choice]').forEach(b=>b.addEventListener('click',()=>{applyTheme(b.dataset.themeChoice,true);document.querySelector('.appearance').open=false}));
systemDark.addEventListener('change',()=>{if(theme==='system')applyTheme(theme)});
const appearance=document.querySelector('.appearance');
document.addEventListener('click',e=>{if(appearance&&!appearance.contains(e.target))appearance.open=false});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&appearance?.open){appearance.open=false;appearance.querySelector('summary').focus()}});

// The following previews are browser-local illustrations. They do not read,
// upload or export visitor files, and do not make any network requests.
const resources=document.querySelector('.resource-demo');
function selectResource(kind){
 if(!resources||!['pdf','md','image'].includes(kind))return;
 resources.dataset.resource=kind;
 resources.querySelectorAll('[data-resource-choice]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.resourceChoice===kind)));
 const key={pdf:'resourcePDF',md:'resourceMD',image:'resourceImage'}[kind];
 const name=resources.querySelector('#resource-attached-name');name.dataset.i18n=key;name.textContent=messages[language][key];
 resources.querySelector('.attachment-mark').textContent={pdf:'PDF',md:'MD',image:'PNG'}[kind];
}
const structure=document.querySelector('.structure-demo');
function selectView(view){
 if(!structure||!['canvas','outline'].includes(view))return;
 structure.dataset.view=view;
 structure.querySelectorAll('[data-view-choice]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.viewChoice===view)));
}
const formula=document.querySelector('.formula-demo');
const tex={diffusion:String.raw`\frac{\partial c}{\partial t} = D\nabla^2 c`,probability:String.raw`P(A\mid B) = \frac{P(B\mid A)P(A)}{P(B)}`,matrix:String.raw`A = \begin{pmatrix}a_{11}&a_{12}\\a_{21}&a_{22}\end{pmatrix}`};
function selectFormula(kind){
 if(!formula||!(kind in tex))return;
 formula.dataset.formula=kind;formula.querySelector('[data-formula-source]').textContent=tex[kind];
 formula.querySelectorAll('[data-formula-choice]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.formulaChoice===kind)));
 formula.querySelectorAll('[data-formula-pane]').forEach(p=>p.hidden=p.dataset.formulaPane!==kind);
}
const exporter=document.querySelector('.export-demo');
function selectExport(format){
 if(!exporter||!['pdf','svg','html','md'].includes(format))return;
 exporter.dataset.export=format;
 exporter.querySelectorAll('[data-export-choice]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.exportChoice===format)));
 exporter.querySelectorAll('[data-export-pane]').forEach(p=>p.hidden=p.dataset.exportPane!==format);
 exporter.querySelector('[data-export-extension]').textContent=format==='md'?'MARKDOWN':format.toUpperCase();
 const note=exporter.querySelector('.export-format-note'),key='export'+format.toUpperCase();note.dataset.i18n=key;note.textContent=messages[language][key];
}
const demoStates=new Map();
function updateRunning(state){
 const running=state.visible&&!state.paused&&!document.hidden&&!reducedMotion.matches;
 state.card.dataset.running=String(running);state.card.dataset.paused=String(state.paused);
 const button=state.card.querySelector('.demo-toggle');
 button.setAttribute('aria-pressed',String(state.paused));button.setAttribute('aria-label',messages[language][state.paused?'playDemo':'pauseDemo']);
 if(state.running!==running){state.running=running;state.nextAt=performance.now()+state.duration}
}
function setPaused(card,paused){const state=demoStates.get(card);if(!state)return;state.paused=paused;updateRunning(state);state.nextAt=performance.now()+state.duration}
const cycles={
 resources:{values:['pdf','md','image'],select:selectResource,duration:4400},
 structure:{values:['canvas','outline'],select:selectView,duration:5200},
 formula:{values:['diffusion','probability','matrix'],select:selectFormula,duration:6000},
 export:{values:['html','pdf','svg','md'],select:selectExport,duration:6000}
};
document.querySelectorAll('[data-demo]').forEach(card=>{
 const config=cycles[card.dataset.demo];if(!config)return;
 const state={card,...config,index:0,paused:false,visible:false,running:false,nextAt:Infinity};demoStates.set(card,state);
 card.querySelector('.demo-toggle').addEventListener('click',()=>setPaused(card,!state.paused));updateRunning(state);
});
if('IntersectionObserver' in window){
 const observer=new IntersectionObserver(entries=>{for(const entry of entries){const state=demoStates.get(entry.target);if(state){state.visible=entry.isIntersecting;updateRunning(state)}}},{threshold:.25});
 demoStates.forEach(state=>observer.observe(state.card));
}
const reducedChanged=()=>demoStates.forEach(updateRunning);reducedMotion.addEventListener('change',reducedChanged);document.addEventListener('visibilitychange',reducedChanged);
if(demoStates.size){
 setInterval(()=>{const now=performance.now();demoStates.forEach(state=>{if(!state.running||now<state.nextAt)return;state.index=(state.index+1)%state.values.length;state.select(state.values[state.index]);state.nextAt=now+state.duration})},500);
}
function manualChoice(button,select,key){button.addEventListener('click',()=>{setPaused(button.closest('[data-demo]'),true);select(button.dataset[key])})}
document.querySelectorAll('[data-resource-choice]').forEach(b=>manualChoice(b,selectResource,'resourceChoice'));
document.querySelectorAll('[data-view-choice]').forEach(b=>manualChoice(b,selectView,'viewChoice'));
document.querySelectorAll('[data-formula-choice]').forEach(b=>manualChoice(b,selectFormula,'formulaChoice'));
document.querySelectorAll('[data-export-choice]').forEach(b=>manualChoice(b,selectExport,'exportChoice'));
document.querySelector('.export-fold')?.addEventListener('click',e=>{
 const button=e.currentTarget,next=button.getAttribute('aria-expanded')!=='true';button.setAttribute('aria-expanded',String(next));document.querySelector('.export-tree').hidden=!next;setPaused(button.closest('[data-demo]'),true);
});

const dialog=document.querySelector('.image-dialog');
if(dialog){
 let previousFocus,drag=null;
 const scroll=dialog.querySelector('.image-scroll');
 function setImageSize(size){dialog.dataset.size=size;dialog.querySelectorAll('[data-image-size]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.imageSize===size)));scroll.scrollTop=0;scroll.scrollLeft=0}
 document.querySelector('[data-zoom]')?.addEventListener('click',e=>{
  const button=e.currentTarget,source=button.querySelector('[data-shot]');if(!source?.src)return;
  if(typeof dialog.showModal!=='function'){window.open(source.currentSrc||source.src,'_blank','noopener');return}
  const target=dialog.querySelector('img');target.src=source.currentSrc||source.src;target.alt=source.alt;target.width=source.naturalWidth||source.width;target.height=source.naturalHeight||source.height;previousFocus=button;setImageSize('fit');dialog.showModal();document.body.style.overflow='hidden';dialog.querySelector('.dialog-close').focus({preventScroll:true});
 });
 dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
 dialog.querySelectorAll('[data-image-size]').forEach(b=>b.addEventListener('click',()=>setImageSize(b.dataset.imageSize)));
 dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
 dialog.addEventListener('close',()=>{document.body.style.overflow='';drag=null;previousFocus?.focus({preventScroll:true})});
 scroll.addEventListener('dragstart',e=>e.preventDefault());
 scroll.addEventListener('pointerdown',e=>{if(dialog.dataset.size!=='actual'||e.pointerType!=='mouse'||e.button!==0)return;drag={id:e.pointerId,x:e.clientX,y:e.clientY,left:scroll.scrollLeft,top:scroll.scrollTop};scroll.setPointerCapture(e.pointerId)});
 scroll.addEventListener('pointermove',e=>{if(!drag||drag.id!==e.pointerId)return;scroll.scrollLeft=drag.left+drag.x-e.clientX;scroll.scrollTop=drag.top+drag.y-e.clientY});
 const release=()=>{drag=null};scroll.addEventListener('pointerup',release);scroll.addEventListener('pointercancel',release);scroll.addEventListener('lostpointercapture',release);
}
})();
