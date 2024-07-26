"use client";
import ProjectCard from "@/components/ProjectCard";
import React from "react";

// project data

const projects=[
    {id:11, name:"Project1", description:"Desc1"},
    {id:2, name:"Project2", description:"Desc2"}
];

const FeedPage = () => {
    return (
        <div className="p-5">
            <div className="flex flex-wrap gap-6 justify-center w-full">
                {projects.map(project=>(
                <ProjectCard key={project.id} project={project}/>
                ))}
            </div>
        </div>
    );
};

export default FeedPage;
