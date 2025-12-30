import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'tier',
      type: 'select',
      options: [
        { label: 'Bronce', value: 'bronce' },
        { label: 'Plata', value: 'plata' },
        { label: 'Oro', value: 'oro' },
      ],
      defaultValue: 'bronce',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
}
