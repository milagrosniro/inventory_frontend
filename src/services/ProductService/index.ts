import axios from "axios";
import { safeParse } from "valibot";
import {
  DraftProductSchema,
  ProductSchema,
  ProductsSchema,
} from "../../schemas";
import { toBoolean } from "../../utils";
import {
  IAddProductArgs,
  IDeleteProductByIdArgs,
  IGetProductByIdArgs,
  IUpdateProductArgs,
  IUpdateProductAvailabilityArgs,
} from "./productService.types";

export const addProduct = async ({ data }: IAddProductArgs) => {
  try {
    const result = safeParse(DraftProductSchema, {
      name: data.name,
      price: +data.price,
    });

    if (!result.success) throw new Error("Invalid Data");
    const url = `${import.meta.env.VITE_API_URL}api/products`;

    await axios.post(url, {
      name: result.output.name,
      price: result.output.price,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getProducts = async () => {
  try {
    const url = `${import.meta.env.VITE_API_URL}api/products`;
    const { data } = await axios(url);
    const result = safeParse(ProductsSchema, data.data);
    if (!result.success) throw new Error("Invalid Data");
    if (result.success) {
      return result.output;
    }
  } catch (err) {
    console.log(err);
  }
};

export const getProductById = async ({ id }: IGetProductByIdArgs) => {
  try {
    const url = `${import.meta.env.VITE_API_URL}api/products/${id}`;
    const { data } = await axios(url);
    const result = safeParse(ProductSchema, data.data);
    if (!result.success) throw new Error("Invalid Data");
    if (result.success) {
      return result.output;
    }
  } catch (err) {
    console.log(err);
  }
};

export const updateProduct = async ({ data, id }: IUpdateProductArgs) => {
  try {

    const result = safeParse(ProductSchema, {
      name: data.name,
      price: data.price,
      id: id,
      availability: typeof data.availability === 'string' && toBoolean(data.availability),
    });

    if (!result.success) throw new Error("Invalid Data");
    if (result.success) {
      const url = `${import.meta.env.VITE_API_URL}api/products/${id}`;

      await axios.put(url, result.output);
    }
  } catch (err) {
    console.log(err);
  }
};

export const deleteProductById = async ({ id }: IDeleteProductByIdArgs) => {
  try {
    const url = `${import.meta.env.VITE_API_URL}api/products/${id}`;
    await axios.delete(url);

  } catch (err) {
    console.log(err);
  }
};

export const updateProductAvailability = async ({id}: IUpdateProductAvailabilityArgs)=>{
  try {
    const url = `${import.meta.env.VITE_API_URL}api/products/${id}`;
    await axios.patch(url);

  } catch (err) {
    console.log(err);
  }
}