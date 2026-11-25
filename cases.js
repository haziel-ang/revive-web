'use strict';
const casePrefix = 'revive.graph.';
let shownCase, savedKey, revision = 0;
const svgNS = 'http://www.w3.org/2000/svg';
function elementSVG(tag, attrs) {
  const item = document.createElementNS(svgNS,tag);
  for (const [key,value] of Object.entries(attrs)) item.setAttribute(key,value);
  return item;
}
function validateCase(data) {
  function string(value,max) {return typeof value === 'string' && value.length > 0 && value.length <= max;}
  if (!data || data.schema !== 1 || !string(data.target,256) || !Number.isFinite(Date.parse(data.createdAt)) ||
      !Array.isArray(data.nodes) || !data.nodes.length || data.nodes.length > 1200 ||
      !Array.isArray(data.links) || data.links.length > 2400) throw Error('Formato o dimensione dello snapshot non supportati.');
  const ids = new Set();
  const nodes = data.nodes.map(({id,kind,label}) => {
    if (!string(id,2048) || !string(kind,64) || !string(label,2048) || ids.has(id)) throw Error('Nodo non valido o duplicato.');
    ids.add(id); return {id,kind,label};
  });
  const links = data.links.map(({from,to,relation}) => {
    if (!ids.has(from) || !ids.has(to) || !string(relation,128)) throw Error('Relazione non valida.');
    return {from,to,relation};
  });
  return {schema:1,target:data.target,createdAt:data.createdAt,nodes,links};
}
function savedCases() {
  const list = [];
  for(let i=0;i<localStorage.length;i++) {
    const key=localStorage.key(i);
    if (!key?.startsWith(casePrefix)) continue;
    try {list.push({key,data:validateCase(JSON.parse(localStorage.getItem(key)))});} catch {}
  }
  return list.sort((a,b)=>Date.parse(b.data.createdAt)-Date.parse(a.data.createdAt));
}
function refreshHistory() {
  const select=el('history');
  select.replaceChildren(new Option('Scegli un caso salvato',''));
  try {for (const {key,data} of savedCases()) select.add(new Option(data.target+' · '+new Date(data.createdAt).toLocaleString(document.documentElement.lang),key));}
  catch {el('graphStatus').textContent='Cronologia non disponibile in questo browser.';}
  select.value=savedKey || '';
}
function drawCase(data) {
  const sources=new Set(data.links.map(edge=>edge.from)), positions=new Map(), counts=[0,0];
  for(const item of data.nodes) {
    const column=sources.has(item.id) ? 0 : 1;
    positions.set(item.id,{x:column?350:10,y:20+counts[column]++*46});
  }
  const height=Math.max(...counts)*46+30;
  const svg=elementSVG('svg',{width:620,height,role:'img','aria-label':data.target+' · '+data.nodes.length+' nodi'});
  for(const edge of data.links){
    const a=positions.get(edge.from),b=positions.get(edge.to);
    svg.append(elementSVG('line',{x1:a.x+210,y1:a.y+13,x2:b.x,y2:b.y+13,stroke:'var(--field)'}));
  }
  for(const item of data.nodes) {
    const {x,y}=positions.get(item.id);
    const group=elementSVG('g',{}), title=elementSVG('title',{});
    title.textContent=item.kind+' · '+item.label;
    const caption=elementSVG('text',{x:x+9,y:y+18,fill:'var(--ink)','font-size':13});
    caption.textContent=item.label.length>26 ? item.label.slice(0,25)+'…' : item.label;
    group.append(title,elementSVG('rect',{x,y,width:210,height:28,rx:6,fill:'var(--tint)',stroke:'var(--field)'}),caption);
    svg.append(group);
  }
  el('drawing').replaceChildren(svg);
  const labels=new Map(data.nodes.map(item=>[item.id,item.label]));
  el('edges').replaceChildren(...data.links.map(edge=>node('li',labels.get(edge.from)+' → '+edge.relation+' → '+labels.get(edge.to))));
}
function showCase(raw,key=null,message='') {
  const data=validateCase(raw);
  ++revision; shownCase=data; savedKey=key;
  drawCase(data);
  el('graphTitle').textContent=data.target;
  el('graphStatus').textContent=data.nodes.length+' nodi · '+data.links.length+' relazioni. '+message;
  el('edgeDetails').hidden=!data.links.length;
  el('caseActions').hidden=false; el('saveCase').disabled=!!key; el('deleteCase').hidden=!key;
  el('history').value=key || '';
}
refreshHistory();
el('history').onchange=()=>{const key=el('history').value;if(key) try {showCase(JSON.parse(localStorage.getItem(key)),key);} catch {el('graphStatus').textContent='Caso non disponibile.';}};
el('importCase').onchange=async event=>{
  const file=event.target.files[0], ticket=++revision; event.target.value='';
  if (!file) return;
  try {if(file.size>2000000) throw Error('Limite per snapshot: 2 MB.');
    const data=JSON.parse((await file.text()).replace(/^\uFEFF/,''));
    if(ticket===revision) showCase(data,null,'Importato dal dispositivo.');
  } catch(error){if(ticket===revision) el('graphStatus').textContent='Importazione fallita. '+error.message;}
};
el('saveCase').onclick=()=>{if(!shownCase || savedKey) return;
  try {const key=casePrefix+crypto.randomUUID();localStorage.setItem(key,JSON.stringify(shownCase));savedKey=key;refreshHistory();showCase(shownCase,key,'Salvato in questo browser.');}
  catch {el('graphStatus').textContent='Salvataggio non riuscito. Puoi esportare il JSON.';}
};
el('deleteCase').onclick=()=>{if(savedKey && confirm(translate('Eliminare questo caso dalla cronologia del browser?'))){
  try {localStorage.removeItem(savedKey);showCase(shownCase,null,'Rimosso dalla cronologia.');refreshHistory();}
  catch {el('graphStatus').textContent='Eliminazione non riuscita.';}
}};
el('exportCase').onclick=()=>{
  if (!shownCase) return;
  const url=URL.createObjectURL(new Blob([JSON.stringify(shownCase,null,2)],{type:'application/json'}));
  const a=node('a','');a.href=url;a.download='revive-'+shownCase.target.replace(/[^a-z0-9.-]/gi,'_')+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
};
el('compareCases').onclick=()=>{
  try {
    const entries=savedCases(),nodes=new Map(),links=new Map(),seen=new Map();
    if(entries.length<2) throw Error('Salva almeno due casi per confrontarli.');
    for (const {data} of entries) {
      for(const item of data.nodes){nodes.set(item.id,item);seen.set(item.id,1+(seen.get(item.id)||0));}
      for(const edge of data.links) links.set(JSON.stringify([edge.from,edge.to,edge.relation]),edge);
    }
    const shared=[...nodes.values()].filter(item=>seen.get(item.id)>1);
    showCase({schema:1,target:'Confronto dei casi',createdAt:new Date().toISOString(),nodes:[...nodes.values()],links:[...links.values()]},null,
      'Risorse condivise: '+(shared.map(item=>item.label).join(', ') || 'nessuna')+'.');
    el('saveCase').disabled=true;
  }catch(error){el('graphStatus').textContent=error.message;}
};
async function readPublicJSON(url) {
  const response=await fetch(url,{credentials:'omit',referrerPolicy:'no-referrer',signal:AbortSignal.timeout(14000)});
  if(!response.ok) throw Error('HTTP '+response.status);
  return response.json();
}
el('domainGraph').onsubmit=async event=>{
  event.preventDefault();
  const ticket=++revision;
  let rdap;
  try {rdap=endpoint('domain',el('graphTarget').value);} catch(error){el('graphStatus').textContent=error.message;return;}
  const domain=decodeURIComponent(rdap.split('/').pop()), origin='domain:'+domain;
  el('graphStatus').textContent='Consultazione dei registri in corso…';
  const types=[['A',1],['AAAA',28],['NS',2],['MX',15]];
  const tasks=types.map(async ([type,code])=>{
    const data=await readPublicJSON('https://dns.google/resolve?'+new URLSearchParams({name:domain,type}));
    if(data.Status!==0) throw Error('DNS '+data.Status);
    return (data.Answer||[]).filter(r=>r.type===code).map(r=>({
      kind:code===1||code===28?'ip':'host',label:r.data.replace(/^\d+\s+/,'').replace(/\.$/,'').toLowerCase(),relation:type
    })).filter(item=>item.label);
  });
  tasks.push(readPublicJSON(rdap).then(data=>(data.entities||[]).filter(e=>e.roles?.includes('registrar')).map(e=>({
    kind:'registrar',label:String(e.vcardArray?.[1]?.find(v=>v[0]==='fn')?.[3] || e.handle || ''),relation:'registrar'
  })).filter(item=>item.label)));
  const answers=await Promise.allSettled(tasks);
  if(ticket!==revision) return;
  const nodes=new Map([[origin,{id:origin,kind:'domain',label:domain}]]),links=new Map(),missing=[];
  answers.forEach((answer,index)=>{
    if(answer.status==='rejected') {missing.push(types[index]?.[0] || 'RDAP');return;}
    for(const {kind,label,relation} of answer.value){
      const id=kind+':'+label.toLowerCase();nodes.set(id,{id,kind,label});
      links.set(relation+':'+id,{from:origin,to:id,relation});
    }
  });
  showCase({schema:1,target:domain,createdAt:new Date().toISOString(),nodes:[...nodes.values()],links:[...links.values()]},null,
    missing.length?'Fonti non disponibili: '+missing.join(', ')+'.':'Consultazione completata.');
};