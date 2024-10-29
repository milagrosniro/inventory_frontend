import { PropsWithChildren } from "react"

const ErrorMsg = ({children}: PropsWithChildren) => {
  return (
    <div className="text-center bg-red-600 text-white font-bold p-3 uppercase mt-3">
        {children}
        </div>
  )
}

export default ErrorMsg