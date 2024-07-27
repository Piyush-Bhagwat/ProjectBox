"use client";
import Image from "next/image";

const ProjectDisplay = ({ project }) => {
    if (!project) {
        return (
            <div className="flex items-center justify-center h-screen bg-black">
                <div className="text-white text-lg">Loading...</div>
            </div>
        );
    }

    const photoUrl = (project.photos && project.photos.length > 0) 
    ? project.photos[0] 
    : "https://via.placeholder.com/480";

    return (
        <div className="p-5 text-white">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
                
                <div>
                    <h1 className="text-[2em] text-neutral-200 md:text-[3em] font-black mt-2 mb-10">{project.projectName}</h1>
                    <div className="mt-6">
                        <Image
                            src={photoUrl}
                            alt={project.projectName}
                            width={600}
                            height={400}
                            className="w-full aspect-video object-cover rounded-lg"
                        />
                    </div>
                    <div className="mt-6">
                        <p className="text-base font-semibold leading-7 text-white">Description</p>
                        <p className="mt-1 text-sm leading-6 text-gray-300">{project.about}</p>
                    </div>

                    {(project.githubLink || project.hostedLink || project.twitterLink || project.linkedLink) && (
                    <div className="mt-6">
                        <p className="text-base font-semibold leading-7 text-white">Social Links</p>
                        <ul className="mt-2 list-none flex space-x-4">
                            {project.githubLink && (
                                <li>
                                    <a
                                        href={project.githubLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center space-x-2"
                                    >
                                        <svg
                                className="w-5 h-5 fill-current"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M12.026 2C7.13295 1.99937 2.96183 5.54799 2.17842 10.3779C1.395 15.2079 4.23061 19.893 8.87302 21.439C9.37302 21.529 9.55202 21.222 9.55202 20.958C9.55202 20.721 9.54402 20.093 9.54102 19.258C6.76602 19.858 6.18002 17.92 6.18002 17.92C5.99733 17.317 5.60459 16.7993 5.07302 16.461C4.17302 15.842 5.14202 15.856 5.14202 15.856C5.78269 15.9438 6.34657 16.3235 6.66902 16.884C6.94195 17.3803 7.40177 17.747 7.94632 17.9026C8.49087 18.0583 9.07503 17.99 9.56902 17.713C9.61544 17.207 9.84055 16.7341 10.204 16.379C7.99002 16.128 5.66202 15.272 5.66202 11.449C5.64973 10.4602 6.01691 9.5043 6.68802 8.778C6.38437 7.91731 6.42013 6.97325 6.78802 6.138C6.78802 6.138 7.62502 5.869 9.53002 7.159C11.1639 6.71101 12.8882 6.71101 14.522 7.159C16.428 5.868 17.264 6.138 17.264 6.138C17.6336 6.97286 17.6694 7.91757 17.364 8.778C18.0376 9.50423 18.4045 10.4626 18.388 11.453C18.388 15.286 16.058 16.128 13.836 16.375C14.3153 16.8651 14.5612 17.5373 14.511 18.221C14.511 19.555 14.499 20.631 14.499 20.958C14.499 21.225 14.677 21.535 15.186 21.437C19.8265 19.8884 22.6591 15.203 21.874 10.3743C21.089 5.54565 16.9181 1.99888 12.026 2Z"></path>
                            </svg>
                                    </a>
                                </li>
                            )}
                            {project.hostedLink && (
                                <li>
                                    <a
                                        href={project.hostedLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center space-x-2"
                                    >
                                         <svg
                                className="w-5 h-5 fill-current"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M21 5H3C1.34315 5 0 6.34315 0 8V16C0 17.6569 1.34315 19 3 19H21C22.6569 19 24 17.6569 24 16V8C24 6.34315 22.6569 5 21 5ZM3 7H21C21.5523 7 22 7.44772 22 8V16C22 16.5523 21.5523 17 21 17H3C2.44772 17 2 16.5523 2 16V8C2 7.44772 2.44772 7 3 7ZM12 13C10.3431 13 9 14.3431 9 16C9 17.6569 10.3431 19 12 19C13.6569 19 15 17.6569 15 16C15 14.3431 13.6569 13 12 13ZM12 17C11.4477 17 11 16.5523 11 16C11 15.4477 11.4477 15 12 15C12.5523 15 13 15.4477 13 16C13 16.5523 12.5523 17 12 17ZM4 10H8V11H4V10ZM4 12H8V13H4V12ZM16 10H20V11H16V10ZM16 12H20V13H16V12Z" fill="currentColor"/>
                            </svg>
                                    </a>
                                </li>
                            )}
                            {project.twitterLink && (
                                <li>
                                    <a
                                        href={project.twitterLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center space-x-2"
                                    >
                                       <svg
                                className="w-5 h-5 fill-current"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M23.643 4.937c-.885.393-1.834.656-2.83.775 1.018-.61 1.797-1.572 2.164-2.72-.951.564-2.003.973-3.127 1.195-.896-.957-2.175-1.557-3.594-1.557-2.725 0-4.939 2.214-4.939 4.937 0 .386.043.762.127 1.124-4.103-.205-7.74-2.17-10.2-5.15-.426.732-.671 1.58-.671 2.487 0 1.71.87 3.21 2.19 4.091-.807-.026-1.568-.248-2.23-.616v.062c0 2.394 1.701 4.384 3.953 4.839-.414.113-.849.173-1.294.173-.316 0-.626-.031-.928-.089.628 1.961 2.448 3.392 4.6 3.428-1.685 1.32-3.807 2.107-6.107 2.107-.396 0-.787-.023-1.175-.068 2.179 1.397 4.767 2.21 7.557 2.21 9.067 0 14.023-7.52 14.023-14.033 0-.213-.005-.426-.015-.637.961-.692 1.8-1.56 2.46-2.548l-.047-.02z"/>

                            </svg>
                                    </a>
                                </li>
                            )}
                            {project.linkedLink && (
                                <li>
                                    <a
                                        href={project.linkedLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center space-x-2"
                                    >
                                         <svg
                                className="w-5 h-5 fill-current"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M20.447 20.452H16.8V14.732C16.8 13.55 16.788 12.042 15.207 12.042C13.615 12.042 13.185 13.248 13.185 14.748V20.452H9.527V8.232H13.11V9.636H13.166C13.738 8.699 15.032 7.8 16.867 7.8C19.849 7.8 20.447 9.91 20.447 12.957V20.452ZM5.394 7.087C4.302 7.087 3.546 7.853 3.546 9.038C3.546 10.223 4.302 10.989 5.394 10.989C6.476 10.989 7.232 10.223 7.232 9.038C7.232 7.853 6.476 7.087 5.394 7.087ZM6.638 20.452H4.15V8.232H6.638V20.452ZM22 0H2C0.897 0 0 0.897 0 2V22C0 23.103 0.897 24 2 24H22C23.103 24 24 23.103 24 22V2C24 0.897 23.103 0 22 0ZM22 22H2V2H22V22Z" fill="currentColor"/>
                            </svg>
                                    </a>
                                </li>
                            )}
                            {project.youtubeLink && (
                                <li>
                                    <a
                                        href={project.youtubeLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center space-x-2"
                                    >
                                        <svg
                                className="w-5 h-5 fill-current"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                               <path d="M23.498 6.186c-.2-1.2-1.05-2.13-2.24-2.332C19.142 3.2 12.002 3.2 12.002 3.2s-7.14 0-9.257.654C2.513 3.958 1.664 4.888 1.464 6.088.968 8.53.968 12 0 12s0 3.47.464 5.912c.2 1.2 1.05 2.13 2.24 2.332C4.861 20.8 12.002 20.8 12.002 20.8s7.14 0 9.257-.654c1.19-.202 2.04-1.132 2.24-2.332.466-2.442.466-5.912.466-5.912s0-3.47-.466-5.912zM9.798 15.544V8.456l6.147 3.544-6.147 3.544z" fill="currentColor"/>
                            </svg>
                                    </a>
                                </li>
                            )}
                        </ul>
                    </div>
                    )}
            </div>
                <div>
                    <div className="mt-6">
                        <p className="text-base font-semibold leading-7 text-white">Details</p>
                        <div className="mt-1 text-sm leading-6 text-gray-300">
                            <p><strong>Category:</strong> {project.category}</p>
                            <p><strong>Status:</strong> {project.status}</p>
                            <p><strong>Technologies:</strong> {project.tech}</p>
                            <p><strong>Tags:</strong> {project.tags}</p>
                            <p><strong>Date:</strong> {project.date}</p>
                        </div>
                    </div>

                   

                    <div className="mt-6">
    <p className="text-base font-semibold leading-7 text-white">Journey</p>
    <div className="mt-1 text-sm leading-6 text-gray-300">
        <p className="mb-2"><strong>Problems Faced:</strong> {project.problems}</p>
        <p className="mb-2"><strong>Solution:</strong> {project.solution}</p>
        <p className="mb-2"><strong>Personal Notes:</strong> {project.notes}</p>
    </div>
</div>


{project.members && project.members.length > 0 && (
                    <div className="mt-6">
                        <p className="text-base font-semibold leading-7 text-white">Team Members</p>
                        <ul className="mt-2 text-sm list-disc list-inside text-gray-300">
                            {project.members && project.members.map((member, index) => (
                                <li key={index}>{member}</li>
                            ))}
                        </ul>
                    </div>
                        )}
                </div>
            </div>

            <div className="mt-6 max-w-6xl mx-auto">

    <p className="text-base font-semibold leading-7 text-white">Photos</p>
    <div className="mt-2 flex flex-wrap gap-2">
        {project.photos && project.photos.map((img, idx) => (
            <Image
                key={idx}
                src={img}
                alt={`Project Photo ${idx + 1}`}
                width={150} 
                height={150} 
                className="w-[48%] aspect-square object-contain border-2 border-dashed rounded-md border-gray-300"
            />
        ))}
    </div>
</div>

</div>

    );
};

export default ProjectDisplay;
