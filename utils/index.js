export const getToken = () => {
  return localStorage.getItem("token");
};
export const getUser = () => {
  if (typeof window !== "undefined") {
    // Check if it's running in the browser
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }
  return null; // Return null if it's running server-side
};
export const getDarkMode = () => {
  if (typeof window !== "undefined") {
    // Check if it's running in the browser
    const darkMode = localStorage.getItem("darkMode");
    return darkMode ? JSON.parse(darkMode) : false;
  }
  return false; // Return null if it's running server-side
};
