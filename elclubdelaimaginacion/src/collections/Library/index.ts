import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'
import { anyone } from '../../access/anyone'

export const Library: CollectionConfig = {
    slug: 'library',
    access: {
        create: authenticated,
        delete: authenticated,
        read: authenticated, // Or anyone if using "accessTier" to filter in frontend? No, keep safe.
        update: authenticated,
    },
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'author', 'type', 'accessTier'],
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'author',
            type: 'text',
            required: true,
            index: true,
        },
        {
            name: 'type',
            type: 'select',
            options: [
                { label: 'Audio / Conferencia', value: 'audio' },
                { label: 'Video', value: 'video' },
                { label: 'Libro / PDF', value: 'book' },
                { label: 'Texto', value: 'text' },
            ],
            required: true,
        },
        {
            name: 'accessTier',
            type: 'select',
            label: 'Minimum Tier Required',
            options: [
                { label: 'Bronce', value: 'bronce' },
                { label: 'Plata', value: 'plata' },
                { label: 'Oro', value: 'oro' },
            ],
            defaultValue: 'plata',
            required: true,
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'description',
            type: 'textarea',
        },
        {
            name: 'media',
            type: 'upload',
            relationTo: 'media',
            required: false,
        },
        {
            name: 'externalLink',
            type: 'text',
            label: 'External Link (Youtube/Vimeo)',
        },
        {
            name: 'category',
            type: 'relationship',
            relationTo: 'categories',
            hasMany: true,
        },
    ],
}
