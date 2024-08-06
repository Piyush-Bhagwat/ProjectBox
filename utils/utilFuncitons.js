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

export { getPostID, debounce, checkOnlineStatus };
