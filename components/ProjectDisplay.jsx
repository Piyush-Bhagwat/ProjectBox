"use client";
import Image from "next/image";

const ProjectDisplay = ({project}) => {

    if (!project) {
        return <div className="text-white">Loading...</div>;
    }

    return (
        <div className="p-5">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-50">{project.projectName}</h1>
                <div className="mt-6">
                    <Image
                        src={project?.photos[0] || "https://via.placeholder.com/480"}
                        alt={project.projectName}
                        width={600}
                        height={700}
                        className="w-full aspect-video object-cover"
                    />
                </div>

                <div className="mt-6">
                    <p className="text-lg font-medium text-gray-50">Description</p>
                    <p className="mt-2 text-gray-700">{project.description}</p>
                </div>

                <div className="mt-6">
                    <p className="text-lg font-medium text-gray-50">Details</p>
                    <div className="mt-2 text-white">
                        <p><strong>Category:</strong> {project.category}</p>
                        <p><strong>Status:</strong> {project.status}</p>
                        <p><strong>Technologies:</strong> {project.tech}</p>
                        <p><strong>Tags:</strong> {project.tags}</p>
                        <p><strong>Date:</strong> {project.date}</p>
                    </div>
                </div>

                <div className="mt-6">
                    <p className="text-lg font-medium text-gray-50">Social Links</p>
                    <ul className="mt-2 list-disc list-inside text-white">
                        {project.githubLink && (
                            <li><a href={project.githubLink} target="_blank" rel="noopener noreferrer">Github</a></li>
                        )}
                        {project.hostedLink && (
                            <li><a href={project.hostedLink} target="_blank" rel="noopener noreferrer">Hosted</a></li>
                        )}
                        {project.twitterLink && (
                            <li><a href={project.twitterLink} target="_blank" rel="noopener noreferrer">Twitter</a></li>
                        )}
                        {project.linkedLink && (
                            <li><a href={project.linkedLink} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                        )}
                        {project.youtubeLink && (
                            <li><a href={project.youtubeLink} target="_blank" rel="noopener noreferrer">YouTube</a></li>
                        )}
                    </ul>
                </div>

                <div className="mt-6">
                    <p className="text-lg font-medium text-gray-50">Journey</p>
                    <div className="mt-2 text-white">
                        <p><strong>Problems Faced:</strong> {project.problems}</p>
                        <p><strong>Solution:</strong> {project.solution}</p>
                        <p><strong>Personal Notes:</strong> {project.notes}</p>
                    </div>
                </div>

                <div className="mt-6">
                    <p className="text-lg font-medium text-gray-50">Team Members</p>
                    <ul className="mt-2 list-disc list-inside text-white">
                        {project.members && project.members.map((member, index) => (
                            <li key={index}>{member}</li>
                        ))}
                    </ul>
                </div>

                <div className="mt-6">
                    <p className="text-lg font-medium text-gray-50">Photos</p>
                    <div className="mt-2 flex gap-2">
                        {project.photos && project.photos.map((img, idx) => (
                            <Image
                                key={idx}
                                src={img}
                                alt={`Project Photo ${idx + 1}`}
                                width={1000}
                                height={1000}
                                className="w-[70%] aspect-square object-contain"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDisplay;
