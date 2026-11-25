# Revive Web

[Italiano](README.md) · [English](README.en.md)

Applicazione statica bilingue per registri Internet, ricerca username, grafi di dominio e verifica SHA-256.

[Apri Revive Web](https://haziel-ang.github.io/revive-web/) · [Wiki](https://haziel-ang.github.io/revive-web/wiki/) · [LLM index](llms.txt)

## Consultare un dominio o una rete

In OSINT scegli il servizio, inserisci un valore e premi Consulta. Per un dominio inizia da WHOIS/RDAP, poi scegli DNS per leggere A, AAAA, MX, NS, TXT, CNAME, SOA, CAA o PTR. Per approfondire un indirizzo restituito, copialo nella consultazione IP, rete/ASN, geolocalizzazione o DNS inverso. Per un numero AS usa il servizio RDAP dedicato.

RDAP.org inoltra la richiesta al registro competente. Il riepilogo mostra solo i campi pubblicati, e la risposta JSON conserva i dettagli. La geolocalizzazione IP di Country.is è indicativa. Il prefisso e gli ASN provengono da RIPEstat. Un indirizzo condiviso può appartenere a un CDN.

## Certificati TLS e intestazioni HTTP

Scegli Certificati pubblicati per leggere le emissioni disponibili su Cert Spotter. Il link a crt.sh apre lo storico. Le emissioni archiviate e il certificato presentato oggi dal server sono evidenze diverse.

Per verificare il certificato in uso, apri il sito HTTPS e consulta il certificato dalle informazioni sulla connessione del browser. Per le intestazioni apri gli strumenti sviluppatore, scheda Rete, ricarica la pagina e seleziona la richiesta del documento. Leggi le intestazioni della risposta e lo stato HTTP. Nella sezione HTTPS puoi aprire il dominio e incollare le intestazioni per organizzarle localmente. Revive desktop offre anche l’ispezione TLS diretta e la richiesta HEAD senza redirect.

## Ricerca username

Scegli GitHub, GitLab o entrambe le piattaforme. Avvia la ricerca e apri il collegamento al profilo restituito. Un limite del servizio produce un esito di indisponibilità. Uno username uguale, anche su più siti, non identifica una persona.

Visualizza nel grafo trasferisce i possibili profili al diagramma. Per ricerche estese con Sherlock o Maigret usa Revive desktop. Il grafo web legge gli snapshot Maigret prodotti da Revive. I report HTML e i JSON grezzi del motore hanno formati diversi.

## Grafo, cronologia e confronto

Inserisci un dominio in Grafo. Revive consulta A, AAAA, NS, MX e il registrar. Mostra le fonti indisponibili accanto al conteggio dei risultati. Il diagramma si può scorrere e l’elenco sottostante riporta ogni relazione in testo.

Salva nel browser per conservare un caso in questo profilo. Esporta JSON per trasferirlo. Importa snapshot apre il file sul dispositivo e richiede un salvataggio esplicito per aggiungerlo alla cronologia. Dopo aver salvato almeno due casi, Correla i casi salvati unisce nodi con lo stesso ID e indica le risorse condivise. Elimina caso salvato richiede conferma.

## Verifica dei file

Seleziona un file fino a 128 MiB, inserisci facoltativamente i 64 caratteri esadecimali attesi e calcola SHA-256. Il confronto avviene nel browser. Ottieni l’impronta attesa da una fonte attendibile.

## Riferimento per sviluppatori e LLM

Lo schema JSON 1 ha target e createdAt, nodes con id, kind e label e links con from, to e relation. Ogni estremo deve identificare un nodo. Il visualizzatore accetta snapshot di dominio e username fino a 2 MB, 1200 nodi e 2400 relazioni. Gli ID sono le chiavi di correlazione. Mantieni gli identificatori quando trasferisci un caso.

Il sito interroga servizi pubblici solo dopo un’azione dell’utente. Gli snapshot importati e i file da verificare restano locali. CORS, rate limit e indisponibilità possono impedire una risposta. L’interfaccia offre italiano e inglese e ricorda lingua e tema nel browser. I dati e il JSON delle fonti conservano la lingua originale.

## Sviluppo e pubblicazione

Servi la radice con `python -m http.server 8000` e apri `http://localhost:8000`. GitHub Pages pubblica dalla radice del ramo `main`. Ogni modifica visibile deve includere testi e verifica funzionale in italiano e inglese.
