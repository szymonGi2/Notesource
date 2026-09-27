const NoteView = () => {
    return (
        <main className="flex min-h-screen justify-center bg-slate-100 px-4 py-8 sm:px-6 sm:py-12">
            <section className="flex min-h-[75vh] w-full max-w-4xl flex-col rounded-xl border border-slate-200 bg-white px-6 py-6 shadow-sm sm:px-12 sm:py-10">
                <header className="mb-10 flex items-center justify-between border-b border-slate-100 pb-4">
                    <span className="text-sm font-semibold tracking-wide text-slate-500">NOTESOURCE</span>
                    <button className="rounded-md bg-emerald-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700">
                        Save note
                    </button>
                </header>
                <input
                    type="text"
                    placeholder="Enter a title..."
                    aria-label="Note title"
                    className="mb-6 w-full border-0 bg-transparent font-serif text-3xl text-slate-900 outline-none placeholder:text-slate-300 sm:text-4xl"
                />
                <textarea
                    placeholder="Start writing..."
                    aria-label="Note content"
                    className="min-h-[45vh] w-full flex-1 resize-none border-0 bg-transparent text-base leading-7 text-slate-700 outline-none placeholder:text-slate-400"
                />
            </section>
        </main>
    )
}

export default NoteView