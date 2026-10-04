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

---

## Błąd ustawiania kategorii w `Createbar.tsx`

Problem występował w obsłudze zmiany kategorii:

```tsx
onChange={(e) => setNoteCategory(e.target.value)}
```

To błąd zgodności typów w TypeScript. Wartość `e.target.value` z elementu HTML `<select>` ma typ `string`, czyli może być dowolnym tekstem. Stan kategorii dopuszcza jednak tylko trzy konkretne wartości:

```tsx
type Note_Category = "Personal" | "Work" | "Important";

const [noteCategory, setNoteCategory] = useState<Note_Category>("Personal");
```

`Note_Category` jest unią typów literałowych: każda z wymienionych wartości jest dozwolona, ale na przykład `"Shopping"` już nie. TypeScript nie wywnioskuje typu wartości pola na podstawie zapisanych w JSX elementów `<option>`. Dlatego nie pozwala przekazać dowolnego `string` do `setNoteCategory`.

### Poprawka — sprawdzenie wartości przed zmianą stanu

```tsx
onChange={(e) => {
  const category = e.currentTarget.value;
  if (category === "Personal" || category === "Work" || category === "Important") {
    setNoteCategory(category);
  }
}}
```

1. `e.currentTarget` wskazuje element `<select>`, do którego przypisano tę obsługę zdarzenia. Jego `value` nadal ma typ `string` — sama zamiana `target` na `currentTarget` nie rozwiązuje błędu.
2. Warunek sprawdza, czy odczytana wartość jest jedną z trzech dozwolonych kategorii.
3. Wewnątrz warunku TypeScript zawęża typ zmiennej `category` do `"Personal" | "Work" | "Important"`. Dzięki temu można bezpiecznie przekazać ją do `setNoteCategory`.
4. Jeśli wartość nie pasuje do żadnej kategorii, stan pozostaje bez zmian.

Można też napisać `e.currentTarget.value as Note_Category`, ale takie rzutowanie jedynie zapewnia kompilator, że znamy typ. Nie sprawdza wartości podczas działania aplikacji. Zastosowany warunek wykonuje rzeczywistą kontrolę.

### Zapamiętaj

**Każda wartość `Note_Category` jest tekstem, ale nie każdy tekst jest poprawną kategorią. Przed zapisaniem ogólnego `string` do takiego stanu sprawdź, czy należy do dozwolonych wartości.**

---

## Dlaczego `onCreate` z interfejsu nie jest dostępne w komponencie?

**Interfejs opisuje typ funkcji, ale jej nie tworzy.** Ten zapis:

```tsx
interface CreatebarProps {
  note: Note;
  onCreate: (note: Note) => void;
}
```

oznacza: „propsy mają zawierać funkcję `onCreate`, która przyjmuje notatkę”. Nie deklaruje zmiennej `onCreate` dostępnej w komponencie.

Do połączenia komponentów potrzebne są trzy elementy:

1. **Odebranie funkcji przez propsy.** Zapis `Createbar = () =>` nie przyjmuje żadnych propsów. Użyj:

   ```tsx
   interface CreatebarProps {
     onCreate: (note: Note) => void;
   }

   const Createbar = ({ onCreate }: CreatebarProps) => {
     // istniejące stany i JSX
   };
   ```

   Pole `note` możesz usunąć — dane nowej notatki zbierasz już w stanach formularza.

2. **Wywołanie funkcji z danymi.** `onClick={() => onCreate}` tylko zwraca funkcję, bez jej uruchomienia. Potrzebujesz:

   ```tsx
   onClick={() => onCreate({
     title: noteTitle,
     content: noteContent,
     category: noteCategory,
   })}
   ```

3. **Przekazanie działającej funkcji z `App.tsx`.** Wewnątrz `App` zdefiniuj:

   ```tsx
   const createNote = (note: Note) => {
     setNoteList((notes) => [...notes, note]);
     setVisibleCreatebar(false);
   };
   ```

   Następnie przekaż ją do komponentu:

   ```tsx
   {visibleCreatebar && <Createbar onCreate={createNote} />}
   ```

`App` definiuje działanie, props przekazuje funkcję, a `Createbar` wywołuje ją po kliknięciu.

# Jak działa filtrowanie notatek

Fragment `visibleNotes` w `src/App.tsx` tworzy listę notatek widocznych po zastosowaniu filtra kategorii i wyszukiwania.

```tsx
const visibleNotes = noteList
  .map((note, index) => ({ note, index }))
  .filter(({ note }) => selectedCategory === null || note.category === selectedCategory)
  .filter(({ note }) => {
    return (
      normalizedSearchQuery === "" ||
      note.title.toLowerCase().includes(normalizedSearchQuery) ||
      note.content.toLowerCase().includes(normalizedSearchQuery) ||
      note.category.toLowerCase().includes(normalizedSearchQuery)
    );
  });
```

## Krok po kroku

1. `noteList` to pełna lista notatek przechowywana w stanie aplikacji.
2. `.map((note, index) => ({ note, index }))` zamienia każdą notatkę w obiekt zawierający samą notatkę oraz jej pierwotny indeks na liście. Indeks pozwala później poprawnie otworzyć lub usunąć notatkę, nawet gdy lista jest przefiltrowana.
3. Pierwszy `.filter(...)` obsługuje kategorię:
   - gdy `selectedCategory === null`, żadna kategoria nie jest wybrana i notatki przechodzą dalej;
   - w przeciwnym razie przechodzą tylko notatki, których `note.category` jest równe wybranej kategorii.
4. Drugi `.filter(...)` obsługuje wyszukiwanie:
   - puste `normalizedSearchQuery` oznacza, że wszystkie notatki, które przeszły filtr kategorii, pozostają widoczne;
   - w przeciwnym razie sprawdzane jest, czy zapytanie występuje w tytule, treści lub nazwie kategorii notatki.
5. `toLowerCase()` sprawia, że porównanie nie rozróżnia wielkości liter, a `includes()` sprawdza, czy szukany tekst znajduje się w danym polu.

Filtry są łączone: notatka musi pasować do wybranej kategorii (jeśli ją wybrano) **i** do zapytania wyszukiwania (jeśli nie jest puste).

`normalizedSearchQuery` powstaje wcześniej z wpisanego tekstu przez `trim().toLowerCase()`. `trim()` usuwa zbędne spacje z początku i końca zapytania, a `toLowerCase()` ujednolica wielkość liter.
