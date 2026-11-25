# Architettura / Architecture

## Flusso dei dati / Data flow

| Componente / Component | Ingresso → uscita / Input → output | Fonte / Source |
|---|---|---|
| OSINT | Dominio, IP o ASN → registro selezionato → riepilogo e JSON / Domain, IP or ASN → selected registry → summary and JSON | [app.js](../app.js) |
| Username | Nome → API selezionate → possibili profili / Handle → selected APIs → possible profiles | [profiles.js](../profiles.js) |
| Grafo / Graph | DNS e RDAP oppure snapshot locale → nodi e archi / DNS and RDAP or local snapshot → nodes and edges | [cases.js](../cases.js) |
| HTTPS | Dominio → nuova scheda. Intestazioni incollate → elenco locale / Domain → new tab. Pasted headers → local list | [app.js](../app.js) |
| Integrità / Integrity | File → Web Crypto → SHA-256 / File → Web Crypto → SHA-256 | [app.js](../app.js) |
| Preferenze / Preferences | Lingua e tema → memoria del browser / Language and theme → browser storage | [locale.js](../locale.js), [theme.js](../theme.js) |

## Esempio minimo di caso / Minimal case example

```json
{
  "schema": 1,
  "target": "example.org",
  "createdAt": "2026-11-25T12:00:00Z",
  "nodes": [
    {"id":"domain:example.org","kind":"domain","label":"example.org"},
    {"id":"ip:192.0.2.42","kind":"ip","label":"192.0.2.42"}
  ],
  "links": [
    {"from":"domain:example.org","to":"ip:192.0.2.42","relation":"A"}
  ]
}
```

Fixture sintetica. Gli ID devono essere unici. Un collegamento fa riferimento a due ID presenti nello stesso file. Le relazioni condivise si confrontano per origine, destinazione e relazione.

Synthetic fixture. IDs must be unique. An edge references two IDs in the same file. Shared edges are compared by source, destination and relationship.

## Come aggiornare la wiki / Maintaining the wiki

1. Verifica il comportamento nel modulo sorgente. / Verify behavior against the source module.
2. Per ogni servizio descrivi dati inviati, azione di avvio, fonte, limiti ed esiti parziali. / For each service describe inputs sent, trigger, source, limits and partial results.
3. Aggiorna entrambe le guide e i README. Mantieni aggiornato l’indice [llms.txt](../llms.txt). / Update both guides and READMEs. Keep the LLM index current.
4. Verifica le due lingue, i link profondi, le preferenze salvate e l’importazione di un caso precedente. / Test both languages, deep links, saved preferences and an older case import.
