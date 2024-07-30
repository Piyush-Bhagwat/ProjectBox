import BoxHeader from "@/components/BoxHeader";
import React from "react";

const layout = ({ children }) => {
    return (
        <div>
            <BoxHeader />
            {children}
        </div>
    );
};

export default layout;
