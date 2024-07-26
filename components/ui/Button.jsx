import React from "react";

const Button = ({ lable, onClick, className, type, rounded }) => {
    return (
        <button
            onClick={onClick}
            type={type}
            className={`px-3 py-0.5 border-white ${rounded ? "rounded-full" : "rounded-md"} text-neutral-200 border-2 border-dashed ${className}  hover:bg-neutral-100 hover:text-black transition-all`}
        >
            {lable}
        </button>
    );
};

export default Button;
