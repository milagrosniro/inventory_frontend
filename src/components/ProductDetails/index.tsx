import { ActionFunctionArgs, Form, redirect, useFetcher, useNavigate } from "react-router-dom";
import { deleteProductById } from "../../services/ProductService";
import { formatCurrency } from "../../utils";
import { IProductDetailsProps } from "./productDetails.types";

export const action = async ({ params }: ActionFunctionArgs) => {  
   await deleteProductById({id: Number(params.id!)})
    return redirect('/')
}

const ProductDetails = ({product}: IProductDetailsProps) => {

    const {availability, name, price, id} = product;
    const fetcher = useFetcher()
    const navigate = useNavigate()


    const handleEdit = (id: number) =>{
        navigate(`/products/edit/${id}`)
    }

  return (
  
          <tr className="border-b ">
        <td className="p-3 text-lg text-gray-800">
            {name}

        </td>
        <td className="p-3 text-lg text-gray-800">
            {formatCurrency(Number(price))}

        </td>
        
        <td className="p-3 text-lg text-gray-800">
        <fetcher.Form
        method="POST">
            <button
            type="submit"
            name= 'id'
            value={product.id}
            className={`${availability ? 'text-black' : 'text-red-600'} rounded-lg p-2 text-xs uppercase font-bold w-full border border-black-100 hover:cursor-pointer`}
            >

            {availability ? 'Available' : 'Not Available'}
            </button>

        </fetcher.Form>
   
        </td>
        <td className="p-3 text-lg text-gray-800 ">
            <div className="flex gap-2 items-center">
                <button 
                className="bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
                onClick={()=> handleEdit(id)}>Edit</button>
                <Form 
                className="w-full"
                method={'POST'}
                action={`products/delete/${product.id}`}
                >
                    <input
                    type="submit"
                    value={'Delete'}
                    className="bg-red-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"

                    />
                </Form>
                {/* <button 
                className="bg-red-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
                onClick={()=> handleDelete(id)}>Delete</button> */}

            </div>
           
        </td>
    </tr> 

 
  )
}

export default ProductDetails