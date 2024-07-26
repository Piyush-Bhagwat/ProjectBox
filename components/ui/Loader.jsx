import React from "react";
import { Rings } from "react-loader-spinner";

const Loader = ({className, background}) => {
    return (
        <div className={`${className} fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${background && "bg-neutral-800 shadow-lg p-3 rounded-xl"} z-50`}>
            <Rings
                visible={true}
                height="150"
                width="150"
                color={background ? "#111" :"#333"}
                ariaLabel="rotating-square-loading"
            />
        </div>
    );
};

export default Loader;
