import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav
      className="p-4 flex justify-between items-center border-b"
      style={{ height: "70px" }}
    >
      <h1 className="text-xl font-bold">No-AI Mode</h1>
      <button
        className=" border-none text-2xl rounded cursor-pointer"
        onClick={toggleTheme}
      >
        {theme === "light" ? "🌙" : "☀️"}
      </button>
    </nav>
  );
}
