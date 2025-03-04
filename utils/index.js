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
    const storedMode = localStorage.getItem("darkMode");
    const isDark = storedMode === "true";
    if (isDark) {
      document.body.classList.add("dark-mode");
      document.documentElement.classList.add("dark");
    }
    return isDark;
  }
  return null; // Default to light mode if window is undefined
};
