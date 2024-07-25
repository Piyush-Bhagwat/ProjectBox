const getPostID = (username = "", projectName = "") => {
    return `${username.replace(" ", "-")}@${projectName.replace(" ", "-")}`;
};

export { getPostID };
