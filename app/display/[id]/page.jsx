"use client";
import ProjectDisplay from "@/components/ProjectDisplay";
import { getPostData, getPostFromProjectID } from "@/firebase/firebase.db";
import React, { useEffect, useState } from "react";

const ProjectPage = ({ params }) => {
    const [project, setProject] = useState(null);
    const projectID = params.id;

    useEffect(()=>{
        async function fetch(){
            const data = await getPostFromProjectID(projectID)
            console.log("ProjectID", projectID);
            setProject(data)
        }
        fetch()
    }, [])



    return (
        <div>
            <ProjectDisplay project={project}/>
        </div>
    );
};

export default ProjectPage;
