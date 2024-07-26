import { projectContext } from "@/context/projectContext";
import Image from "next/image";
import { FaRegUserCircle } from "react-icons/fa";

import React, { useContext } from "react";

import Link from "next/link";
import Button from "./ui/Button";

const ProjectCard = ({ project }) => {
    console.log(project);
    const { user } = useContext(projectContext);

    const renderTech = () => {
        const tags = project.tech?.split(",");
        return (
            <>
                {tags?.map((tag) => {
                    return (
                        <div className="px-2 py-0.5 text-white border text-sm border-white rounded-full">
                            {tag}
                        </div>
                    );
                })}
            </>
        );
    };

    return (

        <article
            className={`overflow-hidden w-[23%] p-2  border-2 border-dashed rounded-lg  shadow-sm ${
                project?.auther === user?.username
                    ? "border-white"
                    : "border-neutral-600"
            }`}
        >
            <Image
                alt={project.projectName}
                width={480}
                height={480}
                src={project.photos[0]}
                className="h-56 w-full object-cover rounded-lg"
            />

            <div className="p-2">
                <Link href={`/display/${project.id}`}>
                    <h3 className="text-lg font-medium text-neutral-200">
                        {project.projectName}
                    </h3>
                </Link>

                <div className="flex flex-wrap gap-1">{renderTech()}</div>

                <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-400">
                    {project.about}
                </p>

                <Link href="#">
                    
                    <h3 className="flex items-center text-neutral-400 gap-2">
                        <FaRegUserCircle /> {project.auther}
                    </h3>
                </Link>

                <Link href={`/display/${project.id}`} className="mt-3 block">
                    <Button rounded="true" lable="View Project ->" />
                </Link>
            </div>
        </article>
    );
};

export default ProjectCard;
