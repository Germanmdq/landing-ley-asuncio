'use server'

import { createClient } from '@/utils/supabase/server'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'

const threadSchema = z.object({
    title: z.string().min(5, 'El título debe tener al menos 5 caracteres').max(100),
    content: z.string().min(10, 'El contenido debe tener al menos 10 caracteres'), // This will be HTML string
    categoryId: z.string().uuid()
})

const replySchema = z.object({
    content: z.string().min(2, 'La respuesta es muy corta'),
    threadId: z.string().uuid()
})

export async function createThread(prevState: any, formData: FormData) {
    const supabase = createClient()

    // Check Auth
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
        return { message: 'Debes iniciar sesión para publicar.' }
    }

    // Check Tier (Example check, assumes tier is in metadata or a separate table)
    // For now, we trust the database RLS policies, but we should verify here too if complex logic needed.
    // metadata check:
    const tier = user.user_metadata?.tier || 'bronce'
    if (tier === 'bronce') {
        return { message: 'Debes ser miembro Plata u Oro para publicar.' }
    }

    const rawData = {
        title: formData.get('title'),
        content: formData.get('content'),
        categoryId: formData.get('categoryId')
    }

    const validated = threadSchema.safeParse(rawData)

    if (!validated.success) {
        return { message: validated.error.errors[0].message }
    }

    const { error } = await supabase.from('forum_threads').insert({
        title: validated.data.title,
        body_text: validated.data.content, // Storing HTML in body_text for simplicity or use body_json if full JSON
        category_id: validated.data.categoryId,
        author_id: user.id
    })

    if (error) {
        console.error('Error createThread:', error)
        return { message: 'Error al crear el tema. Intenta nuevamente.' }
    }

    revalidatePath('/comunidad')
    return { success: true, message: 'Tema creado exitosamente.' }
}

export async function replyToThread(prevState: any, formData: FormData) {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return { message: 'Unauthorized' }

    const validated = replySchema.safeParse({
        content: formData.get('content'),
        threadId: formData.get('threadId')
    })

    if (!validated.success) {
        return { message: validated.error.errors[0].message }
    }

    const { error } = await supabase.from('forum_replies').insert({
        body_text: validated.data.content,
        thread_id: validated.data.threadId,
        author_id: user.id
    })

    if (error) {
        return { message: 'Error al responder.' }
    }

    revalidatePath(`/comunidad/thread/${validated.data.threadId}`)
    return { success: true }
}
