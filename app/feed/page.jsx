"use client";
import ProjectCard from "@/components/ProjectCard";
import Skeleton from "@/components/ui/skeleton";
import { projectContext } from "@/context/projectContext";
import React, { useContext, useEffect } from "react";
import { Rings, RotatingSquare } from "react-loader-spinner";

const FeedPage = () => {
    const { user, feed } = useContext(projectContext);
    const renderCards = () => {
        return (
            <>
                {feed?.map((item) => {
                    return <ProjectCard project={item} id={item.id} />;
                })}
            </>
        );
    };

    return (
        <div className="p-5 min-h-[60vh]">
            {feed ? (
                <div className="flex flex-wrap gap-6 justify-center w-full">
                    {renderCards()}
                </div>
            ) : (
                <Skeleton />
            )}
        </div>
    );
};

export default FeedPage;
