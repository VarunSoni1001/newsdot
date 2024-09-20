import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);
    localStorage.setItem("theme", selectedTheme);
  };

  useEffect(() => {
    let localStorageTheme = localStorage.getItem("theme");
    if (localStorageTheme) {
      setTheme(localStorageTheme);
    } else {
      handleThemeChange(theme);
    }
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const themes = [
    { type: "Light", icon: <>&#9728;</>, value: "light" },
    { type: "Dark", icon: <>&#9790;</>, value: "dark" },
  ];

  return (
    <select
      value={theme}
      name="Theme"
      title="Change theme"
      onChange={(e) => handleThemeChange(e.target.value)}
      className={`p-1 rounded-lg bg-neutral-300 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-200 outline-none cursor-pointer transition-all dark:transition-all ease-in-out dark:ease-in-out duration-300 dark:duration-300 focus:outline-none mt-4 lg:mt-0`}
    >
      {themes?.map((theme, index) => (
        <option key={index} value={theme.value}>
          {theme.type}
        </option>
      ))}
    </select>
  );
};

export default ThemeSwitch;
