'use strict';
const el = id => document.getElementById(id);
function route() {
  const page = ['username', 'grafo', 'https', 'integrita'].includes(location.hash.slice(1)) ? location.hash.slice(1) : 'osint';
  document.querySelectorAll('main section').forEach(s => s.hidden = s.id !== page);
  document.querySelectorAll('nav a').forEach(a => {
    if (a.hash === '#' + page) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
}
document.querySelector('.skip').addEventListener('click', event => {
  event.preventDefault();
  el('workspace').focus();
});
window.addEventListener('hashchange', route);
route();

const service = el('service'), target = el('target'), results = el('results');
const modes = {
  geo: ['Indirizzo IP', '8.8.8.8'], ct: ['Dominio', 'example.org'], network: ['Indirizzo IP', '8.8.8.8'], ptr: ['Indirizzo IP', '8.8.8.8'], domain: ['Dominio', 'esempio.it'], dns: ['Nome DNS', 'example.org'],
  ip: ['Indirizzo IPv4 o IPv6', '2001:4860:4860::8888'], asn: ['Numero AS', 'AS15169']
};
let active;
function resetQuery() {
  active?.abort();
  active = null;
  results.replaceChildren();
  el('status').textContent = 'In attesa di una consultazione.';
  const mode = service.value;
  el('recordLabel').hidden = mode !== 'dns';
  el('targetLabel').textContent = modes[mode][0];
  target.placeholder = mode === 'dns' && el('record').value === 'PTR' ? '8.8.8.8.in-addr.arpa' : modes[mode][1];
  el('provider').textContent = mode === 'geo' ? 'Consulta invia l’indirizzo a Country.is.' : mode === 'ct' ? 'Consulta invia il dominio a Cert Spotter.' : mode === 'network' ? 'Consulta invia l’indirizzo a RIPEstat.' : mode === 'ptr' ? 'Consulta invia il nome inverso a Google Public DNS.' : mode === 'dns' ? 'Consulta invia il nome a Google Public DNS.' : 'Consulta invia il valore a RDAP.org e al registro competente.';
}
service.onchange = resetQuery;
el('record').onchange = resetQuery;
resetQuery();
function address(input) {
  if (input.includes(':') && /^[a-f0-9:.]+$/i.test(input)) {
    try { return new URL('https://[' + input + ']').hostname.slice(1, -1); } catch {}
  }
  if (/^(0|[1-9]\d{0,2})(\.(0|[1-9]\d{0,2})){3}$/.test(input) && input.split('.').every(n => Number(n) <= 255)) return input;
  throw Error('Inserisci un singolo indirizzo IPv4 o IPv6 valido.');
}
function endpoint(mode, raw) {
  let value = raw.trim();
  if (['ip','network','ptr','geo'].includes(mode)) value = address(value);
  if (mode === 'geo') return 'https://api.country.is/' + encodeURIComponent(value);
  if (mode === 'network') return 'https://stat.ripe.net/data/network-info/data.json?resource=' + encodeURIComponent(value);
  if (mode === 'ptr') {
    let reverse;
    if (value.includes(':')) {
      const [left,right] = value.split('::').map(part => part ? part.split(':') : []);
      const groups = right ? [...left,...Array(8-left.length-right.length).fill('0'),...right] : left;
      reverse = groups.map(part => part.padStart(4,'0')).join('').split('').reverse().join('.') + '.ip6.arpa';
    } else reverse = value.split('.').reverse().join('.') + '.in-addr.arpa';
    return 'https://dns.google/resolve?' + new URLSearchParams({name:reverse,type:'PTR'});
  }
  if (mode === 'ip') return 'https://rdap.org/ip/' + encodeURIComponent(value);
  else if (mode === 'asn') {
    value = value.replace(/^AS/i, '');
    if (!/^\d{1,10}$/.test(value) || +value > 4294967295) throw Error('Inserisci un numero AS tra 0 e 4294967295.');
  } else {
    value = value.replace(/\.$/, '');
    if (!/^[\p{L}\p{M}\p{N}_.-]+$/u.test(value)) throw Error('Inserisci un nome di dominio, per esempio example.org.');
    let host;
    try {host = new URL('https://' + value).hostname;} catch {}
    const label = mode === 'dns' ? /^[a-z0-9_-]{1,63}$/i : /^(?!-)[a-z0-9-]{1,63}(?<!-)$/i;
    if (!host || host.length > 253 || !host.includes('.') || !host.split('.').every(s => label.test(s)) || /^\d+$/.test(host.split('.').pop())) throw Error('Verifica il nome di dominio inserito.');
    value = host;
  }
  if (mode === 'ct') return 'https://api.certspotter.com/v1/issuances?' + new URLSearchParams({domain:value,expand:'dns_names'});
  if (mode === 'dns') return 'https://dns.google/resolve?' + new URLSearchParams({name:value, type:el('record').value});
  return 'https://rdap.org/' + (mode === 'asn' ? 'autnum' : mode) + '/' + encodeURIComponent(value);
}
function node(tag, text) {
  const item = document.createElement(tag);
  item.textContent = text;
  return item;
}
el('lookup').onsubmit = async event => {
  event.preventDefault();
  resetQuery();
  const mode = service.value;
  let url;
  try { url = endpoint(mode, target.value); }
  catch (error) { el('status').textContent = error.message; return; }
  const controller = new AbortController();
  active = controller;
  const timer = setTimeout(() => controller.abort(), 14000);
  const link = node('a', 'Apri la risposta del servizio');
  link.href = url; link.target = '_blank'; link.rel = 'noopener noreferrer';
  results.append(link);
  if (mode === 'geo') {
    const credit=node('a','IP Geolocation by Country.is'); credit.href='https://country.is/';
    results.append(node('br',''),credit);
  }
  if (mode === 'domain') {
    const guide=node('a','Verifica TLS e intestazioni HTTP');
    guide.href='#https'; results.append(node('br',''),guide);
    el('httpsDomain').value=decodeURIComponent(url.split('/').pop());
  }
  if (mode === 'ct') {
    const alternate = node('a','Consulta lo storico su crt.sh');
    alternate.href = 'https://crt.sh/?' + new URLSearchParams({q:new URL(url).searchParams.get('domain')});
    alternate.target='_blank'; alternate.rel='noopener noreferrer'; results.append(node('br',''),alternate);
  }
  el('status').textContent = 'Consultazione in corso…';
  try {
    const response = await fetch(url, {signal:controller.signal, credentials:'omit', referrerPolicy:'no-referrer'});
    if (!response.ok) throw Error(response.status === 404 ? 'Il registro non contiene questa risorsa.' : 'Il servizio ha risposto con HTTP ' + response.status + '.');
    const data = await response.json();
    if (active !== controller) return;
    const list = document.createElement('dl');
    function field(key, val) {if (val !== undefined && val !== null && val !== '') list.append(node('dt',key),node('dd',String(val)));}
    if (mode === 'geo') {
      if (!data.country || data.error) throw Error('Geolocalizzazione non disponibile.');
      field('Paese',data.country);

    } else if (mode === 'network') {
      if (data.status !== 'ok') throw Error('RIPEstat non ha restituito i dati di rete.');
      field('Prefisso',data.data.prefix); field('Sistemi autonomi',data.data.asns.join(', '));
    } else if (mode === 'ct') {
      if (!Array.isArray(data)) throw Error('Risposta CT inattesa.');
      for (const cert of data) field(cert.dns_names.join(', '), 'Scadenza ' + cert.not_after);
    } else if (mode === 'ptr' || mode === 'dns') {
      if (data.Status !== 0) throw Error(data.Status === 3 ? 'Il nome DNS non esiste (NXDOMAIN).' : 'Errore del resolver DNS, codice ' + data.Status + '.');
      for (const row of data.Answer || []) field(row.name + ' · TTL ' + row.TTL, row.data);
    } else {
      field('Nome', data.ldhName || data.name); field('Identificativo', data.handle);
      field('Paese del registro', data.country); field('Inizio intervallo', data.startAddress ?? data.startAutnum);
      field('Fine intervallo', data.endAddress ?? data.endAutnum);
      for (const entry of data.events || []) field(entry.eventAction, entry.eventDate);
      if (data.status?.length) field('Stato',data.status.join(', '));
      if (typeof data.secureDNS?.delegationSigned === 'boolean') field('DNSSEC', String(data.secureDNS.delegationSigned));
      for (const entity of data.entities || []) {
        const display = entity.vcardArray?.[1]?.find(row=>row[0]==='fn')?.[3];
        if(display) field((entity.roles || []).join(', ') || 'RDAP',display);
      }
      for (const ns of data.nameservers || []) field('Nameserver', ns.ldhName);
    }
    const details = document.createElement('details');
    details.append(node('summary','Risposta JSON completa'),node('pre',JSON.stringify(data,null,2)));
    results.prepend(list, details);
    el('status').textContent = list.childElementCount ? 'Consultazione completata.' : 'Nessun dato di sintesi disponibile. Consulta la risposta completa.';
  } catch (error) {
    if (active === controller) el('status').textContent = error.name === 'AbortError' ? 'Tempo di attesa scaduto. Puoi aprire il servizio direttamente.' : error instanceof TypeError ? 'Risposta non accessibile dal browser. Apri il servizio direttamente.' : error.message;
  } finally {clearTimeout(timer);}
};

const hashForm = el('hashForm');
let hashVersion = 0;
hashForm.oninput = () => {hashVersion++; el('digest').textContent = '';};
hashForm.onsubmit = async event => {
  event.preventDefault();
  const version = ++hashVersion;
  const file = el('file').files[0], expected = el('expected').value.toLowerCase();
  if (!file) return;
  if (file.size > 128*1024*1024) {el('digest').textContent = 'Il file supera il limite di 128 MiB.';return;}
  el('digest').textContent = 'Calcolo in corso…';
  try {
    const bytes = await crypto.subtle.digest('SHA-256',await file.arrayBuffer());
    const hash = Array.from(new Uint8Array(bytes), b => b.toString(16).padStart(2,'0')).join('');
    if (version === hashVersion) el('digest').textContent = (expected ? (expected === hash ? 'Impronta corrispondente. ' : 'Impronta diversa. ') : '') + hash;
  } catch {if (version === hashVersion) el('digest').textContent = 'Lettura del file non riuscita.';}
};
el('httpsForm').onsubmit=event=>{
  event.preventDefault();
  try {
    const domain=endpoint('domain',el('httpsDomain').value).split('/').pop();
    el('httpsStatus').textContent='';
    window.open('https://'+decodeURIComponent(domain)+'/','_blank','noopener,noreferrer');
  } catch(error){el('httpsStatus').textContent=error.message;}
};
el('headersForm').onsubmit=event=>{
  event.preventDefault();
  const list=el('headerRows');list.replaceChildren();
  for(const line of el('headersInput').value.split(/\r?\n/)){
    const match=/^([a-z0-9!#$%&'*+.^_\x60|~-]+):[ \t]*(.*)$/i.exec(line);
    if(match) list.append(node('dt',match[1]),node('dd',match[2]));
  }
  el('headersStatus').textContent=list.childElementCount?'Intestazioni lette.':'Nessuna intestazione riconosciuta.';
};
