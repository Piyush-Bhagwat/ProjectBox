import { auth } from "./firebase.config";
import {getAuth,GoogleAuthProvider, signInWithPopup} from "firebase/auth"

const provider = new GoogleAuthProvider()

export const loginWithGoogle = async () => {
    const res = await signInWithPopup(auth, provider);
    return res.user
}