import { projectContext } from "@/context/projectContext";
import Image from "next/image";
import React, { useContext } from "react";

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
        <article className={`overflow-hidden w-[23%]  border rounded-lg border-gray-600 shadow-sm ${project.auther == user.username && "border border-white"}`}>
            <Image
                alt=""
                width={480}
                height={480}
                src={project.photos[0]}
                className="h-56 w-full object-cover"
            />

            <div className="p-4 sm:p-6">
                <a href="#">
                    <h3 className="text-lg font-medium text-gray-50">
                        {project.projectName}
                    </h3>
                </a>

                <div className="flex flex-wrap gap-1">{renderTech()}</div>

                <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-300">
                    {project.about}
                </p>

                <a
                    href="#"
                    className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600"
                >
                    Find out more
                    <span
                        aria-hidden="true"
                        className="block transition-all group-hover:ms-0.5 rtl:rotate-180"
                    >
                        &rarr;
                    </span>
                </a>
            </div>
        </article>
    );
};

export default ProjectCard;
