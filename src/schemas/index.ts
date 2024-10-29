import { array, boolean, number, object, string } from 'valibot'

export const DraftProductSchema = object({
    name: string(),
    price: number()

})
export const ProductSchema = object({
    id: number(),
    name: string(),
    price: string(),
    availability: boolean()
})
export const ProductsSchema = array(ProductSchema)