import React from 'react';
import classNames from 'classnames';

const Input = React.forwardRef(({ label, error, className, ...props }, ref) => {
    return (
        <div className={className}>
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
            )}
            <div className="relative rounded-md shadow-sm">
                <input
                    ref={ref}
                    className={classNames(
                        'block w-full rounded-md border-gray-300 focus:border-instagram-primary focus:ring-instagram-primary sm:text-sm py-2 px-3',
                        { 'border-red-500 focus:border-red-500 focus:ring-red-500': error },
                        'border' // Ensure border is visible even without focus
                    )}
                    {...props}
                />
            </div>
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
});

export default Input;
