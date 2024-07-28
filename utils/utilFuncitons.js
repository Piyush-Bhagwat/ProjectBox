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

export { getPostID, debounce };
