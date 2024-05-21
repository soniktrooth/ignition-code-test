import { z, ZodType } from 'zod'
import { FormData } from './types'

const fixedPriceSchema = z.object({
  type: z.literal('fixed'),
  amount: z.number().nonnegative(),
})

const minMax = z
  .number()
  .nonnegative()
  .refine(
    (data) => {
      console.log(data)
      return data.min < data.max
    },
    {
      message: 'Min must be less than max',
    }
  )

const rangePriceSchema = z.object({
  type: z.literal('range'),
  amount: z
    .object({
      min: z.number().nonnegative(),
      max: z.number().nonnegative(),
    })
    .refine(
      (data) => {
        return data.min < data.max
      },
      {
        message: 'Min must be less than max',
        // path: ['min', 'max'],
      }
    ),
})

const priceSchema = z.discriminatedUnion('type', [
  fixedPriceSchema,
  rangePriceSchema,
])

export const formSchema: ZodType<FormData> = z.object({
  name: z.string().min(1).max(10),
  email: z.string().email(),
  price: priceSchema.optional(),
})
