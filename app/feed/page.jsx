'use client'
import { IMAGES } from "@/assets/assets";
import ProjectCard from "@/components/ProjectCard";
import { projectContext } from "@/context/projectContext";
import Image from "next/image";
import React, { useContext } from "react";

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
