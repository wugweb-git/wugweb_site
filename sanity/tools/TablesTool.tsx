import {useCallback, useEffect, useMemo, useState} from 'react'
import {useClient} from 'sanity'
import {IntentLink} from 'sanity/router'
import {Box, Card, Flex, Select, Spinner, Stack, Text, TextInput} from '@sanity/ui'

type TableKey =
  | 'asset'
  | 'caseStudy'
  | 'client'
  | 'engagement'
  | 'industry'
  | 'person'
  | 'post'
  | 'service'
  | 'singletonPage'
  | 'siteSettings'
  | 'syncStatus'
  | 'taxonomy'
  | 'contactSubmission'
  | 'platformProfile'

type Column = {key: string; label: string; width?: string}

type TableConfig = {
  key: TableKey
  title: string
  query: string
  columns: Column[]
}

const TABLES: TableConfig[] = [
  {
    key: 'asset',
    title: 'Assets',
    query: `*[_type=="asset"]|order(assetGroup asc, name asc){
      _id, _type, name, displayName, assetType, assetGroup, usage, mediaType, status,
      relativePath, sitePath, r2Synced, localExists, linkedPageId,
      "linkedCaseStudy": linkedCaseStudy->title,
      "linkedClient": linkedClient->name,
      "linkedService": linkedService->title,
      "linkedPost": linkedPost->title
    }`,
    columns: [
      {key: 'name', label: 'Name', width: '16%'},
      {key: 'assetGroup', label: 'Group', width: '8%'},
      {key: 'usage', label: 'Usage', width: '10%'},
      {key: 'mediaType', label: 'Media', width: '8%'},
      {key: 'relativePath', label: 'Path', width: '22%'},
      {key: 'r2Synced', label: 'R2', width: '6%'},
      {key: 'linkedCaseStudy', label: 'Case study', width: '12%'},
      {key: 'linkedClient', label: 'Client', width: '10%'},
      {key: 'linkedService', label: 'Service', width: '8%'},
    ],
  },
  {
    key: 'caseStudy',
    title: 'Case studies',
    query: `*[_type=="caseStudy"]|order(title asc){
      _id, _type, title, client, featured, "slug": slug.current,
      "clientRef": clientRef->name,
      "industryRef": industryRef->name,
      disciplines,
      "hasCoverPath": defined(coverPath),
      "hasThumb": defined(thumbnailPath),
      "gallery": count(galleryPaths),
      "services": count(services),
      "assets": count(*[_type=="asset" && linkedCaseStudy._ref == ^._id])
    }`,
    columns: [
      {key: 'title', label: 'Title', width: '24%'},
      {key: 'client', label: 'Client (text)', width: '12%'},
      {key: 'clientRef', label: 'Client ref', width: '12%'},
      {key: 'hasThumb', label: 'Thumb', width: '7%'},
      {key: 'hasCoverPath', label: 'Cover', width: '7%'},
      {key: 'gallery', label: 'Gallery', width: '8%'},
      {key: 'assets', label: 'Assets', width: '8%'},
      {key: 'services', label: 'Services', width: '8%'},
      {key: 'featured', label: 'Featured', width: '8%'},
    ],
  },
  {
    key: 'client',
    title: 'Clients',
    query: `*[_type=="client"]|order(name asc){
      _id, _type, name, "slug": slug.current, engagementType,
      "industry": industry->name, website, logoPath,
      "caseStudies": count(caseStudies),
      "engagements": count(engagements),
      "assets": count(*[_type=="asset" && linkedClient._ref == ^._id])
    }`,
    columns: [
      {key: 'name', label: 'Name', width: '18%'},
      {key: 'industry', label: 'Industry', width: '14%'},
      {key: 'engagementType', label: 'Engagement', width: '12%'},
      {key: 'caseStudies', label: 'Case studies', width: '10%'},
      {key: 'assets', label: 'Assets', width: '8%'},
      {key: 'logoPath', label: 'Logo path', width: '22%'},
      {key: 'website', label: 'Website', width: '16%'},
    ],
  },
  {
    key: 'engagement',
    title: 'Engagements',
    query: `*[_type=="engagement"]|order(startDate desc, name asc){
      _id, _type, name, status, engagementType,
      "client": client->name, startDate, endDate, priceLabel,
      "services": count(services)
    }`,
    columns: [
      {key: 'name', label: 'Name', width: '22%'},
      {key: 'client', label: 'Client', width: '16%'},
      {key: 'status', label: 'Status', width: '12%'},
      {key: 'engagementType', label: 'Type', width: '14%'},
      {key: 'startDate', label: 'Start', width: '12%'},
      {key: 'services', label: 'Services', width: '10%'},
      {key: 'priceLabel', label: 'Price', width: '14%'},
    ],
  },
  {
    key: 'industry',
    title: 'Industries',
    query: `*[_type=="industry"]|order(order asc, name asc){
      _id, _type, name, "slug": slug.current, order, description, icon,
      "clients": count(*[_type=="client" && industry._ref == ^._id])
    }`,
    columns: [
      {key: 'name', label: 'Name', width: '22%'},
      {key: 'slug', label: 'Slug', width: '16%'},
      {key: 'order', label: 'Order', width: '8%'},
      {key: 'clients', label: 'Clients', width: '10%'},
      {key: 'icon', label: 'Icon', width: '8%'},
      {key: 'description', label: 'Description', width: '36%'},
    ],
  },
  {
    key: 'post',
    title: 'Blog posts',
    query: `*[_type=="post"]|order(publishedAt desc){
      _id, _type, title, category, featured, publishedAt, readingTime,
      "author": author->name,
      "hasCover": defined(coverImage.asset),
      "hasCoverPath": defined(coverPath),
      "related": count(relatedPosts)
    }`,
    columns: [
      {key: 'title', label: 'Title', width: '30%'},
      {key: 'category', label: 'Category', width: '14%'},
      {key: 'author', label: 'Author', width: '12%'},
      {key: 'publishedAt', label: 'Published', width: '12%'},
      {key: 'hasCoverPath', label: 'Path', width: '8%'},
      {key: 'hasCover', label: 'CDN', width: '8%'},
      {key: 'related', label: 'Related', width: '8%'},
      {key: 'featured', label: 'Featured', width: '8%'},
    ],
  },
  {
    key: 'service',
    title: 'Services',
    query: `*[_type=="service"]|order(order asc, title asc){
      _id, _type, title, subtitle, "slug": slug.current, order, tags, coverPath,
      "caseStudies": count(caseStudies),
      "relatedServices": count(relatedServices),
      "assets": count(*[_type=="asset" && linkedService._ref == ^._id])
    }`,
    columns: [
      {key: 'order', label: '#', width: '6%'},
      {key: 'title', label: 'Title', width: '16%'},
      {key: 'slug', label: 'Slug', width: '14%'},
      {key: 'caseStudies', label: 'Cases', width: '8%'},
      {key: 'assets', label: 'Assets', width: '8%'},
      {key: 'coverPath', label: 'Cover path', width: '22%'},
      {key: 'tags', label: 'Tags', width: '26%'},
    ],
  },
  {
    key: 'person',
    title: 'Team',
    query: `*[_type=="person"]|order(order asc, name asc){
      _id, _type, name, role, "slug": slug.current, order,
      "hasPhoto": defined(photo.asset),
      "posts": count(*[_type=="post" && author._ref == ^._id])
    }`,
    columns: [
      {key: 'name', label: 'Name', width: '22%'},
      {key: 'role', label: 'Role', width: '24%'},
      {key: 'order', label: 'Order', width: '10%'},
      {key: 'posts', label: 'Posts', width: '10%'},
      {key: 'hasPhoto', label: 'Photo', width: '10%'},
      {key: 'slug', label: 'Slug', width: '24%'},
    ],
  },
  {
    key: 'taxonomy',
    title: 'Taxonomy',
    query: `*[_type=="taxonomy"]|order(vocabulary asc, order asc, name asc){
      _id, _type, name, vocabulary, "slug": slug.current, order, icon, color, category, iconPath, status
    }`,
    columns: [
      {key: 'name', label: 'Name', width: '18%'},
      {key: 'vocabulary', label: 'Vocabulary', width: '14%'},
      {key: 'category', label: 'Category', width: '12%'},
      {key: 'status', label: 'Status', width: '10%'},
      {key: 'iconPath', label: 'Icon path', width: '26%'},
      {key: 'slug', label: 'Slug', width: '20%'},
    ],
  },
  {
    key: 'singletonPage',
    title: 'Pages',
    query: `*[_type=="singletonPage"]|order(pageId asc){
      _id, _type, pageId, title, subtitle, language, heroPath,
      "media": count(mediaPaths)
    }`,
    columns: [
      {key: 'pageId', label: 'Page ID', width: '16%'},
      {key: 'title', label: 'Title', width: '24%'},
      {key: 'subtitle', label: 'Subtitle', width: '24%'},
      {key: 'heroPath', label: 'Hero path', width: '22%'},
      {key: 'media', label: 'Media', width: '8%'},
      {key: 'language', label: 'Lang', width: '6%'},
    ],
  },
  {
    key: 'siteSettings',
    title: 'Site settings',
    query: `*[_type=="siteSettings"]{
      _id, _type, siteTitle, companyName, contactEmail, language, copyright
    }`,
    columns: [
      {key: 'siteTitle', label: 'Site title', width: '22%'},
      {key: 'companyName', label: 'Company', width: '18%'},
      {key: 'contactEmail', label: 'Email', width: '24%'},
      {key: 'language', label: 'Lang', width: '10%'},
      {key: 'copyright', label: 'Copyright', width: '26%'},
    ],
  },
  {
    key: 'syncStatus',
    title: 'Sync status',
    query: `*[_type=="syncStatus"]|order(entityType asc){
      _id, _type, source, target, status, entityType, entityCount, lastSyncedAt, notes
    }`,
    columns: [
      {key: 'entityType', label: 'Entity', width: '16%'},
      {key: 'source', label: 'Source', width: '12%'},
      {key: 'target', label: 'Target', width: '12%'},
      {key: 'status', label: 'Status', width: '12%'},
      {key: 'entityCount', label: 'Count', width: '10%'},
      {key: 'lastSyncedAt', label: 'Last sync', width: '16%'},
      {key: 'notes', label: 'Notes', width: '22%'},
    ],
  },
  {
    key: 'contactSubmission',
    title: 'Contact submissions',
    query: `*[_type=="contactSubmission"]|order(submittedAt desc){
      _id, _type, name, email, company, topic, phone, submittedAt
    }`,
    columns: [
      {key: 'name', label: 'Name', width: '16%'},
      {key: 'email', label: 'Email', width: '22%'},
      {key: 'company', label: 'Company', width: '16%'},
      {key: 'topic', label: 'Topic', width: '18%'},
      {key: 'phone', label: 'Phone', width: '12%'},
      {key: 'submittedAt', label: 'Submitted', width: '16%'},
    ],
  },
  {
    key: 'platformProfile',
    title: 'Presence',
    query: `*[_type=="platformProfile"]|order(platform asc, username asc){
      _id, _type, profileId, platform, username, profileUrl, category, profileStatus, owner,
      "platformMaster": platformRef->name
    }`,
    columns: [
      {key: 'platform', label: 'Platform', width: '14%'},
      {key: 'username', label: 'Handle', width: '12%'},
      {key: 'owner', label: 'Owner', width: '10%'},
      {key: 'profileStatus', label: 'Status', width: '10%'},
      {key: 'profileUrl', label: 'URL', width: '34%'},
      {key: 'platformMaster', label: 'Master', width: '12%'},
    ],
  },
]

