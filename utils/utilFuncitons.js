const getPostID = (username = "", projectName = "") => {
    return `${username.split(" ").join("-")}@${projectName
        .split(" ")
        .join("-")}`;
};

export { getPostID };
