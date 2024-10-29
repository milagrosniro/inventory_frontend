import {
  ActionFunctionArgs,
  Form,
  Link,
  LoaderFunctionArgs,
  redirect,
  useActionData,
  useLoaderData,
} from "react-router-dom";
import ErrorMsg from "../../components/ErrorMsg";
import ProductForm from "../../components/ProductForm";
import { getProductById, updateProduct } from "../../services/ProductService";
import { Product } from "../NewProduct/new_product.types";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { id } = params;
  if (id) {
    const product = await getProductById({ id: +id });
    if (!product)
      throw new Response("", { status: 404, statusText: "Product Not Found" });
    return product;
  }
  return { id };
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const data = Object.fromEntries(await request.formData());

  let error = "";
  if (Object.values(data).includes("") || Object.values(data).includes(" ")) {
    error = "All fields are required";
  }
  if (error.length) return error;
  const { id } = params;
  if (id) {
    await updateProduct({ data, id: +id });
    return redirect("/");
  } else {
    console.log("Invalid Product ID");
  }
};

const availabilityOptions = [
  { name: "Available", value: true },
  { name: "Not Available", value: false },
];
const EditProduct = () => {
  const product = useLoaderData() as Product;
  const error = useActionData() as string;

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">Edit Product</h2>
        <Link
          to={"/"}
          className=" rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500 "
        >
          Back to Home
        </Link>
      </div>
      {error && <ErrorMsg>{error}</ErrorMsg>}

      <Form className="mt-10" method="POST">
        <ProductForm
        product={product}/>
        {/* <div className="mb-4">
          <label className="text-gray-800" htmlFor="name">
            Product Name:
          </label>
          <input
            id="name"
            type="text"
            className="mt-2 block w-full p-3 bg-gray-50"
            placeholder="Product Name"
            name="name"
            defaultValue={name}
          />
        </div>
        <div className="mb-4">
          <label className="text-gray-800" htmlFor="price">
            Price:
          </label>
          <input
            id="price"
            type="number"
            className="mt-2 block w-full p-3 bg-gray-50"
            placeholder="Product Price . ej. 200, 300"
            name="price"
            defaultValue={price}
          />
        </div> */}

        <div className="mb-4">
          <label className="text-gray-800" htmlFor="availability">
            Availability:
          </label>
          <select
            id="availability"
            className="mt-2 block w-full p-3 bg-gray-50"
            name="availability"
            defaultValue={product?.availability.toString()}
          >
            {availabilityOptions.map((option) => (
              <option key={option.name} value={option.value.toString()}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Edit Product"
        />
      </Form>
    </>
  );
};

export default EditProduct;
