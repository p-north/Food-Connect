import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  className?: string;
  padding?: boolean;
}

const Container = ({ 
  children, 
  maxWidth = 'lg',
  padding = true,
  className = ''
}: ContainerProps) => {
  const maxWidthClasses = {
    xs: 'max-w-xs',
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    'full': 'max-w-full',
  };
  
  const paddingClasses = padding ? 'px-4' : '';
  
  return (
    <div className={`mx-auto ${maxWidthClasses[maxWidth]} ${paddingClasses} ${className}`}>
      {children}
    </div>
  );
};

export default Container;