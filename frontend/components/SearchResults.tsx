import { SearchResult } from "../types/search";

interface Props {
  results: SearchResult[];
}

export default function SearchResults({ results }: Props) {
  return (
    <div className="p-4">
      {results.map((r, i) => (
        <div
          key={i}
          className="mb-4 p-4 border rounded shadow-sm bg-white dark:bg-gray-800"
        >
          <a
            href={r.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline text-lg"
          >
            {r.title}
          </a>
          <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
            {r.description}
          </p>
          <p className="text-xs text-gray-500 mt-1">Source: {r.domain}</p>
        </div>
      ))}
    </div>
  );
}
