import { InputHTMLAttributes } from 'react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  // Add custom props here if needed
}

const InputField = ({ className = '', ...props }: InputFieldProps) => {
  return (
    <input
      {...props}
      className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
    />
  );
};

export default InputField;
