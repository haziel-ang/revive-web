'use strict';
let profileCase, profileTicket=0;
el('profileForm').onsubmit=async event=>{
  event.preventDefault();
  const ticket=++profileTicket, name=el('handle').value.trim(), selected=el('platform').value;
  if(!/^[a-z\d_.-]{1,64}$/i.test(name) || ['.','..'].includes(name)) {el('profileStatus').textContent='Nome utente non valido.';return;}
  const services=selected==='all'?['GitHub','GitLab']:[selected];
  el('profiles').replaceChildren();el('profileGraph').hidden=true;
  el('profileStatus').textContent='Ricerca in corso…';
  const rows=await Promise.all(services.map(async site=>{
    try{
      const github=site==='GitHub';
      const url=github?'https://api.github.com/users/'+encodeURIComponent(name):'https://gitlab.com/api/v4/users?'+new URLSearchParams({username:name});
      const response=await fetch(url,{credentials:'omit',signal:AbortSignal.timeout(14000)});
      if(github && response.status===404) return {site,state:'Nessuna corrispondenza'};
      if(!response.ok) throw Error();
      const data=await response.json();
      const account=github?data.login:data.find(row=>row.username?.toLowerCase()===name.toLowerCase())?.username;
      if(!account || account.toLowerCase()!==name.toLowerCase()) return {site,state:'Nessuna corrispondenza'};
      return {site,state:'Possibile profilo',url:(github?'https://github.com/':'https://gitlab.com/')+encodeURIComponent(account)};
    }catch{return {site,state:'Servizio non disponibile'};}
  }));
  if(ticket!==profileTicket) return;
  const origin='username:'+name.toLowerCase();
  profileCase={schema:1,target:name,createdAt:new Date().toISOString(),nodes:[{id:origin,kind:'username',label:name}],links:[]};
  for(const row of rows){
    const line=node('p','');line.append(node('strong',row.site),' · ',node('span',row.state));
    if(row.url){
      const link=node('a','Apri profilo');link.href=row.url;link.target='_blank';link.rel='noopener noreferrer';line.append(' ',link);
      const id='account:'+row.url.toLowerCase();profileCase.nodes.push({id,kind:'account',label:row.site});profileCase.links.push({from:origin,to:id,relation:'possible account'});
    }
    el('profiles').append(line);
  }
  el('profileStatus').textContent='Ricerca completata.';
  el('profileGraph').hidden=!profileCase.links.length;
};
el('profileGraph').onclick=()=>{if(profileCase){showCase(profileCase);location.hash='grafo';}};