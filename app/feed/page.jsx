"use client";
import ProjectCard from "@/components/ProjectCard";
import React from "react";

const FeedPage = () => {
    return (
        <div className="p-5">
            <div className="flex flex-wrap gap-6 justify-center w-full">
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
            </div>
        </div>
    );
};

export default FeedPage;
