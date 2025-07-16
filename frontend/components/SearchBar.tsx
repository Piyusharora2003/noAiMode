import { StringUtils } from "@/helpers/StringUtils";
import { useDebounce } from "@/helpers/useDebounce";
import axios from "@/lib/axios";
import { useEffect, useState } from "react";

interface Props {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: Props) {
  const [input, setInput] = useState<string>("");
  const [searchSuggestions, setsearchSuggestions] = useState<string[]>([]);
  const debouncedInput = useDebounce(input);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) onSearch(input);
  };

  const getNewSuggestions = async (): Promise<string[]> => {
    const getSuggestionsFromApi = async (query: string): Promise<string[]> => {
      try {
        const response = await axios.post("/suggest", { query });
        return response?.data?.suggestions ?? [];
      } catch (error) {
        console.error("Search failed:", error);
        return [];
      }
    };
    let suggestions = await getSuggestionsFromApi(debouncedInput);
    return suggestions;
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (debouncedInput) {
        const suggestions: string[] = await getNewSuggestions();
        console.log("suggestion: ", suggestions);

        if (suggestions && suggestions.length > 0) {
          setsearchSuggestions(suggestions);
          console.log("search suggestions updated to ", suggestions);
        }
      }
    };
    fetchSuggestions();
  }, [debouncedInput]);

  return (
    <div className="search-bar-container">
      <form
        onSubmit={handleSubmit}
        className="p-4 sticky top-0 z-10  shadow flex justify-center"
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
        <div className="suggestion-box">
          {searchSuggestions.map((suggestion) => {
            return <>{suggestion}</>;
          })}
        </div>
      </form>
    </div>
  );
}
