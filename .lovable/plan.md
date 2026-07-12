## Accesso editor da mobile

### Obiettivo
Permettere agli editor di aprire il pannello di autenticazione/creazione articoli da smartphone, dato che la shortcut da tastiera `Ctrl+Shift+E` non è disponibile su mobile.

### Soluzione
Aggiungere un trigger discreto nell'interfaccia esistente:
- Un'icona Editor nell'header, accanto al toggle dark mode, visibile su tutti i viewport.
- Una voce corrispondente nel menu mobile (hamburger).
- Al click:
  - se l'utente non ha una sessione editor: apre il dialog `EditorLoginDialog` già presente in `App.tsx`.
  - se l'utente ha già il ruolo editor: naviga direttamente a `/newsletter/new`.

### File coinvolti
- `src/components/Navbar.tsx` — aggiungere il trigger e la voce di menu mobile.
- `src/contexts/EditorContext.tsx` — nessuna modifica necessaria, si riusa `setShowLoginDialog` dal context.

### Dettagli tecnici
- Usare `useEditor` per leggere `isEditorMode` e aprire il dialog con `setShowLoginDialog`.
- Usare `useNavigate` da `react-router-dom` per reindirizzare a `/newsletter/new` quando già autenticato.
- Icona: `Pencil` o `PencilLine` da `lucide-react`, stile ghost/trasparente come il toggle dark mode.
- Aggiungere `aria-label="Editor"` per accessibilità.
- Inserire il trigger in fonda al gruppo azioni dell'header e in fonda al menu mobile, in modo che sia discreto e non disturbare la navigazione principale.

### Verifica
- Testare il click sul nuovo pulsante in viewport mobile (432x688) e desktop.
- Verificare che il dialog di login appaia per utenti non autenticati.
- Verificare che, dopo l'autenticazione con ruolo editor, la navigazione porti a `/newsletter/new`.
