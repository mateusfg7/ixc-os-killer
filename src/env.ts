import * as z from 'zod'

const envSchema = z.object({
    IXC_TOKEN: z.string(),
    IXC_API_URL: z.string().url(),
})

export const env = envSchema.parse(process.env)