import Image from "next/image";
import React from "react";

const ProjectCard = ({url}) => {
    return (
        <article className="overflow-hidden w-[23%] border rounded-lg border-gray-600 bg-white shadow-sm">
            <Image
                alt=""
                width={480}
                height={480}
                src={url}
                className="h-56 w-full object-cover"
            />

            <div className="p-4 sm:p-6">
                <a href="#">
                    <h3 className="text-lg font-medium text-gray-900">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </h3>
                </a>

                <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Recusandae dolores, possimus pariatur animi temporibus
                    nesciunt praesentium dolore sed nulla ipsum eveniet corporis
                    quidem, mollitia itaque minus soluta, voluptates neque
                    explicabo tempora nisi culpa eius atque dignissimos.
                    Molestias explicabo corporis voluptatem?
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
