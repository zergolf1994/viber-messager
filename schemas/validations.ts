import * as z from "zod"

export const searchParamsSchema = z.object({
    page: z.coerce.number().default(1),
    per_page: z.coerce.number().default(10),
    sort: z.string().optional(),
    name: z.string().optional(),
    title: z.string().optional(),
    category: z.string().optional(),
    store: z.string().optional(),
    status: z.string().optional(),
    priority: z.string().optional(),
    operator: z.string().optional(),
})