import React from "react";

const TextInput = ({
    onChange,
    autoComplete,
    placeholder,
    required,
    name,
    id,
    className,
    value,
    lable,
    password
}) => {
    return (
        <div>
            {lable && <label
                htmlFor={id}
                className="block text-sm font-medium leading-6 text-neutral-200"
            >
                {lable} :
            </label>}
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
                <input
                    id={id}
                    name={name}
                    required={required}
                    value={value}
                    type = {password ? "password" : "text"}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    onChange={onChange}
                    className={`${className} block flex-1 border-0 bg-transparent py-1.5 pl-1 text-neutral-200 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6`}
                />
            </div>
        </div>
    );
};

export default TextInput;
