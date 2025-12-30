"use client";

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import { Bold, Italic, List, ListOrdered, Quote, Link as LinkIcon, Heading2 } from 'lucide-react'

interface RichTextEditorProps {
    content: string
    onChange: (html: string) => void
    editable?: boolean
    placeholder?: string
}

export default function RichTextEditor({ content, onChange, editable = true, placeholder = 'Escribe aquí...' }: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Link.configure({
                openOnClick: false,
            }),
            Placeholder.configure({
                placeholder,
            })
        ],
        content,
        editable,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        },
        editorProps: {
            attributes: {
                class: 'prose prose-invert max-w-none focus:outline-none min-h-[150px] px-4 py-3',
            },
        },
    })

    if (!editor) {
        return null
    }

    if (!editable) {
        return <EditorContent editor={editor} className="text-white/80" />
    }

    return (
        <div className="border border-white/10 rounded-xl bg-white/5 overflow-hidden focus-within:ring-1 focus-within:ring-white/20 transition-all">
            <div className="flex items-center gap-1 p-2 border-b border-white/5 bg-white/[0.02]">
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`p-2 rounded hover:bg-white/10 text-white/60 hover:text-white transition-colors ${editor.isActive('bold') ? 'bg-white/10 text-white' : ''}`}
                    type="button"
                >
                    <Bold className="w-4 h-4" />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`p-2 rounded hover:bg-white/10 text-white/60 hover:text-white transition-colors ${editor.isActive('italic') ? 'bg-white/10 text-white' : ''}`}
                    type="button"
                >
                    <Italic className="w-4 h-4" />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`p-2 rounded hover:bg-white/10 text-white/60 hover:text-white transition-colors ${editor.isActive('heading', { level: 2 }) ? 'bg-white/10 text-white' : ''}`}
                    type="button"
                >
                    <Heading2 className="w-4 h-4" />
                </button>
                <div className="w-px h-4 bg-white/10 mx-1" />
                <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`p-2 rounded hover:bg-white/10 text-white/60 hover:text-white transition-colors ${editor.isActive('bulletList') ? 'bg-white/10 text-white' : ''}`}
                    type="button"
                >
                    <List className="w-4 h-4" />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`p-2 rounded hover:bg-white/10 text-white/60 hover:text-white transition-colors ${editor.isActive('orderedList') ? 'bg-white/10 text-white' : ''}`}
                    type="button"
                >
                    <ListOrdered className="w-4 h-4" />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={`p-2 rounded hover:bg-white/10 text-white/60 hover:text-white transition-colors ${editor.isActive('blockquote') ? 'bg-white/10 text-white' : ''}`}
                    type="button"
                >
                    <Quote className="w-4 h-4" />
                </button>
            </div>
            <EditorContent editor={editor} />
        </div>
    )
}
