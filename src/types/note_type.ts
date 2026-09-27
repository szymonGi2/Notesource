export type Note_Category = "Personal" | "Work" | "Important"

export interface Note{
    title: string
    content: string
    category: Note_Category
}