// const {} = require("firebase/storage");
import {
    getDownloadURL,
    ref,
    uploadBytes,
    deleteObject,
} from "firebase/storage";
import { storage } from "./firebase.config";

const uploadImages = async (images, username, projectName) => {
    const url = [];

    for (const image of images) {
        if (!image) continue;

        const fileExtension = image.file.name.split(".").at(-1);
        const path = `media/${username}/${projectName}/image-${url.length}.${fileExtension}`;

        // console.log(path);
        const imageRef = ref(storage, path);
        await uploadBytes(imageRef, image.file);

        url.push(await getDownloadURL(imageRef));
        console.log("Image uploaded");
    }

    console.log("returning url");
    return url;
};

const uploadProfileImage = async (image, username) => {
    if (!image) return;

    const fileExtension = image.file.name.split(".").at(-1);
    const path = `media/${username}/profile.${fileExtension}`;

    // console.log(path);
    const imageRef = ref(storage, path);
    await uploadBytes(imageRef, image.file);

    const url = await getDownloadURL(imageRef);
    console.log("Image uploaded");
    return url;
};

async function deleteImage(path) {
    try {
        await deleteObject(ref(storage, path));
    } catch (e) {
        console.log(e);
    }
}

export { uploadImages, uploadProfileImage, deleteImage };
