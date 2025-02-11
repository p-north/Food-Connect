import type React from "react"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps> = (props) => {
  return (
    <input
      className="w-full px-3 py-2 border border-green-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
      {...props}
    />
  )
}

export default Input