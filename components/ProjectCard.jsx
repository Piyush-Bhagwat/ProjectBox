import Image from "next/image";
import React from "react";
import Link from 'next/link';

const ProjectCard = ({ project }) => {
    return (
        <article className="overflow-hidden w-[23%] border rounded-lg border-gray-600 bg-white shadow-sm">
            <Image
                alt=""
                width={480}
                height={480}
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                className="h-56 w-full object-cover"
            />

            <div className="p-4 sm:p-6">
                <Link href={`/display?id=${project.id}`}>
                    <h3 className="text-lg font-medium text-gray-900">
                        {project.name}
                    </h3>
                </Link>

                <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                  {project.description}
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
