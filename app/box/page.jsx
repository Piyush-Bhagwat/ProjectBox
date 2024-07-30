"use client";
import ProjectCard from "@/components/ProjectCard";
import Skeleton from "@/components/ui/skeleton";
import { projectContext } from "@/context/projectContext";
import React, { useContext } from "react";

const page = () => {
    const { box } = useContext(projectContext);

    const renderCards = () => {
        return (
            <>
                {box?.map((item) => {
                    return <ProjectCard project={item} id={item.id} />;
                })}
            </>
        );
    };

    return (
        <div className="p-5 min-h-[60vh]">
            <h2 className="text-neutral-200 text-4xl font-bold">Your Box</h2>

            {box ? (
                <div className="mt-6 grid grid-col-1 md:grid-cols-4 gap-3 md:gap-5">
                    {renderCards()}
                </div>
            ) : (
                <Skeleton />
            )}
        </div>
    );
};

export default page;
