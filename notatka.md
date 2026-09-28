# Jak działają `onSelect`, `onSave` i `onBack`?

> **Najważniejsza myśl:** interfejs TypeScript opisuje, jaką funkcję komponent ma otrzymać. Nie zawiera jej działania. Działanie definiuje `App`, a komponent wywołuje przekazany callback, gdy użytkownik wykona odpowiednią akcję.

---

## Co oznacza `=> void`?

```ts
(index: number) => void
```

To **opis typu funkcji**:

- przyjmuje argument `index` typu `number`;
- zwraca `void`, czyli nie zwraca wyniku, z którego korzysta kod.

`void` **nie oznacza**, że funkcja nic nie robi. Może na przykład zmienić stan aplikacji. Ten zapis mówi tylko, że nie oczekujemy od niej wartości zwrotnej.

---

## `onSelect` — wybiera notatkę

W `NoteGrid` callback ma typ:

```ts
onSelect: (index: number) => void;
```

Kafelek wywołuje go przy kliknięciu:

```tsx
onClick={() => onSelect(index)}
```

`App` przekazuje jako `onSelect` funkcję Reacta `setSelectedNoteIndex`:

```tsx
<NoteGrid list={noteList} onSelect={setSelectedNoteIndex} />
```

### Co dzieje się po kliknięciu?

1. `NoteGrid` przekazuje do `onSelect` indeks klikniętej notatki.
2. `setSelectedNoteIndex(index)` zapisuje ten indeks w stanie Reacta.
3. `App` widzi, że jakaś notatka jest wybrana, i pokazuje edytor.

Indeksy zaczynają się od zera: pierwsza notatka ma indeks `0`, druga `1` itd.

---

## `onSave` — zapisuje zmienioną notatkę

W `NoteView` callback ma typ:

```ts
onSave: (note: Note) => void;
```

Przy kliknięciu „Save note” edytor przekazuje do niego notatkę z aktualnym tytułem i treścią:

```tsx
onSave({ ...note, title, content })
```

`...note` kopiuje istniejącą notatkę. Nowe `title` i `content` zastępują poprzednie wartości, a pozostałe pola, takie jak `category`, pozostają zachowane.

`App` przekazuje edytorowi funkcję `saveNote`:

```tsx
<NoteView note={noteList[selectedNoteIndex]} onSave={saveNote} />
```

`saveNote` podmienia wybraną notatkę w `noteList`, a potem ustawia wybrany indeks na `null`. Dzięki temu po zapisie wracamy do siatki z uaktualnioną notatką.

---

## `onBack` — wraca bez zapisywania

W `NoteView` callback ma typ:

```ts
onBack: () => void;
```

Nie przyjmuje argumentów i nie zwraca wyniku. `App` przekazuje mu funkcję:

```tsx
onBack={() => setSelectedNoteIndex(null)}
```

Przycisk „Back to notes” wywołuje `onBack`. Wyzerowanie indeksu powoduje powrót do siatki. Ponieważ `onBack` nie wywołuje `saveNote`, niezapisane zmiany są odrzucane.

---

## Przepływ w skrócie

```text
Kliknięcie notatki
    ↓
onSelect(index)
    ↓
App otwiera NoteView
    ├── „Save note” → onSave(zmienionaNotatka) → aktualizacja listy → powrót
    └── „Back to notes” → onBack() → powrót bez zapisu
```

### Zapamiętaj

**Interfejs określa kształt callbacku. `App` przekazuje jego działanie. Komponent wywołuje callback w reakcji na kliknięcie.**
