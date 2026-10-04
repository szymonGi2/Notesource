interface SearchbarProps {
  value: string;
  onSearch: (query: string) => void;
}

const Searchbar = ({ value, onSearch }: SearchbarProps) => {
  return (
    <div className="relative mb-6">
      <label htmlFor="note-search" className="sr-only">
        Search notes
      </label>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
      >
        <circle cx="11" cy="11" r="7" />
        <path strokeLinecap="round" d="m16 16 4 4" />
      </svg>
      <input
        id="note-search"
        type="search"
        value={value}
        onChange={(event) => onSearch(event.currentTarget.value)}
        placeholder="Search your notes..."
        className="w-full rounded-lg border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-emerald-700 focus:outline-2 focus:outline-emerald-700"
      />
    </div>
  );
};

export default Searchbar