import React from 'react';
import classNames from 'classnames';

const Button = ({
    children,
    onClick,
    type = 'button',
    variant = 'primary',
    size = 'md',
    className,
    disabled = false,
    isLoading = false,
    ...props
}) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium rounded-md focus:outline-none transition-colors duration-200';

    const variants = {
        primary: 'bg-instagram-primary hover:bg-pink-700 text-white shadow-sm',
        secondary: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50',
        outline: 'bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50',
        ghost: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100',
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
    };

    return (
        <button
            type={type}
            className={classNames(
                baseStyles,
                variants[variant],
                sizes[size],
                { 'opacity-50 cursor-not-allowed': disabled || isLoading },
                className
            )}
            onClick={onClick}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading && (
                <svg className="w-4 h-4 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
            )}
            {children}
        </button>
    );
};

export default Button;
