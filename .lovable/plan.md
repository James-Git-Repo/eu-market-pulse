# Impaginazione corpo articolo: no capolettera + liste allineate

## Cosa cambia

1. **Nessuna lettera capitale iniziale (drop cap)**
   Il primo paragrafo degli articoli (tipicamente l'Executive Summary) oggi ha una grande lettera iniziale arancione. Viene rimossa: il testo parte come tutti gli altri paragrafi, con dimensione e colore uniformi.

2. **Bullet point allineati al testo**
   Le liste puntate/numerate oggi rientrano di 2.5rem, molto più del margine del testo. Il rientro viene ridotto a ~1.1rem con marker allineati al bordo sinistro della colonna di lettura, così i punti iniziano visivamente in linea con il testo del paragrafo.
   Ridotto anche il padding tra marker e testo della voce, e mantenuta una spaziatura verticale pulita tra le voci.

## Note tecniche

- `src/index.css`: rimozione della regola `.article-prose > p:first-of-type::first-letter`.
- `src/index.css`: aggiunta di regole `.article-prose ul/ol/li` con specificità sufficiente a battere le regole `!important` in `src/styles/editor.css` (`padding-left: 2.5rem !important`), oppure riduzione diretta dei valori in `editor.css` per `.prose ul/ol` da `2.5rem` a `1.1rem` con `list-style-position: outside`.
- Nessuna modifica ai dati, all'editor o alla logica: solo CSS di presentazione.
