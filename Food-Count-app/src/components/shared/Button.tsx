import { ComponentProps, ElementType } from 'react';

type ButtonProps = ComponentProps<'button'> & {
  variant?: 'primary' | 'secondary' | 'text';
  as?: ElementType;
};

const Button = ({
  variant = 'primary',
  className = '',
  as: Component = 'button',
  ...props
}: ButtonProps) => {
  const baseStyles = 'px-4 py-2 rounded-md font-medium transition-colors duration-200';
  
  const variants = {
    primary: 'bg-blue-600 text-sm text-blue-600 hover:bg-blue-700',
    secondary: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50',
    text: 'text-blue-600 hover:text-blue-600'
  };

  return (
    <Component
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    />
  );
};

export default Button;
