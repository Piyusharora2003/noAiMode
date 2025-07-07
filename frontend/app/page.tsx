"use client";
import { useState } from "react";
import axios from "@/lib/axios";

import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";

import { SearchResult } from "../types/search";
import MainContainer from "@/components/MainContainer";
import Footer from "@/components/Footer";

export default function Home() {
  const [searchResults, setSearchResults] = useState<SearchResult[] | null>(
    null
  );

  const [errorInSearch, setErrorInSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    try {
      const response = await axios.post<SearchResult[]>("/search", { query });
      setSearchResults(response.data);
      setErrorInSearch(false);
    } catch (error) {
      console.error("Search failed:", error);
      setErrorInSearch(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="mx-auto h-full">
      <Navbar />
      <SearchBar onSearch={handleSearch} />
      <MainContainer
        results={searchResults}
        isLoading={isLoading}
        errorInSearch={errorInSearch}
      />
      <Footer />
    </main>
  );
}
