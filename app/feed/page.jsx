"use client";
import ProjectCard from "@/components/ProjectCard";
import { projectContext } from "@/context/projectContext";
import React, { useContext, useEffect } from "react";

// project data

const projects=[
    {id:11, name:"Project1", description:"Desc1"},
    {id:2, name:"Project2", description:"Desc2"}
];

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
<<<<<<< HEAD
                {projects.map(project=>(
                <ProjectCard key={project.id} project={project}/>
                ))}
=======
                {renderCards()}
>>>>>>> 30dab624af85ada0f295a7679f52b8fcbc4eb8f1
            </div>
        </div>
    );
};

export default FeedPage;
