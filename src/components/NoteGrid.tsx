import type { Note } from "../types/note_type";

interface NoteListProps {
  list: Note[];
  onSelect: (index: number) => void;
}

const NoteGrid = ({ list, onSelect }: NoteListProps) => {
  return (
    <div className="grid justify-center gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((note, index) => (
        <button
          key={`${note.title}-${index}`}
          type="button"
          onClick={() => onSelect(index)}
          className="rounded-lg border border-slate-200 bg-white p-5 text-left shadow-sm transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
        >
          <div className="mb-3 flex items-start justify-between gap-3">
            <h2 className="text-lg font-semibold text-slate-900">
              {note.title}
            </h2>
            <span className="shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-800">
              {note.category}
            </span>
          </div>
          <p className="text-sm leading-6 text-slate-600">{note.content}</p>
        </button>
      ))}
    </div>
  );
};

export default NoteGrid;
