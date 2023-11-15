import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, systemTheme } = useTheme();
  let localStorageTheme = "system";

  useEffect(() => {
    localStorageTheme = localStorage.getItem("theme");
    if (localStorageTheme) {
      setTheme(localStorageTheme);
    }
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const themes = [
    {
      type: "System",
      icon: systemTheme === "light" ? <>&#9728;</> : <>&#9790;</>,
      value: "system",
    },
    { type: "Light", icon: <>&#9728;</>, value: "light" },
    { type: "Dark", icon: <>&#9790;</>, value: "dark" },
  ];

  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);
    localStorage.setItem("theme", selectedTheme);
  };

  return (
    <select
      value={theme}
      name="Theme"
      title="Change theme"
      onChange={(e) => handleThemeChange(e.target.value)}
      className="p-1 rounded-lg bg-neutral-300 dark:bg-neutral-800 text-black dark:text-white outline-none cursor-pointer transition-all ease-in-out duration-300 focus:outline-none"
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
