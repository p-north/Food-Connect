import { InputHTMLAttributes, ReactNode, forwardRef } from 'react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  helperText?: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(({
  label,
  error,
  icon,
  iconPosition = 'left',
  helperText,
  className = '',
  ...props
}, ref) => {
  return (
    <div className="mb-4">
      {label && (
        <label 
          htmlFor={props.id || props.name} 
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      
      <div className="relative">
        {icon && iconPosition === 'left' && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
            {icon}
          </div>
        )}
        
        <input
          ref={ref}
          className={`
            w-full px-3 py-2 border rounded-md shadow-sm 
            text-gray-900 placeholder-gray-400 
            focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500
            ${error ? 'border-red-500' : 'border-gray-300'}
            ${icon && iconPosition === 'left' ? 'pl-10' : ''}
            ${icon && iconPosition === 'right' ? 'pr-10' : ''}
            ${className}
          `}
          {...props}
        />
        
        {icon && iconPosition === 'right' && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-500">
            {icon}
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
      
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
});

InputField.displayName = 'InputField';

export default InputField;