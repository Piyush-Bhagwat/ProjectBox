import {
    addDoc,
    arrayRemove,
    arrayUnion,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    limit,
    orderBy,
    query,
    setDoc,
    updateDoc,
    where,
} from "firebase/firestore";
import { db, userCollection } from "./firebase.config";
import { getPathFromFirebaseStorageUrl, getPostID } from "@/utils/utilFuncitons";
import { deleteImage, uploadProfileImage } from "./direbase.storage";

const userExistEmail = async (email) => {
    const q = query(userCollection, where("email", "==", email));
    const snapshot = await getDocs(q);

    return !snapshot.empty;
};

const createUser = async (data) => {
    await setDoc(doc(db, "users", data.username), data);
    console.log("error.................", data);
};

const storeToBox = async (username, name) => {
    await addDoc(collection(db, "users", username, "box"), {
        name,
        time: Date.now(),
    });
};

const getUser = async (email) => {
    const q = query(userCollection, where("email", "==", email));
    const snapshot = await getDocs(q);

    return snapshot.docs[0].data();
};

const getUserByUsername = async (username) => {
    const ref = doc(db, "users", username);
    const snap = await getDoc(ref);

    return snap.data();
};

const getbox = async (username) => {
    if (!username) return;

    try {
        const boxData = [];
        const boxRef = collection(db, "users", username, "box");
        const snapshot = await getDocs(boxRef);

        const postIDs = snapshot.docs?.map((data) => {
            return { ...data.data(), entryID: data.id };

        });

        for (const id of postIDs) {
            const post = await getPostData(id.name);
            boxData.push({ ...post, entryID: id.entryID });
        }

        return boxData;
    } catch (error) {
        console.warn("Fetching Box Contents Error", error);
    }
};

const checkProjectNameAvalibale = async (username, id) => {
    try {
        const colRef = collection(db, "users", username, "box");
        const q = query(colRef, where("name", "==", id));
        const snapshot = await getDocs(q);

        return snapshot.empty;
    } catch (er) {
        console.log(er);
    }
};

const checkUsernameAvalible = async (username) => {
    try {
        const colRef = collection(db, "users");
        const q = query(colRef, where("username", "==", username));
        const snapshot = await getDocs(q);

        return snapshot.empty;
    } catch (er) {
        console.log(er);
    }
};

const searchUserNames = async (searchTerm) => {
    const q = query(
        userCollection,
        where("lowerUsername", ">=", searchTerm),
        where("lowerUsername", "<", searchTerm + "\uf8ff")
    );
    const snap = await getDocs(q);

    const usernames = snap.docs.map((doc) => {
        return {
            username: doc.data().username,
            url: doc.data().photoURL,
            name: doc.data().name,
        };
    });
    return usernames;
};

const getUserPhoto = async (username) => {
    const ref = doc(db, "users", username);

    const snap = await getDoc(ref);

    if (snap) {
        return snap.data().photoURL;
    }
    return null;
};

const updateFeild = async (username, feild, value) => {
    const docRef = doc(db, "users", username);
    // console.log("updated thiss", username, {[feild]: value});
    await updateDoc(docRef, { [feild]: value });
};

const updateProfilePhoto = async (username, image) => {
    const url = await uploadProfileImage(image, username);

    await updateFeild(username, "photoURL", url);

    return url;
};

// -----------------Post---------------------------

const uploadPost = async (data) => {
    try {
        const postID = getPostID(data.auther, data.projectName);
        const pathToPost = `posts/${postID}`;
        const postRef = doc(db, pathToPost);
        console.log("upload form", data);
        await setDoc(postRef, data);
        console.log("upload finished");
        await storeToBox(data.auther, postID);
        return pathToPost;
    } catch (er) {
        console.warn("error uploading post");
    }
};

const getAllPosts = async () => {
    const posts = [];
    const ref = collection(db, "posts");
    const q = query(ref, orderBy("createdAt"));
    const snap = await getDocs(q);
    snap.docs.forEach((doc) => posts.push({ ...doc.data(), id: doc.id }));
    return posts.reverse();
};

const getAllPostsByCategory = async (category) => {
    const postsRef = collection(db, "posts");
    const q = query(postsRef, where("category", "==", category), orderBy("createdAt"), limit(100));
    const querySnapshot = await getDocs(q);
    const posts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    return posts;
};

const getPostData = async (id) => {
    try {
        const postRef = doc(db, "posts", id);
        const snap = await getDoc(postRef);

        return { ...snap.data(), id: snap.id };
    } catch (er) {
        console.warn("error getting post data", id, er);
    }
};

const getPostFromProjectID = async (projectID = "") => {
    projectID = decodeURIComponent(projectID);

    const path = `posts/${projectID}`;
    const ref = doc(db, path);
    const snap = await getDoc(ref);

    if (snap.data()) {
        console.info("project found:", snap.data());
        return { ...snap.data(), id: snap.id };
    }

    console.warn("Project not found with ID:", projectID);
};

const getUserProjects = async (email) => {
    try {
        const userSnapshot = await getDoc(
            query(userCollection, where("email", "==", email))
        );

        if (userSnapshot.empty) {
            throw new Error("User not found");
        }

        const username = userSnapshot.data().username;
        const boxRef = collection(db, "users", username, "box");
        const snapshot = await getDocs(boxRef);

        const projects = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        return projects;
    } catch (error) {
        console.error("Error fetching user projects:", error);
        return [];
    }
};

const likeProject = async (projectID, username) => {
    const projRef = doc(db, "posts", projectID);
    await updateDoc(projRef, {
        likes: arrayUnion(username),
    });
};

const unLikeProject = async (projectID, username) => {
    const projRef = doc(db, "posts", projectID);
    await updateDoc(projRef, {
        likes: arrayRemove(username),
    });
};

const addComment = async (projectID, username, comment) => {
    const projRef = doc(db, "posts", projectID);
    await updateDoc(projRef, {
        comments: arrayUnion({ comment, username }),
    });
};

const deleteProject = async (projectID, category, entryID) => {
    console.log("id to del:", projectID, category);

    const project = (await getDoc(doc(db, "posts", projectID))).data();

    for (const p of project?.photos) {
        const link = getPathFromFirebaseStorageUrl(p)
        console.log("link ", link);

        await deleteImage(link)
    }

    console.warn("deleting project: ", projectID, "EntryID: ", entryID);

    await deleteDoc(doc(db, "posts", projectID));
    await deleteDoc(doc(db, "users", project.auther, "box", entryID));
    console.info("project deleted");
};

async function migratePosts() {
  const oldPostsRef = collection(db, "posts", "india", "web");
  const querySnapshot = await getDocs(oldPostsRef);

  for (const docSnap of querySnapshot.docs) {
    const postData = docSnap.data();
    const postId = docSnap.id;

    // Create new doc directly under 'posts'
    const newPostRef = doc(db, "posts", postId);
    await setDoc(newPostRef, postData);

    // Optional: delete old nested doc
    // await deleteDoc(doc(db, "posts", "India", "web", postId));

    console.log(`Migrated post: ${postId}`);
  }

  console.log("✅ Migration complete!");
}

export {
    userExistEmail,
    migratePosts,
    createUser,
    getbox,
    getUser,
    getUserByUsername,
    updateFeild,
    updateProfilePhoto,
    deleteProject,
    uploadPost,
    getAllPosts,
    getAllPostsByCategory,
    getPostData,
    getPostFromProjectID,
    checkProjectNameAvalibale,
    checkUsernameAvalible,
    getUserProjects,
    searchUserNames,
    getUserPhoto,
    likeProject,
    unLikeProject,
    addComment,
};
