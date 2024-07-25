import {
    addDoc,
    arrayUnion,
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    setDoc,
    updateDoc,
    where,
} from "firebase/firestore";
import { db, userCollection } from "./firebase.config";
import { getPostID } from "@/utils/utilFuncitons";

const userExistEmail = async (email) => {
    const q = query(userCollection, where("email", "==", email));
    const snapshot = await getDocs(q);

    return !snapshot.empty;
};

const createUser = async (data) => {
    await setDoc(doc(db, "users", data.username), data);
    console.log("error.................", data);
};

const storeToBox = async (username, path) => {
    await addDoc(collection(db, "users", username, "box"), {
        path,
        time: Date.now(),
    });
};

const getUser = async (email) => {
    const q = query(userCollection, where("email", "==", email));
    const snapshot = await getDocs(q);

    return snapshot.docs[0].data();
};

const getbox = async (username) => {
    if (!username) return;

    try {
        const boxData = [];
        const boxRef = collection(db, "users", username, "box");
        const snapshot = await getDocs(boxRef);

        const postIDs = snapshot.docs?.map((data) => {
            return data.data();
        });

        for (const id of postIDs) {
            const post = await getPostData(id.path);
            boxData.push(post);
        }

        return boxData;
    } catch (error) {
        console.warn("Fetching Box Contents Error", error);
    }
};

// -----------------Post---------------------------

const uploadPost = async (data) => {
    try {
        const postID = getPostID(data.auther, data.projectName);
        const pathToPost = `posts/india/${data.category}/${postID}`;
        const postRef = doc(db, pathToPost);
        console.log("upload form", data);
        await setDoc(postRef, data);
        console.log("upload finished");
        await storeToBox(data.auther, pathToPost);
        return pathToPost;
    } catch (er) {
        console.warn("error uploading post");
    }
};

const getPostData = async (id) => {
    try {
        const postRef = doc(db, id);
        const snap = await getDoc(postRef);

        return snap.data();
    } catch (er) {
        console.warn("error getting post data", id, er);
    }
};

export { userExistEmail, createUser, getbox, getUser, uploadPost };
