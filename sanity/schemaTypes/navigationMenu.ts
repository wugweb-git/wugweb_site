import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'navigationMenu',
  title: 'Navigation Menu',
  type: 'document',
  groups: [
    { name: 'details', title: 'Menu Details' },
    { name: 'items', title: 'Menu Items' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Menu Title',
      type: 'string',
      validation: (r) => r.required(),
      group: 'details',
    }),
    defineField({
      name: 'menuId',
      title: 'Menu Identifier',
      type: 'string',
      options: {
        list: [
          { title: 'Header Main Navigation', value: 'header-main' },
          { title: 'Mobile Overlay Drawer', value: 'mobile-drawer' },
          { title: 'Footer Services Links', value: 'footer-services' },
          { title: 'Footer Sitemap Links', value: 'footer-sitemap' },
          { title: 'Footer Legal Links', value: 'footer-legal' },
          { title: 'Social Presence Links', value: 'social-presence' },
        ],
      },
      validation: (r) => r.required(),
      group: 'details',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      group: 'details',
    }),
    defineField({
      name: 'items',
      title: 'Navigation Links',
      type: 'array',
      group: 'items',
      of: [
        {
          type: 'object',
          name: 'menuLink',
          title: 'Menu Link',
          fields: [
            defineField({ name: 'label', title: 'Link Label', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'url', title: 'URL Path', type: 'string', description: 'e.g. /services or /contact-us or https://...', validation: (r) => r.required() }),
            defineField({ name: 'pageRef', title: 'Link to Singleton Page', type: 'reference', to: [{ type: 'singletonPage' }] }),
            defineField({ name: 'badge', title: 'Highlight Badge', type: 'string', description: 'e.g. New, Hot, 24h SLA' }),
            defineField({ name: 'isButton', title: 'Style as CTA Button', type: 'boolean', initialValue: false }),
            defineField({ name: 'openInNewTab', title: 'Open in New Tab', type: 'boolean', initialValue: false }),
            defineField({ name: 'icon', title: 'Icon Identifier / Emoji', type: 'string', description: 'e.g. 🛠 or wa-icon' }),
            defineField({ name: 'order', title: 'Order', type: 'number', initialValue: 0 }),
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'url',
              isButton: 'isButton',
              badge: 'badge',
            },
            prepare: ({ title, subtitle, isButton, badge }) => ({
              title: `${isButton ? '⚡ ' : ''}${title || 'Untitled Link'}`,
              subtitle: `${subtitle || '/'}${badge ? ' · ' + badge : ''}`,
            }),
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      menuId: 'menuId',
      items: 'items',
    },
    prepare: ({ title, menuId, items }) => ({
      title: title || 'Untitled Menu',
      subtitle: `${menuId || 'menu'} · ${Array.isArray(items) ? items.length : 0} link(s)`,
    }),
  },
});
