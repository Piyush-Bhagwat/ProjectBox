import React from "react";

const Button = ({
    important,
    lable,
    onClick,
    className,
    type,
    rounded,
    lg,
    children
}) => {
    return (
        <button
            onClick={onClick}
            type={type}
            className={`${lg ? "px-6 py-2" : "px-3 py-0.5"}  border-white ${
                rounded ? "rounded-full" : "rounded-md"
            } ${
                important
                    ? "bg-neutral-100 text-black hover:bg-neutral-500 hover:text-neutral-100"
                    : "border-2 text-neutral-200"
            } border-dashed ${className}  hover:bg-neutral-100 hover:text-black transition-all flex gap-2 items-center`}
        >
            {lable}
            {children}
        </button>
    );
};

export default Button;
