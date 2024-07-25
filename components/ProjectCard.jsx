import Image from "next/image";
import React from "react";

const ProjectCard = ({ project }) => {
    console.log(project);

    const renderTags = () => {
        const tags = project.tags?.split(",");
        return (
            <>
                {tags?.map((tag) => {
                    return (
                        <div className="px-2 py-0.5 border text-sm border-black rounded-full">
                            {tag}
                        </div>
                    );
                })}
            </>
        );
    };

    return (
        <article className="overflow-hidden w-[23%] border rounded-lg border-gray-600 bg-white shadow-sm">
            <Image
                alt=""
                width={480}
                height={480}
                src={project.photos[0]}
                className="h-56 w-full object-cover"
            />

            <div className="p-4 sm:p-6">
                <a href="#">
                    <h3 className="text-lg font-medium text-gray-900">
                        {project.projectName}
                    </h3>
                </a>

                <div className="flex gap-1">{renderTags()}</div>

                <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
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
