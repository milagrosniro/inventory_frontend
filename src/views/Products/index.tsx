import { ActionFunctionArgs, Link, useLoaderData } from "react-router-dom";
import ProductDetails from "../../components/ProductDetails";
import { getProducts, updateProductAvailability } from "../../services/ProductService";
import { Product } from "../NewProduct/new_product.types";

//se carga antes del componente
export const loader = async () => {
  const products = await getProducts();
  return products;
};

export const action = async ({request}: ActionFunctionArgs) =>{
  const data = Object.fromEntries(await request.formData())
  const {id} = data
  await updateProductAvailability({id})
  return {}
}

const Products = () => {
  const products = useLoaderData() as Product[];

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">Products</h2>
        <Link
          to={"products/new"}
          className=" rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500 "
        >
          {" "}
          Add new Product
        </Link>
      </div>

      <div className="p-2">
        <table className="w-full mt-5 table-auto">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="p-2">Product</th>
              <th className="p-2">Price</th>
              <th className="p-2">Availability</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              products.length && products.map(product => <ProductDetails key={product.id} product={product}/>)
            }
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Products;
