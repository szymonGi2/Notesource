import type { Note } from "../types/note_type";

interface NoteListProps {
  list: Note[];
}

const NoteGrid = ({ list }: NoteListProps) => {
  return (
    <div className="grid justify-center gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((note, index) => (
        <article
          key={`${note.title}-${index}`}
          className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
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
        </article>
      ))}
    </div>
  );
};

export default NoteGrid;
