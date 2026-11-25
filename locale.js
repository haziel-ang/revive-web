'use strict';
const phrases = new Map(`Geolocalizzazione IP|IP geolocation
Consulta invia l’indirizzo a Country.is.|Lookup sends the address to Country.is.
Geolocalizzazione non disponibile.|Geolocation unavailable.
Paese|Country
Regione|Region
Città indicativa|Approximate city
Stato|Status
Consulta lo storico su crt.sh|Open certificate history on crt.sh
Verifica TLS e intestazioni HTTP|Inspect TLS and HTTP headers
Certificati e HTTP|Certificates and HTTP
Controlla la connessione HTTPS nel browser e leggi le intestazioni di risposta.|Inspect the HTTPS connection in your browser and read response headers.
Certificato in uso|Current certificate
Apri sito HTTPS|Open HTTPS site
Nella nuova scheda apri le informazioni sulla connessione accanto all’indirizzo e visualizza il certificato. Per le emissioni archiviate usa la ricerca CT in OSINT.|In the new tab, open the connection information beside the address and view the certificate. For archived issuances, use the OSINT CT lookup.
Intestazioni della risposta|Response headers
Incolla le intestazioni HTTP|Paste HTTP headers
In Strumenti sviluppatore → Rete seleziona la richiesta del documento e copia le intestazioni della risposta. L’analisi avviene sul dispositivo.|In Developer Tools → Network select the document request and copy the response headers. Analysis stays on the device.
Leggi intestazioni|Read headers
Nessuna intestazione riconosciuta.|No headers recognized.
Intestazioni lette.|Headers parsed.
Vai allo strumento|Skip to tool
Revive Web, pagina OSINT|Revive Web, OSINT page
Tema dell’interfaccia|Interface theme
Tema chiaro|Light theme
Tema scuro|Dark theme
Strumenti|Tools
Grafo|Graph
Integrità file|File integrity
Registri Internet|Internet registries
Consulta registri di domini, DNS, reti e certificati pubblici.|Consult public domain, DNS, network and certificate records.
Consultazione|Lookup
Servizio|Service
WHOIS dominio · RDAP|Domain WHOIS · RDAP
Registrazione IP · RDAP|IP registration · RDAP
Sistema autonomo · RDAP|Autonomous system · RDAP
Record DNS|DNS records
DNS inverso · indirizzo IP|Reverse DNS · IP address
Rete e ASN · indirizzo IP|Network and ASN · IP address
Certificati pubblicati · CT|Published certificates · CT
Tipo di record|Record type
Dominio|Domain
Nome DNS|DNS name
Indirizzo IP|IP address
Indirizzo IPv4 o IPv6|IPv4 or IPv6 address
Numero AS|AS number
Consulta|Look up
Risposta del servizio|Service response
In attesa di una consultazione.|Waiting for a lookup.
Ricerca username|Username search
Verifica un nome utente negli indici pubblici. Lo stesso username può appartenere a persone diverse.|Check a username against public indexes. Different people may use the same handle.
Cerca profili|Find profiles
Nome utente|Username
Piattaforma|Platform
GitHub e GitLab|GitHub and GitLab
Cerca username|Search username
La ricerca invia il nome alle piattaforme selezionate. Puoi anche importare nel grafo i casi prodotti da Maigret desktop.|Search sends the username to the selected platforms. You can also import cases created by desktop Maigret into the graph.
Profili pubblici|Public profiles
In attesa di uno username.|Waiting for a username.
Visualizza nel grafo|View in graph
Grafo delle relazioni|Relationship graph
Collega un dominio ai record DNS e al registrar, oppure apri un caso salvato da Revive desktop.|Connect a domain to its DNS records and registrar, or open a case saved by Revive desktop.
Analisi del dominio|Domain analysis
Crea grafo|Build graph
Consulta Google Public DNS per A, AAAA, NS e MX e RDAP.org per il registrar. Il salvataggio del caso è facoltativo.|Queries Google Public DNS for A, AAAA, NS and MX records and RDAP.org for the registrar. Saving the case is optional.
Casi locali|Local cases
Importa snapshot Revive (.json)|Import Revive snapshot (.json)
Cronologia|History
Scegli un caso salvato|Choose a saved case
Correla i casi salvati|Correlate saved cases
Relazioni|Relationships
Crea un grafo o importa uno snapshot.|Build a graph or import a snapshot.
Diagramma delle relazioni|Relationship diagram
Elenco delle relazioni|Relationship list
Salva nel browser|Save in browser
Esporta JSON|Export JSON
Elimina caso salvato|Delete saved case
Calcola l’impronta SHA-256 e confrontala con quella pubblicata dalla fonte. Il file resta sul dispositivo.|Calculate the SHA-256 digest and compare it with the source. The file stays on your device.
Verifica un file|Verify a file
File da verificare|File to verify
Dimensione massima 128 MiB|Maximum size 128 MiB
SHA-256 atteso|Expected SHA-256
(facoltativo)|(optional)
Calcola impronta|Calculate digest
Impronta SHA-256|SHA-256 digest
In attesa di un file da verificare.|Waiting for a file.
64 caratteri esadecimali|64 hexadecimal characters
Codice su GitHub|Source on GitHub
esempio.it|example.org
Consulta invia il dominio a Cert Spotter.|Lookup sends the domain to Cert Spotter.
Consulta invia l’indirizzo a RIPEstat.|Lookup sends the address to RIPEstat.
Consulta invia il nome inverso a Google Public DNS.|Lookup sends the reverse name to Google Public DNS.
Consulta invia il nome a Google Public DNS.|Lookup sends the name to Google Public DNS.
Consulta invia il valore a RDAP.org e al registro competente.|Lookup sends the value to RDAP.org and the responsible registry.
Inserisci un singolo indirizzo IPv4 o IPv6 valido.|Enter one valid IPv4 or IPv6 address.
Inserisci un numero AS tra 0 e 4294967295.|Enter an AS number between 0 and 4294967295.
Inserisci un nome di dominio, per esempio example.org.|Enter a domain name, for example example.org.
Verifica il nome di dominio inserito.|Check the domain name.
Apri la risposta del servizio|Open service response
Consultazione in corso…|Lookup in progress…
Il registro non contiene questa risorsa.|No record for this resource.
RIPEstat non ha restituito i dati di rete.|RIPEstat did not return network data.
Prefisso|Prefix
Sistemi autonomi|Autonomous systems
Risposta CT inattesa.|Unexpected CT response.
Il nome DNS non esiste (NXDOMAIN).|The DNS name does not exist (NXDOMAIN).
Nome|Name
Identificativo|Identifier
Paese del registro|Registry country
Inizio intervallo|Range start
Fine intervallo|Range end
Risposta JSON completa|Full JSON response
Consultazione completata.|Lookup complete.
Nessun dato di sintesi disponibile. Consulta la risposta completa.|No summary fields available. Open the full response.
Tempo di attesa scaduto. Puoi aprire il servizio direttamente.|Request timed out. You can open the service directly.
Risposta non accessibile dal browser. Apri il servizio direttamente.|The browser could not access the response. Open the service directly.
Il file supera il limite di 128 MiB.|The file exceeds 128 MiB.
Calcolo in corso…|Calculating…
Lettura del file non riuscita.|Could not read the file.
Nome utente non valido.|Invalid username.
Ricerca in corso…|Searching…
Nessuna corrispondenza|No match
Possibile profilo|Possible profile
Servizio non disponibile|Service unavailable
Apri profilo|Open profile
Ricerca completata.|Search complete.
Formato o dimensione dello snapshot non supportati.|Unsupported snapshot format or size.
Nodo non valido o duplicato.|Invalid or duplicate node.
Relazione non valida.|Invalid relationship.
Cronologia non disponibile in questo browser.|History is unavailable in this browser.
Caso non disponibile.|Case unavailable.
Limite per snapshot: 2 MB.|Snapshot limit: 2 MB.
Importato dal dispositivo.|Imported from device.
Salvato in questo browser.|Saved in this browser.
Salvataggio non riuscito. Puoi esportare il JSON.|Save failed. You can export the JSON.
Eliminare questo caso dalla cronologia del browser?|Delete this case from browser history?
Rimosso dalla cronologia.|Removed from history.
Eliminazione non riuscita.|Deletion failed.
Salva almeno due casi per confrontarli.|Save at least two cases to compare.
Confronto dei casi|Case comparison
Consultazione dei registri in corso…|Querying registries…
nessuna|none`.split('\n').map(line=>line.split('|')));
let language='it';
try { language=localStorage.getItem('revive.language') || (navigator.language.startsWith('it')?'it':'en'); } catch {}
if(language!=='en') language='it';
document.documentElement.lang=language;
function translate(text){
  if(language==='it') return text;
  if(phrases.has(text)) return phrases.get(text);
  const summary=text.match(/^(\d+) nodi · (\d+) relazioni\.\s*(.*)$/);
  if(summary) return summary[1]+' nodes · '+summary[2]+' relationships. '+translate(summary[3]);
  const starts=[
    ['Fonti non disponibili: ','Unavailable sources: '],['Risorse condivise: ','Shared resources: '],
    ['Importazione fallita. ','Import failed. '],['Il servizio ha risposto con HTTP ','The service returned HTTP '],
    ['Errore del resolver DNS, codice ','DNS resolver error, code '],['Scadenza ','Expires '],
    ['Impronta corrispondente. ','Digest matches. '],['Impronta diversa. ','Digest differs. ']
  ];
  for(const [it,en] of starts) if(text.startsWith(it)) return en+translate(text.slice(it.length));
  return text==='nessuna.'?'none.':text;
}
document.addEventListener('DOMContentLoaded',()=>{
  const originals=new WeakMap(), attributes=new WeakMap();
  const ignore='script,style,pre,svg,#headerRows,#edges,#history option:not([value=""]),#results dd';
  function localize(root){
    if(root.nodeType===Node.ELEMENT_NODE){
      if(root.matches(ignore)) return;
      for(const attr of ['aria-label','placeholder','title']){
        if(!root.hasAttribute(attr)) continue;
        const stored=attributes.get(root)||{}, current=root.getAttribute(attr);
        const original=stored[attr]?.output===current?stored[attr].original:current;
        const output=translate(original);
        stored[attr]={original,output};attributes.set(root,stored);
        if(output!==current) root.setAttribute(attr,output);
      }
      root.childNodes.forEach(localize);
    }else if(root.nodeType===Node.TEXT_NODE && !root.parentElement?.closest(ignore)){
      const current=root.data, memory=originals.get(root), original=memory?.output===current?memory.original:current;
      const output=original.replace(/\S(?:[\s\S]*\S)?/,part=>translate(part));
      originals.set(root,{original,output});if(current!==output) root.data=output;
    }
  }
  function update(){
    document.documentElement.lang=language; document.getElementById('language').value=language;
    document.getElementById('wikiLink').href='wiki/'+(language==='en'?'en.html':'');
    localize(document.body);
  }
  update();
  new MutationObserver(changes=>{for(const change of changes){
    if(change.type==='childList') change.addedNodes.forEach(localize);
    else localize(change.target);
  }}).observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['placeholder','aria-label','title']});
  document.getElementById('language').onchange=event=>{
    language=event.target.value;try{localStorage.setItem('revive.language',language);}catch{}update();
  };
});