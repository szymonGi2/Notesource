import { useState } from "react";
import type { Note } from "../types/note_type";
import type { Note_Category } from "../types/note_type";

interface CreatebarProps{
  onCreate: (note: Note) => void
}

const Createbar = ({onCreate} : CreatebarProps) => {
  const [noteTitle, setNoteTitle] = useState<string>("");
  const [noteCategory, setNoteCategory] = useState<Note_Category>("Personal");
  const [noteContent, setNoteContent] = useState<string>("");

  return (
    <section
      id="create-note-panel"
      aria-labelledby="create-note-heading"
      className="mb-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8"
    >
      <header className="mb-6 border-b border-slate-100 pb-5">
        <h2
          id="create-note-heading"
          className="font-serif text-2xl font-semibold text-slate-900"
        >
          Create a note
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          A place for your ideas, plans, and reminders.
        </p>
      </header>

      <div className="grid gap-5 sm:grid-cols-[minmax(0,1fr)_12rem]">
        <div>
          <label htmlFor="new-note-title" className="mb-2 block text-sm font-medium text-slate-700">
            Title
          </label>
          <input
            id="new-note-title"
            onChange={(e) => setNoteTitle(e.target.value)}
            type="text"
            placeholder="Enter a title..."
            className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-700 focus:outline-2 focus:outline-emerald-700"
          />
        </div>
        <div>
          <label htmlFor="new-note-category" className="mb-2 block text-sm font-medium text-slate-700">
            Category
          </label>
          <select
            id="new-note-category"
            value={noteCategory}
            onChange={(e) => {
              const category = e.currentTarget.value;
              if (category === "Personal" || category === "Work" || category === "Important") {
                setNoteCategory(category);
              }
            }}
            className="w-full rounded-md border border-emerald-100 bg-emerald-50 px-3 py-2.5 text-sm font-medium text-emerald-800 focus:border-emerald-700 focus:outline-2 focus:outline-emerald-700"
          >
            <option>Personal</option>
            <option>Work</option>
            <option>Important</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="new-note-content" className="mb-2 block text-sm font-medium text-slate-700">
            Content
          </label>
          <textarea
            id="new-note-content"
            onChange={(e) => setNoteContent(e.target.value)}
            rows={5}
            placeholder="Start writing..."
            className="block min-h-36 w-full resize-y rounded-md border border-slate-200 bg-slate-50 px-3 py-3 text-sm leading-6 text-slate-700 placeholder:text-slate-400 focus:border-emerald-700 focus:outline-2 focus:outline-emerald-700"
          />
        </div>
      </div>

      <footer className="mt-6 flex justify-end border-t border-slate-100 pt-5">
        <button
          type="button"
          onClick={() => onCreate({title: noteTitle, category: noteCategory, content: noteContent})}
          className="w-full rounded-md bg-emerald-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 sm:w-auto"
        >
          Create note
        </button>
      </footer>
    </section>
  );
};

export default Createbar;
