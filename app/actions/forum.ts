'use server'

import { createClient } from '@/utils/supabase/server'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'

const threadSchema = z.object({
    title: z.string().min(5, 'El título debe tener al menos 5 caracteres').max(100),
    content: z.string().min(10, 'El contenido debe tener al menos 10 caracteres'), // This will be HTML string
    categoryId: z.string().uuid(),
    images: z.array(z.string().url()).optional()
})

const replySchema = z.object({
    content: z.string().min(2, 'La respuesta es muy corta'),
    threadId: z.string().uuid(),
    images: z.array(z.string().url()).optional()
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

    const imagesStr = formData.get('images') as string
    let images: string[] = []
    try {
        images = imagesStr ? JSON.parse(imagesStr) : []
    } catch (e) {
        images = []
    }

    const rawData = {
        title: formData.get('title'),
        content: formData.get('content'),
        categoryId: formData.get('categoryId'),
        images
    }

    const validated = threadSchema.safeParse(rawData)

    if (!validated.success) {
        return { message: validated.error.issues[0].message }
    }

    const { error } = await supabase.from('forum_threads').insert({
        title: validated.data.title,
        body_text: validated.data.content, // Storing HTML in body_text for simplicity or use body_json if full JSON
        category_id: validated.data.categoryId,
        author_id: user.id,
        images: validated.data.images || []
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

    const imagesStr = formData.get('images') as string
    let images: string[] = []
    try {
        images = imagesStr ? JSON.parse(imagesStr) : []
    } catch (e) {
        images = []
    }

    const validated = replySchema.safeParse({
        content: formData.get('content'),
        threadId: formData.get('threadId'),
        images
    })

    if (!validated.success) {
        return { message: validated.error.issues[0].message }
    }

    const { error } = await supabase.from('forum_replies').insert({
        body_text: validated.data.content,
        thread_id: validated.data.threadId,
        author_id: user.id,
        images: validated.data.images || []
    })

    if (error) {
        return { message: 'Error al responder.' }
    }

    revalidatePath(`/comunidad/thread/${validated.data.threadId}`)
    return { success: true }
}

// Toggle like en thread
export async function toggleThreadLike(threadId: string) {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return { success: false, message: 'Unauthorized' }

    // Check if already liked
    const { data: existing } = await supabase
        .from('forum_likes')
        .select('id')
        .eq('user_id', user.id)
        .eq('thread_id', threadId)
        .single()

    if (existing) {
        // Unlike
        const { error } = await supabase
            .from('forum_likes')
            .delete()
            .eq('id', existing.id)

        if (error) return { success: false }
        revalidatePath(`/comunidad/thread/${threadId}`)
        revalidatePath(`/comunidad`)
        return { success: true, liked: false }
    } else {
        // Like
        const { error } = await supabase
            .from('forum_likes')
            .insert({
                user_id: user.id,
                thread_id: threadId
            })

        if (error) return { success: false }
        revalidatePath(`/comunidad/thread/${threadId}`)
        revalidatePath(`/comunidad`)
        return { success: true, liked: true }
    }
}

// Toggle like en reply
export async function toggleReplyLike(replyId: string, threadId: string) {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return { success: false, message: 'Unauthorized' }

    // Check if already liked
    const { data: existing } = await supabase
        .from('forum_likes')
        .select('id')
        .eq('user_id', user.id)
        .eq('reply_id', replyId)
        .single()

    if (existing) {
        // Unlike
        const { error } = await supabase
            .from('forum_likes')
            .delete()
            .eq('id', existing.id)

        if (error) return { success: false }
        revalidatePath(`/comunidad/thread/${threadId}`)
        return { success: true, liked: false }
    } else {
        // Like
        const { error } = await supabase
            .from('forum_likes')
            .insert({
                user_id: user.id,
                reply_id: replyId
            })

        if (error) return { success: false }
        revalidatePath(`/comunidad/thread/${threadId}`)
        return { success: true, liked: true }
    }
}
