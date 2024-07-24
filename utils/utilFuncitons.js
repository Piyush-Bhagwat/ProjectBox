export const loginFromLocalStorage = () => {
    return localStorage.getItem("user");
}