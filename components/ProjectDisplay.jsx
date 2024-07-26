"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

const defaultProject = {
    name: "Sample Project",
    image: "data:image/jpeg;base64,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",
    description: "This is a sample project description.",
    category: "Web Development",
    status: "In Progress",
    tech: "React, Next.js, Tailwind CSS",
    tags: "sample, project, development",
    date: "2024-07-26",
    githubLink: "https://github.com/sample/project",
    hostedLink: "https://project.com",
    twitterLink: "https://twitter.com/sampleproject",
    linkedLink: "https://linkedin.com/in/sampleproject",
    youtubeLink: "https://youtube.com/sampleproject",
    problems: "Faced some challenges with API integration.",
    solution: "Solved by using custom hooks.",
    notes: "This is a sample personal note about the project.",
    members: ["Alice", "Bob", "Charlie"],
    images: [
        { url: "https://via.placeholder.com/200" },
        { url: "https://via.placeholder.com/200" },
        { url: "https://via.placeholder.com/200" },
    ],
};

const ProjectDisplay = () => {
    const searchParams = useSearchParams();
    const projectId = searchParams.get('id');

    const [project, setProject] = useState(defaultProject);

    useEffect(() => {
        if (projectId) {
            // Fetch project data with projectId
            fetch(`/api/projects/${projectId}`)
                .then((response) => response.json())
                .then((data) => setProject(data))
                .catch((error) => console.error('Error fetching project data:', error));
        }
    }, [projectId]);

    if (!project) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-5">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
                <div className="mt-6">
                    <Image
                        src={project.image || "https://via.placeholder.com/480"}
                        alt={project.name}
                        width={300}
                        height={200}
                        className="w-full h-auto object-cover"
                    />
                </div>

                <div className="mt-6">
                    <p className="text-lg font-medium text-gray-900">Description</p>
                    <p className="mt-2 text-gray-700">{project.description}</p>
                </div>

                <div className="mt-6">
                    <p className="text-lg font-medium text-gray-900">Details</p>
                    <div className="mt-2">
                        <p><strong>Category:</strong> {project.category}</p>
                        <p><strong>Status:</strong> {project.status}</p>
                        <p><strong>Technologies:</strong> {project.tech}</p>
                        <p><strong>Tags:</strong> {project.tags}</p>
                        <p><strong>Date:</strong> {new Date(project.date).toLocaleDateString()}</p>
                    </div>
                </div>

                <div className="mt-6">
                    <p className="text-lg font-medium text-gray-900">Social Links</p>
                    <ul className="mt-2 list-disc list-inside">
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
                    <p className="text-lg font-medium text-gray-900">Journey</p>
                    <div className="mt-2">
                        <p><strong>Problems Faced:</strong> {project.problems}</p>
                        <p><strong>Solution:</strong> {project.solution}</p>
                        <p><strong>Personal Notes:</strong> {project.notes}</p>
                    </div>
                </div>

                <div className="mt-6">
                    <p className="text-lg font-medium text-gray-900">Team Members</p>
                    <ul className="mt-2 list-disc list-inside">
                        {project.members && project.members.map((member, index) => (
                            <li key={index}>{member}</li>
                        ))}
                    </ul>
                </div>

                <div className="mt-6">
                    <p className="text-lg font-medium text-gray-900">Photos</p>
                    <div className="mt-2 flex gap-2">
                        {project.images && project.images.map((img, idx) => (
                            <Image
                                key={idx}
                                src={img.url}
                                alt={`Project Photo ${idx + 1}`}
                                width={200}
                                height={200}
                                className="w-32 h-32 object-cover"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDisplay;
