import { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}

const Button = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  icon, 
  iconPosition = 'right',
  className = '',
  ...props 
}: ButtonProps) => {
  
  const baseClasses = "rounded-md px-4 py-3 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center";
  
  const variantClasses = {
    primary: "bg-green-500 text-white hover:bg-green-600 focus:ring-green-500",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500",
    outline: "border border-green-500 text-green-500 hover:bg-green-50 focus:ring-green-500"
  };
  
  const widthClasses = fullWidth ? "w-full" : "";
  
  return (
    <button 
      className={`${baseClasses} ${variantClasses[variant]} ${widthClasses} ${className}`}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
    </button>
  );
};

export default Button;