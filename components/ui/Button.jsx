import React from "react";

const Button = ({
    important,
    lable,
    onClick,
    className,
    type,
    rounded,
    lg,
    children,
}) => {
    return (
        <button
            onClick={onClick}
            type={type}
            className={`${
                lg ? "md:px-6 md:py-2 " : "md:px-3 md:py-0.5 px-1.5"
            }  border-white ${rounded ? "rounded-full" : "rounded-md"} ${
                important
                    ? "bg-neutral-100 text-black hover:md:bg-neutral-500 hover:md:text-neutral-100 active:bg-neutral-500 active:text-neutral-100"
                    : "border-2 text-neutral-200"
            } border-dashed ${className} active:bg-neutral-100 active:text-black  hover:md:bg-neutral-100 hover:md:text-black transition-all flex md:gap-2 gap-1 items-center text-sm md:text-base`}
        >
            {lable}
            {children}
        </button>
    );
};

export default Button;
