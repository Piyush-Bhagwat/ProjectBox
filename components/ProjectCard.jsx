import { projectContext } from "@/context/projectContext";
import Image from "next/image";

import React, { useContext } from "react";

import Link from 'next/link';
import Button from "./ui/Button";


const ProjectCard = ({ project }) => {

    console.log(project);
    const {user} = useContext(projectContext)

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
        <article className={`overflow-hidden w-[23%] p-2  border rounded-lg bg-neutral-900 border-gray-400 shadow-sm ${project.auther == user.username && "border border-white"}`}>
            <Image
                alt=""
                width={480}
                height={480}
                src={project.photos[0]}
                className="h-56 w-full object-cover rounded-lg"
            />

            <div className="p-2">

                <Link href={`/display?id=${project.id}`}>
                    <h3 className="text-lg font-medium text-gray-50">

                        {project.projectName}

                    </h3>
                </Link>

                <div className="flex flex-wrap gap-1">{renderTech()}</div>


                <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-400">

                    {project.about}
                </p>

                <Link
                    href={`/display?id=${project.id}`}
                    className="mt-3 block"
                   >
                    <Button rounded="true" lable="View Project ->"/>
                </Link>

            </div>
        </article>
    );
};

export default ProjectCard;
