import type { Note, Note_Category } from "../types/note_type";

interface SidebarProps {
  notes: Note[];
  selectedCategory: Note_Category | null;
  onSelectCategory: (category: Note_Category | null) => void;
}

const categories: Note_Category[] = ["Personal", "Work", "Important"];

const Sidebar = ({ notes, selectedCategory, onSelectCategory }: SidebarProps) => {
  const items = [
    { label: "All notes", category: null, count: notes.length },
    ...categories.map((category) => ({
      label: category,
      category,
      count: notes.filter((note) => note.category === category).length,
    })),
  ];

  return (
    <aside className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-8">
      <header className="mb-5 border-b border-slate-100 pb-4">
        <h2 className="font-serif text-xl font-semibold text-slate-900">Your notebook</h2>
        <p className="mt-1 text-sm leading-6 text-slate-500">A little space for every thought.</p>
      </header>
      <nav aria-label="Note categories" className="flex flex-col gap-2">
        {items.map(({ label, category, count }) => (
          <button
            key={label}
            type="button"
            onClick={() => onSelectCategory(category)}
            aria-pressed={selectedCategory === category}
            className={`flex w-full items-center justify-between gap-3 rounded-md px-3 py-2.5 text-left text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 ${
              selectedCategory === category
                ? "bg-emerald-50 text-emerald-800"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <span>{label}</span>
            <span className="min-w-7 rounded-full border border-slate-200 bg-white px-2 py-0.5 text-center text-xs">
              {count}
            </span>
          </button>
        ))}
      </nav>
      <p className="mt-5 border-t border-slate-100 pt-4 text-xs leading-5 text-slate-500">
        Keep your ideas, plans, and reminders close at hand.
      </p>
    </aside>
  );
};

export default Sidebar;
