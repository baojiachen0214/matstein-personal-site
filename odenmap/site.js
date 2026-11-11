"use strict";
(() => {
const messages = {
  "en": {
    "skip": "Skip to content",
    "navFeatures": "Features",
    "navExport": "Export & share",
    "support": "Support",
    "appearance": "Appearance",
    "system": "System",
    "light": "Light",
    "dark": "Dark",
    "navJoin": "Back to MatStein ↗",
    "heroEyebrow": "PERSONAL PROJECT · NATIVE MAC MIND MAPPING",
    "heroA": "Mind maps,",
    "heroB": "with more inside.",
    "heroLead": "Build a mind map with images, PDFs, Markdown and editable formulas inside its nodes. Switch to an outline to write, connect tasks to Calendar and Reminders, then share a document or an offline webpage.",
    "join": "Back to MatStein",
    "takeLook": "Take a closer look",
    "macRequirements": "Project notes · Native screenshots captured in October 2026",
    "actualApp": "Odenverse, in the real Mac app.",
    "enlarge": "Click to see the details ↗",
    "nativeMac": "Canvas + outline. One document.",
    "localFiles": "Files and formulas inside nodes",
    "swiftBuilt": "Native Swift. Local documents.",
    "featureEyebrow": "TEXT, FILES AND FORMULAS — CONNECTED",
    "featureA": "Build the map.",
    "featureB": "Keep the evidence inside.",
    "featureLead": "A PDF page, a research note, a formula: give each one a place in your map. Read the source where you use it, instead of separating the idea from its evidence.",
    "resourcesLabel": "RESOURCE NODES",
    "resourcesTitle": "Put the source inside the node.",
    "resourcesBody": "Drag in images, PDFs or Markdown as resource nodes, or attach a file above a text topic. Turn PDF pages and scroll enlarged Markdown cards on the canvas. Link originals or embed resources in your document.",
    "imagesTag": "Images",
    "writingLabel": "TWO WAYS TO EDIT",
    "writingTitle": "One document. Canvas or outline.",
    "writingBody": "Edit the same topics and hierarchy in either view. Draft with rich text and formulas in the outline, then return to the canvas. Your map and writing stay in one document.",
    "connectTitle": "A mind map can be a node.",
    "connectBody": "Drop a supported mind map into your canvas as a preview card. See its structure in context, use Quick Look for detail, or open the original file in its app.",
    "mathTitle": "Write formulas. Keep them editable.",
    "mathBody": "TeX source stays with the topic. Use inline and display math, aligned derivations, matrices and cases, then return to the source to revise it.",
    "styleTitle": "Style the line, too.",
    "styleBody": "Choose connection shapes, widths, dashes and pressure curves. Set the whole map’s layout or give a branch its own structure, with automatic and free placement options.",
    "exportEyebrow": "EXPORT WORKFLOW",
    "exportA": "12 ways to",
    "exportB": "share your map.",
    "exportBody": "The documented export workflow includes 12 formats: documents and images for reading, offline HTML for exploring, and exchange formats for continued editing. Preview the result before saving.",
    "exportPoint1": "Offline HTML: images, branch folding and notes, without an app account",
    "exportPoint2": "PNG, SVG and JPEG XL: transparent backgrounds and optional grids",
    "exportPoint3": "Print: PDF/X-3 or PDF/X-4, CMYK profiles and poster tiles",
    "exportCaption": "Native export window · October 2026.",
    "appleEyebrow": "AT HOME ON APPLE",
    "platformTitle": "Built around native Mac tools.",
    "macPlatform": "Swift, SwiftUI and AppKit. Local .odenmap files, native menus and system previews.",
    "footerLine": "Mind maps with files, formulas and a way forward.",
    "privacy": "Privacy",
    "testNotes": "Test notes",
    "footerNative": "Made natively for Mac. Built with Swift.",
    "openSource": "Open source",
    "arcEyebrow": "AN OPEN-SOURCE COMPANION",
    "arcTitle": "Give your AI a map-making toolkit.",
    "arcBody": "Give your AI assistant a clear way to create OdenMap files. Oden ARC is an open-source skill and local toolkit that organizes documents, images and tables into traceable mind maps, with source links and editable formulas.",
    "arcSources": "Your sources",
    "arcHost": "Oden ARC + your AI",
    "arcLink": "Explore Oden ARC on GitHub",
    "arcScope": "MIT-licensed skill and tools. Runs alongside your AI host; OdenMap remains a separate, closed-source app.",
    "capEyebrow": "FROM RESEARCH TO ACTION",
    "capTitle": "More of your workflow, in one map.",
    "capTasksTitle": "Calendar & Reminders, connected",
    "capTasksBody": "Turn a branch into tasks and track completion from its parent. Link leaf tasks to Reminders or schedule topics in Calendar; supported dates and changes sync both ways. Batch controls handle several topics together.",
    "capPresentTitle": "Present straight from the map",
    "capPresentBody": "Present the whole map or one branch in a native window. Reveal the hierarchy step by step, keep speaker notes nearby, and open a selected resource in Quick Look.",
    "capImportTitle": "Bring your existing maps",
    "capImportBody": "Import XMind, MindNode Classic, FreeMind, MindManager, OPML and more. Transfer supported topics, notes and resources; proprietary layouts and styles vary by format.",
    "capShareTitle": "Send from Finder and other apps",
    "capShareBody": "Use Finder Quick Actions, macOS Services or the Share menu to send text, images and files to an open map. Finder thumbnails and Quick Look make saved maps easier to find. System extensions need to be enabled.",
    "capOrganizeTitle": "Group, connect and focus",
    "capOrganizeBody": "Connect topics beyond the hierarchy, add summaries and background frames, group children by label, or fold and search branches to focus on one part of the map.",
    "capControlTitle": "Make the controls yours",
    "capControlBody": "Customize shortcuts for canvas editing, writing, formulas and presenting. Work with a trackpad or mouse, and switch English or Chinese interfaces with native offline help.",
    "nativeBadge": "NATIVE APP"
  },
  "zh": {
    "skip": "跳到正文",
    "navFeatures": "功能亮点",
    "navExport": "导出与分享",
    "support": "支持",
    "appearance": "外观",
    "system": "跟随系统",
    "light": "浅色",
    "dark": "深色",
    "navJoin": "返回个人站 ↗",
    "heroEyebrow": "个人项目 · 原生 MAC 思维导图",
    "heroA": "思维导图，",
    "heroB": "把资料连成思路。",
    "heroLead": "把图片、PDF、Markdown 和可编辑公式放进节点。在画布与大纲间切换，用日历和提醒事项推进任务，再把整张导图分享成文稿或离线网页。",
    "join": "返回个人站",
    "takeLook": "走近看一看",
    "macRequirements": "项目介绍 · 原生截图摄于 2026 年 10 月",
    "actualApp": "关东煮宇宙，真实 Mac 界面。",
    "enlarge": "点击查看细节 ↗",
    "nativeMac": "画布与大纲，同一份文稿",
    "localFiles": "文件与公式，直接放进节点",
    "swiftBuilt": "Swift 原生开发，文稿本地保存",
    "featureEyebrow": "文字、文件、公式，共处一张导图",
    "featureA": "一张导图，",
    "featureB": "容纳文字与文件。",
    "featureLead": "让 PDF 页面、研究笔记和公式各有位置。读资料、理结构、写推导，在同一份文稿里完成，不再把结论和依据拆散。",
    "resourcesLabel": "可预览的资源节点",
    "resourcesTitle": "把文件，放进节点里。",
    "resourcesBody": "拖入图片、PDF 或 Markdown，生成资源节点，也能把文件嵌在文字主题上方。在画布内翻阅 PDF、滚动阅读放大的 Markdown 卡片；资源可链接原文件，也可嵌入文稿保存。",
    "imagesTag": "图片",
    "writingLabel": "一份内容，两种编辑方式",
    "writingTitle": "画布理结构，大纲写内容。",
    "writingBody": "两种视图直接编辑同一组主题与层级。在大纲中写富文本、整理段落和公式，再回到画布查看全局，不需要维护两份内容。",
    "connectTitle": "另一张导图，也能成为节点。",
    "connectBody": "把受支持的思维导图文件拖入画布，以资源卡片预览它的结构。需要细看时用快速预览，也能在原应用中打开文件。",
    "mathTitle": "公式能排版，也能继续编辑。",
    "mathBody": "TeX 源码保存在主题中。行内与独立公式、对齐推导、矩阵和分段表达式，都能排版显示，并随时回到源码修改。",
    "styleTitle": "连线，也值得细调。",
    "styleBody": "线条形状、宽度、虚线与压力曲线都能调整。既能设置整张导图的布局，也能让分支使用独立结构，结合自动排版与自由摆放。",
    "exportEyebrow": "导出流程",
    "exportA": "12 种格式，",
    "exportB": "把导图带出去。",
    "exportBody": "项目文档中的导出流程包含 12 种格式：用文稿和图片呈现内容，用离线 HTML 保留浏览交互，用交换格式继续编辑。保存前可在原生窗口检查预览。",
    "exportPoint1": "离线 HTML：保留图片、分支折叠与备注，打开网页即可浏览",
    "exportPoint2": "PNG、SVG、JPEG XL：透明背景与网格分别设置",
    "exportPoint3": "印前 PDF：PDF/X-3、PDF/X-4、CMYK 配置与海报拼接",
    "exportCaption": "原生导出窗口 · 2026 年 10 月。",
    "appleEyebrow": "为 APPLE 设备而设计",
    "platformTitle": "围绕 Mac 原生能力构建。",
    "macPlatform": "Swift、SwiftUI 与 AppKit 构建。本地 .odenmap 文稿、原生菜单与系统预览。",
    "footerLine": "让文字、资料和行动，在导图中连起来。",
    "privacy": "隐私",
    "testNotes": "测试记录",
    "footerNative": "为 Mac 原生开发，使用 Swift 构建。",
    "openSource": "开源项目",
    "arcEyebrow": "让 AI 更懂你的导图",
    "arcTitle": "让 AI 生成有据可循的导图。",
    "arcBody": "给 AI 助手一套清晰的导图生成方法。Oden ARC 是开源技能与本地工具包，帮助它将文档、图片和表格整理成 OdenMap 文件，保留来源链接、证据与可编辑公式。",
    "arcSources": "你的资料",
    "arcHost": "Oden ARC + AI 助手",
    "arcLink": "在 GitHub 了解 Oden ARC",
    "arcScope": "技能与工具采用 MIT 许可，配合你使用的 AI 宿主运行。OdenMap 软件本体独立开发，保持闭源。",
    "capEyebrow": "从整理资料，到推进项目",
    "capTitle": "不只整理想法，也推进下一步。",
    "capTasksTitle": "与日历、提醒事项双向联动",
    "capTasksBody": "把分支变成任务，由父主题汇总进度。末级任务可关联提醒事项，主题也能安排到日历；受支持的日期与修改双向同步，并支持多选批量设置。",
    "capPresentTitle": "直接沿着导图演讲",
    "capPresentBody": "在原生窗口中演讲整张导图或当前分支，逐级展开结构，查看演讲备注，并快速预览选中的资源。",
    "capImportTitle": "把已有导图带进来",
    "capImportBody": "导入 XMind、MindNode Classic、FreeMind、MindManager、OPML 等格式，迁移受支持的主题、备注与资源；专有布局及样式的还原程度随格式而异。",
    "capShareTitle": "从访达和其他应用直接添加",
    "capShareBody": "启用系统扩展后，通过访达快速操作、macOS 服务或分享菜单，把文字、图片和文件送入已打开的导图。保存后还能在访达查看缩略图与快速预览。",
    "capOrganizeTitle": "标签、关联与聚焦",
    "capOrganizeBody": "跨层级连接主题，添加概要与背景框，按标签归组子主题；通过折叠、搜索与聚焦，把注意力留给当前问题。",
    "capControlTitle": "按自己的习惯操作",
    "capControlBody": "分别调整画布、文字、公式与演讲快捷键，使用触控板或鼠标操作。支持中英文界面，并配有可离线搜索的原生使用手册。",
    "nativeBadge": "原生应用"
  }
};

const root = document.documentElement;
const systemDark = matchMedia('(prefers-color-scheme: dark)');
const storage = {get(key){try{return localStorage.getItem(key)}catch{return null}},set(key,value){try{localStorage.setItem(key,value)}catch{}}};
let language = root.dataset.lang === 'zh' ? 'zh' : 'en';
let theme = ['system','light','dark'].includes(root.dataset.theme) ? root.dataset.theme : 'system';
const titles = {
 'index.html': {en:'OdenMap — Native mind maps for Mac',zh:'OdenMap — 原生 Mac 思维导图与资源画布'},
 'support.html': {en:'Support — OdenMap',zh:'支持 — OdenMap'},
 'privacy.html': {en:'Privacy — OdenMap',zh:'隐私政策 — OdenMap'},
 'performance.html': {en:'Test notes — OdenMap',zh:'测试记录 — OdenMap'}
};
const shotAlts = {
 canvas:{en:'OdenMap native canvas with the Odenverse sample, captured in October 2026.',zh:'OdenMap 原生画布中的关东煮宇宙示例，摄于 2026 年 10 月。'},
 resources:{en:'Odenverse in OdenMap: an embedded illustration beside its connected topics, with the style inspector open.',zh:'OdenMap 资源画布局部：嵌入的插画、相连主题与右侧样式检查器。'},
 writing:{en:'The native OdenMap structured writing view, with topics and resources.',zh:'OdenMap 原生结构化写作视图，包含主题和资源。'},
 export:{en:'The native OdenMap export window and preview, captured in October 2026.',zh:'OdenMap 原生导出窗口与预览，摄于 2026 年 10 月。'}
};
function updateScreenshots(){
 const scheme=root.dataset.scheme||'light';
 document.querySelectorAll('[data-shot]').forEach(img=>{
  const kind=img.dataset.shot;
  const localized=kind!=='export';
  const src=localized?'assets/odenverse-'+kind+'-'+language+'-'+scheme+'.webp':'assets/export-'+scheme+'.webp';
  if(img.getAttribute('src')!==src)img.src=src;
  const size=localized?(kind==='canvas'&&language==='zh'?[2160,1344]:[2400,1450]):[2000,1519];
  img.width=size[0];img.height=size[1];
  img.alt=shotAlts[kind][language];
 });
}
function applyLanguage(next,save=false){
 language=next==='zh'?'zh':'en';
 root.dataset.lang=language;root.lang=language==='zh'?'zh-Hans':'en';
 document.querySelectorAll('[data-i18n]').forEach(el=>{const value=messages[language][el.dataset.i18n];if(value!==undefined)el.textContent=value});
 document.querySelectorAll('[lang="en"], [lang="zh-Hans"]').forEach(el=>{if(el===root)return;el.hidden=el.lang!==(language==='zh'?'zh-Hans':'en')});
 const toggle=document.querySelector('#language-switch');
 toggle.textContent=language==='zh'?'EN':'中文';toggle.setAttribute('aria-label',language==='zh'?'Switch to English':'切换到简体中文');
 document.querySelector('.appearance summary').setAttribute('aria-label',messages[language].appearance);
 document.querySelectorAll('[data-local]').forEach(a=>{const u=new URL(a.getAttribute('href'),location.href);u.searchParams.set('lang',language);a.href=u.href});
 document.querySelectorAll('[data-home]').forEach(a=>{a.href=language==='zh'?'/':'/en/'});
 updateScreenshots();
 document.querySelectorAll('[data-zoom]').forEach(b=>b.setAttribute('aria-label',language==='zh'?'放大查看截图':'View full screenshot'));
 document.querySelector('.desktop-nav').setAttribute('aria-label',language==='zh'?'主导航':'Main navigation');
 document.querySelector('.footer-bottom nav').setAttribute('aria-label',language==='zh'?'页脚':'Footer');
 const dialog=document.querySelector('.image-dialog');
 if(dialog){dialog.setAttribute('aria-label',language==='zh'?'产品截图':'Screenshot');dialog.querySelector('button').setAttribute('aria-label',language==='zh'?'关闭截图':'Close screenshot')}
 const page=location.pathname.split('/').pop()||'index.html';document.title=(titles[page]||titles['index.html'])[language];
 document.querySelector('meta[name="description"]').content=language==='zh'?'OdenMap 个人项目介绍：原生 Mac 思维导图、资源节点、可编辑公式、画布与大纲及系统联动。':'Project notes for OdenMap: a native Mac mind-mapping app with resource nodes, editable formulas, canvas, outline and system integrations.';
 if(save){storage.set('oden-lang',language);const u=new URL(location.href);u.searchParams.set('lang',language);history.replaceState(null,'',u)}
}
function applyTheme(next,save=false){
 theme=['system','light','dark'].includes(next)?next:'system';
 const scheme=theme==='system'?(systemDark.matches?'dark':'light'):theme;
 root.dataset.theme=theme;root.dataset.scheme=scheme;
 document.querySelector('meta[name="theme-color"]').content=scheme==='dark'?'#191b19':'#f8f8f5';
 document.querySelectorAll('[data-theme-choice]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.themeChoice===theme)));
 updateScreenshots();
 if(save)storage.set('oden-theme',theme);
}
applyLanguage(language);applyTheme(theme);
document.querySelector('#language-switch').addEventListener('click',()=>applyLanguage(language==='zh'?'en':'zh',true));
document.querySelectorAll('[data-theme-choice]').forEach(b=>b.addEventListener('click',()=>{applyTheme(b.dataset.themeChoice,true);document.querySelector('.appearance').open=false}));
systemDark.addEventListener('change',()=>{if(theme==='system')applyTheme(theme)});
const appearance=document.querySelector('.appearance');
document.addEventListener('click',e=>{if(!appearance.contains(e.target))appearance.open=false});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&appearance.open){appearance.open=false;appearance.querySelector('summary').focus()}});
const dialog=document.querySelector('.image-dialog');
if(dialog){
 let previousFocus;
 document.querySelectorAll('[data-zoom]').forEach(b=>b.addEventListener('click',()=>{const source=b.querySelector('img');const target=dialog.querySelector('img');target.src=source.currentSrc;target.alt=source.alt;previousFocus=b;dialog.showModal();document.body.style.overflow='hidden'}));
 dialog.querySelector('button').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
 dialog.addEventListener('close',()=>{document.body.style.overflow='';if(previousFocus)previousFocus.focus({preventScroll:true})});
}
})();
