import { z } from 'astro:content'

export const frontmatterSchema = z.object({
  minutesRead: z.number().min(1),
  lastModified: z.coerce.date().optional(),
})

export type Frontmatter = z.infer<typeof frontmatterSchema>
