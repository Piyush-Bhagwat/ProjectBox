const getPostID = (username = "", projectName = "") => {
    return `${username.split(" ").join("-")}@${projectName
        .split(" ")
        .join("-")}`;
};
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const checkOnlineStatus = async () => {
    try {
        // Use a request that will fail when offline
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/posts/1",
            {
                method: "HEAD",
                cache: "no-cache",
            }
        );
        return response.ok;
    } catch (error) {
        console.log("you are not conencted.");
        return false;
    }
};

// Function to extract and decode the path from a Firebase Storage public URL
const getPathFromFirebaseStorageUrl = (url) => {
    // Find the index of '/o/' which marks the start of the object path
    const pathStartIndex = url.indexOf("/o/");
    if (pathStartIndex === -1) {
        console.error("Invalid Firebase Storage URL");
        return null;
    }

    // Get the substring starting from '/o/'
    const pathSubstring = url.substring(pathStartIndex + 3); // +3 to skip '/o/'

    // Find the index of the '?' which marks the end of the object path before query parameters
    const queryParamIndex = pathSubstring.indexOf("?");
    const encodedPath =
        queryParamIndex === -1
            ? pathSubstring // No query parameters, the whole substring is the path
            : pathSubstring.substring(0, queryParamIndex); // Path is before the query parameters

    // Decode the path
    try {
        // The path might contain slashes that were encoded as %2F, we need to decode them
        return decodeURIComponent(encodedPath.replace(/%2F/g, "/"));
    } catch (error) {
        console.error("Error decoding path:", error);
        return null;
    }
};

export {
    getPostID,
    debounce,
    checkOnlineStatus,
    getPathFromFirebaseStorageUrl,
};
