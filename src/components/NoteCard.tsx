const NoteCard = () => {
    return (
        <div className="flex justify-center items-center flex-col w-full h-full">
            <h1 className="text-5xl mb-2.5">Note Title</h1>
            <textarea className="resize-none border w-[60%] h-3/4"></textarea>           
        </div>
    )
}

export default NoteCard