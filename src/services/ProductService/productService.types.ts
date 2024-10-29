import { Product } from "../../views/NewProduct/new_product.types"

export type ProductData = {
    [k: string]: FormDataEntryValue
}
export interface IAddProductArgs{
    data: ProductData
}

export interface IGetProductByIdArgs{
    id: Product['id']
}

export interface IUpdateProductArgs{
    data: ProductData,
    id: Product['id']
}

export interface IDeleteProductByIdArgs{
    id: Product['id']
}

export interface IUpdateProductAvailabilityArgs{
    id: any
}