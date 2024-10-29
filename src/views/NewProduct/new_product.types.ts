import { InferOutput } from 'valibot'
import { ProductSchema } from '../../schemas'


export type Product = InferOutput<typeof ProductSchema>