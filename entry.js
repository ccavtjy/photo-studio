(async()=>{
 const repo=document.body.dataset.repo;const status=document.querySelector('#status');
 try{
  const response=await fetch(`https://api.github.com/repos/${repo}/contents/target.json?ref=main&fresh=${Date.now()}`,{cache:'no-store',credentials:'omit',headers:{Accept:'application/vnd.github+json'},signal:AbortSignal.timeout(12000)});
  if(!response.ok)throw new Error('入口暂时无法更新');
  const file=await response.json();const target=JSON.parse(atob(file.content.replace(/\s/g,''))).url;
  if(!/^https:\/\/[a-z0-9-]+\.trycloudflare\.com$/.test(target))throw new Error('入口地址无效');
  document.querySelector('#direct').href=target;status.textContent='工坊已连接，正在进入…';
  location.replace(target+'/'+location.hash);
 }catch{status.textContent='暂时无法自动连接。你可以点击下方按钮，或稍后再试。';}
})();
