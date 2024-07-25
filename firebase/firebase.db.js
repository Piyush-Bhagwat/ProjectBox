import { addDoc, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { db, userCollection } from "./firebase.config";

const userExistEmail = async (email) => {
    const q = query(userCollection, where("email", "==", email));
    const snapshot = await getDocs(q);

    return !snapshot.empty;
};

const createUser = async (data) => {
    await setDoc(doc(db, "users", data.username), data);
    console.log("error.................", data);
};

export { userExistEmail, createUser };
