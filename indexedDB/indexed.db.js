import { Dexie } from "dexie";

const idb = new Dexie("projectsBoxDB");
idb.version(1).stores({
    projects:
        "++id, auther, projectName, formalName, date, category, about, status, tech, problems, solution, notes, members, githubLink, linkedinLink,hostedLink, photos, tags, likes, comments, visibility, createdAt",
});

const saveProjectsToIDB = async (projects) => {
    try {
        // Clear the existing projects in IndexedDB
        await idb.projects.clear();
        // Bulk add the new projects
        await idb.projects.bulkAdd(projects);
        console.log("Projects saved to IndexedDB successfully");
    } catch (error) {
        console.error("Failed to save projects to IndexedDB:", error);
    }
};

const getAllProjectIDB = async () => {
    try {
        const projects = await idb.projects.orderBy("createdAt").toArray();
        console.log("Projects fetched from IndexedDB:", projects);
        return projects.reverse();
    } catch (error) {
        console.error("Failed to fetch projects from IndexedDB:", error);
        return [];
    }
};

const getAllPostsByCategoryIDB = async (category) => {
    try {
        const projects = await idb.projects
            .where("category")
            .equals(category)
            .toArray();
        return projects;
    } catch (error) {
        console.error("Failed to fetch projects from IndexedDB:", error);
        return [];
    }
};

export { saveProjectsToIDB, getAllProjectIDB, getAllPostsByCategoryIDB };
