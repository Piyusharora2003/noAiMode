import { StringUtils } from "@/helpers/StringUtils";
import { useState } from "react";

interface Props {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: Props) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) onSearch(input);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 sticky top-0 z-10 shadow flex justify-center"
      style={{ height: "75px" }}
    >
      <input
        type="text"
        className="border p-2 w-3/4 rounded mr-2 "
        placeholder="Enter your search..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={StringUtils.isEmpty(input)}
      >
        Search
      </button>
    </form>
  );
}
