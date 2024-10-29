import {
  ActionFunctionArgs,
  Form,
  Link,
  redirect,
  useActionData,
} from "react-router-dom";
import ErrorMsg from "../../components/ErrorMsg";
import ProductForm from "../../components/ProductForm";
import { addProduct } from "../../services/ProductService";

export const action = async ({ request }: ActionFunctionArgs) => {
  const data = Object.fromEntries(await request.formData());

  let error = "";
  if (Object.values(data).includes("") || Object.values(data).includes(" ")) {
    error = "All fields are required";
  }
  if (error.length) return error;
  await addProduct({ data });
  return redirect("/");
};
const NewProduct = () => {
  const error = useActionData() as string;

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">
          Register a new Product
        </h2>
        <Link
          to={"/"}
          className=" rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500 "
        >
          Back to Home
        </Link>
      </div>
      {error && <ErrorMsg>{error}</ErrorMsg>}

      <Form className="mt-10" method="POST">
        <ProductForm />
      
        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Add new Product"
        />
      </Form>
    </>
  );
};

export default NewProduct;
