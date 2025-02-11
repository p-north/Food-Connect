import type React from "react"

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode
}

const Form: React.FC<FormProps> = ({ children, ...props }) => {
  return (
    <form className="space-y-4" {...props}>
      {children}
    </form>
  )
}

export default Form