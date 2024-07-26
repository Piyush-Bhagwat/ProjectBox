import Image from "next/image";
import React from "react";
import Link from 'next/link';

const ProjectCard = ({ project }) => {
<<<<<<< HEAD
=======
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

>>>>>>> 30dab624af85ada0f295a7679f52b8fcbc4eb8f1
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
                <Link href={`/display?id=${project.id}`}>
                    <h3 className="text-lg font-medium text-gray-900">
<<<<<<< HEAD
                        {project.name}
=======
                        {project.projectName}
>>>>>>> 30dab624af85ada0f295a7679f52b8fcbc4eb8f1
                    </h3>
                </Link>

                <div className="flex gap-1">{renderTags()}</div>

                <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
<<<<<<< HEAD
                  {project.description}
=======
                    {project.about}
>>>>>>> 30dab624af85ada0f295a7679f52b8fcbc4eb8f1
                </p>

                <Link
                    href={`/display?id=${project.id}`}
                    className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600">
                    Find out more
                    <span
                        aria-hidden="true"
                        className="block transition-all group-hover:ms-0.5 rtl:rotate-180"
                    >
                        &rarr;
                    </span>
                </Link>
            </div>
        </article>
    );
};

export default ProjectCard;
