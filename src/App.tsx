import { useState } from "react";
import NoteGrid from "./components/NoteGrid";
import type { Note } from "./types/note_type";
// import NoteView from "./components/NoteView"

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

  return (
    <main className="min-h-screen bg-slate-100">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6 lg:px-8">
          <h1 className="font-serif text-2xl font-semibold text-slate-900">
            Notesource
          </h1>
        </div>
      </header>
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <NoteGrid list={noteList} />
      </section>
      {/* <NoteView/> */}
    </main>
  );
};

export default App;
