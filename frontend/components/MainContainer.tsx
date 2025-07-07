import { SearchResult } from "@/types/search";
import SearchResults from "@/components/SearchResults";
import ServerFailure from "@/components/ServerFailure";
import Loader from "@/components/Loader";
import "./style.css";

type MainContainerProps = {
  isLoading: boolean;
  results: SearchResult[] | null;
  errorInSearch: boolean | null | undefined;
};

export default function MainContainer({
  isLoading,
  results,
  errorInSearch,
}: MainContainerProps) {
  return (
    <div className="main-container">
      {isLoading && <Loader />}
      {!isLoading && results && <SearchResults results={results} />}
      {!isLoading && errorInSearch && <ServerFailure />}
    </div>
  );
}
