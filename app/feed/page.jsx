"use client";
import ProjectCard from "@/components/ProjectCard";
import { projectContext } from "@/context/projectContext";
import { getbox } from "@/firebase/firebase.db";
import React, { useContext, useEffect } from "react";

const FeedPage = () => {
    const { user, box } = useContext(projectContext);
    const renderCards = () => {
       return <>
            { box?.map(() => {
                return <ProjectCard />;
            })}
        </>;
    };

    return (
        <div className="p-5">
            <div className="flex flex-wrap gap-6 justify-center w-full"></div>

            {renderCards()}
        </div>
    );
};

export default FeedPage;
