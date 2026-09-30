import type { Note } from "../types/note_type";

interface NoteListProps {
  list: Note[];
  onSelect: (index: number) => void;
  onDelete: (index: number) => void;
}

const NoteGrid = ({ list, onSelect, onDelete }: NoteListProps) => {
  if (list.length === 0) {
    return (
      <div role="status" className="rounded-lg border border-slate-200 bg-white px-5 py-12 text-center shadow-sm">
        <h2 className="font-serif text-2xl font-semibold text-slate-900">
          No notes yet
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Click “Add Note” to create your first note.
        </p>
      </div>
    );
  }

  return (
    <div className="grid justify-center gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((note, index) => (
        <article
          key={`${note.title}-${index}`}
          className="flex flex-col rounded-lg border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
        >
          <button
            type="button"
            onClick={() => onSelect(index)}
            className="flex-1 rounded-lg p-5 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
          >
          <span className="mb-3 flex items-start justify-between gap-3">
            <span className="text-lg font-semibold text-slate-900">
              {note.title}
            </span>
            <span className="shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-800">
              {note.category}
            </span>
          </span>
          <span className="block text-sm leading-6 text-slate-600">{note.content}</span>
          </button>
          <footer className="mx-5 flex justify-end border-t border-slate-100 py-3">
            <button
              type="button"
              onClick={() => onDelete(index)}
              aria-label={`Delete note: ${note.title}`}
              className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v5m4-5v5" />
              </svg>
              Delete
            </button>
          </footer>
        </article>
      ))}
    </div>
  );
};

export default NoteGrid;
