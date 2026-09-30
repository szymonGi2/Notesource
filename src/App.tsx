import { useState } from "react";
import NoteGrid from "./components/NoteGrid";
import type { Note } from "./types/note_type";
import NoteView from "./components/NoteView";
import Createbar from "./components/Createbar";

const INITIAL_NOTES: Note[] = [
  {
    title: "Plan the week",
    content:
      "Review priorities, block time for focused work, and leave room for a proper lunch break.",
    category: "Work",
  },
  {
    title: "Ideas for the garden",
    content:
      "Try herbs by the kitchen window and look for hardy flowers that can handle afternoon sun.",
    category: "Personal",
  },
  {
    title: "Renew passport",
    content:
      "Check the expiration date and gather the photo and paperwork before booking an appointment.",
    category: "Important",
  },
];

const App = () => {
  const [noteList, setNoteList] = useState<Note[]>(INITIAL_NOTES);
  const [selectedNoteIndex, setSelectedNoteIndex] = useState<number | null>(null);
  const [visibleCreatebar, setVisibleCreatebar] = useState<boolean>(false);

  const saveNote = (updatedNote: Note) => {
    if (selectedNoteIndex === null) return;

    setNoteList((notes) =>
      notes.map((note, index) =>
        index === selectedNoteIndex ? updatedNote : note,
      ),
    );
    setSelectedNoteIndex(null);
  };

  const createNote = (note : Note) => {
    //notes in setNoteList means copying the previous state of the list, then adding the note as the object passed via onCreate
    setNoteList((notes) => [...notes, note]);
    setVisibleCreatebar(false);
  }

  const deleteNote = (noteIndex: number) => {
    setNoteList((notes) => notes.filter((_, index) => index !== noteIndex));
  };

  return (
    <main className="min-h-screen bg-slate-100">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-8">
          <h1 className="font-serif text-2xl font-semibold text-slate-900">
            Notesource
          </h1>
          <button
            type="button"
            onClick={() => setVisibleCreatebar((visible) => !visible)}
            aria-expanded={visibleCreatebar}
            aria-controls="create-note-panel"
            className="rounded-md bg-emerald-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
          >
            {visibleCreatebar ? "Close" : "Add Note"}
          </button>
        </div>
      </header>
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        {visibleCreatebar && <Createbar onCreate={createNote} />}
        {selectedNoteIndex === null ? (
          <NoteGrid list={noteList} onSelect={setSelectedNoteIndex} onDelete={deleteNote} />
        ) : (
          <NoteView
            note={noteList[selectedNoteIndex]}
            onSave={saveNote}
            onBack={() => setSelectedNoteIndex(null)}
          />
        )}
      </section>
    </main>
  );
};

export default App;
