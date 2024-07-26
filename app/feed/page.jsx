"use client";
import ProjectCard from "@/components/ProjectCard";
import Button from "@/components/ui/Button";
import { projectContext } from "@/context/projectContext";
import React, { useContext, useEffect } from "react";

const FeedPage = () => {
    const { user, box } = useContext(projectContext);
    const renderCards = () => {
        return (
            <>
                {box?.map((item) => {
                    return <ProjectCard project={item} />;
                })}
            </>
        );
    };

    return (
        <div className="p-5">
            <div className="flex flex-wrap gap-6 justify-center w-full">
                {renderCards()}
            </div>
        </div>
    );
};

export default FeedPage;
