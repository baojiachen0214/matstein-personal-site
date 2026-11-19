/* Apply saved appearance before the first paint. No network requests. */
(() => {
 const root=document.documentElement;
 let lang=root.dataset.lang==='zh'?'zh':'en',theme='system';
 try{
  const query=new URLSearchParams(location.search).get('lang');
  if(query==='en'||query==='zh')lang=query;
  else if(root.dataset.landing!=='true')lang=localStorage.getItem('oden-lang')||lang;
  theme=localStorage.getItem('oden-theme')||'system';
 }catch{}
 root.dataset.lang=lang==='zh'?'zh':'en';root.lang=lang==='zh'?'zh-CN':'en';
 root.dataset.theme=['system','light','dark'].includes(theme)?theme:'system';
 root.dataset.scheme=theme==='dark'||theme==='system'&&matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light';
})();