function cellValue(row: Record<string, unknown>, key: string): string {
  const v = row[key]
  if (v == null || v === '') return '—'
  if (typeof v === 'boolean') return v ? 'Yes' : 'No'
  if (Array.isArray(v)) return v.length ? v.join(', ') : '—'
  if (typeof v === 'string' && /^\d{4}-\d{2}-\d{2}/.test(v)) return v.slice(0, 10)
  return String(v)
}

export function TablesTool() {
  const client = useClient({apiVersion: '2024-01-01'})
  const [active, setActive] = useState<TableKey>('asset')
  const [rows, setRows] = useState<Record<string, unknown>[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [q, setQ] = useState('')

  const config = useMemo(() => TABLES.find((t) => t.key === active)!, [active])

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      // One-shot fetch only — no live listeners (free-tier safe).
      const data = await client.fetch(config.query)
      setRows(Array.isArray(data) ? data : [])
    } catch (e: any) {
      setError(e?.message || 'Failed to load')
      setRows([])
    } finally {
      setLoading(false)
    }
  }, [client, config.query])

  useEffect(() => {
    setQ('')
    load()
  }, [load])

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase()
    if (!needle) return rows
    return rows.filter((row) =>
      config.columns.some((col) => cellValue(row, col.key).toLowerCase().includes(needle)),
    )
  }, [rows, q, config.columns])

  return (
    <Card height="fill" tone="transparent" padding={4}>
      <Stack space={4} height="fill">
        <Flex align="center" justify="space-between" gap={3} wrap="wrap">
          <Stack space={2}>
            <Text size={3} weight="semibold">
              Tables
            </Text>
            <Text size={1} muted>
              All document types as spreadsheet views. Click a row to edit. Relationship columns use
              Sanity references (`→`). One-shot load only (free-tier safe).
            </Text>
          </Stack>
          <Flex gap={2} align="center">
            <Select
              value={active}
              onChange={(e) => setActive(e.currentTarget.value as TableKey)}
              style={{minWidth: 200}}
            >
              {TABLES.map((t) => (
                <option key={t.key} value={t.key}>
                  {t.title}
                </option>
              ))}
            </Select>
            <TextInput
              value={q}
              onChange={(e) => setQ(e.currentTarget.value)}
              placeholder={`Search ${config.title.toLowerCase()}…`}
              style={{minWidth: 220}}
            />
            <Card
              as="button"
              padding={3}
              radius={2}
              tone="primary"
              onClick={load}
              style={{cursor: 'pointer', border: 0}}
            >
              <Text size={1} weight="medium">
                Refresh
              </Text>
            </Card>
          </Flex>
        </Flex>

        <Card border radius={2} overflow="hidden" style={{flex: 1, minHeight: 0}}>
          {loading ? (
            <Flex align="center" justify="center" padding={6}>
              <Spinner muted />
            </Flex>
          ) : error ? (
            <Box padding={4}>
              <Text size={1} style={{color: '#E54F30'}}>
                {error}
              </Text>
            </Box>
          ) : (
            <div style={{overflow: 'auto', maxHeight: 'calc(100vh - 180px)'}}>
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: 13,
                  fontFamily: 'Inter, system-ui, sans-serif',
                }}
              >
                <thead>
                  <tr
                    style={{
                      background: 'var(--card-muted-bg-color, #f1f3f5)',
                      position: 'sticky',
                      top: 0,
                    }}
                  >
                    {config.columns.map((col) => (
                      <th
                        key={col.key}
                        style={{
                          textAlign: 'left',
                          padding: '10px 12px',
                          borderBottom: '1px solid var(--card-border-color, #e1e3e6)',
                          width: col.width,
                          fontWeight: 600,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {col.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((row) => (
                    <tr
                      key={String(row._id)}
                      style={{borderBottom: '1px solid var(--card-border-color, #eee)'}}
                    >
                      {config.columns.map((col, i) => {
                        if (i === 0) {
                          return (
                            <td
                              key={col.key}
                              style={{padding: '10px 12px', verticalAlign: 'top', fontWeight: 500}}
                            >
                              <IntentLink
                                intent="edit"
                                params={{id: String(row._id), type: String(row._type)}}
                                style={{color: 'inherit', textDecoration: 'underline'}}
                              >
                                {cellValue(row, col.key)}
                              </IntentLink>
                            </td>
                          )
                        }
                        return (
                          <td
                            key={col.key}
                            style={{
                              padding: '10px 12px',
                              verticalAlign: 'top',
                              maxWidth: 420,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {cellValue(row, col.key)}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                  {!filtered.length && (
                    <tr>
                      <td
                        colSpan={config.columns.length}
                        style={{padding: 24, textAlign: 'center', opacity: 0.6}}
                      >
                        No rows match.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        <Text size={1} muted>
          Showing {filtered.length} of {rows.length} {config.title.toLowerCase()} · {TABLES.length}{' '}
          tables available
        </Text>
      </Stack>
    </Card>
  )
}

export default TablesTool
