import { useState } from "react";
import SearchForm from "../../components/SearchForm";
import { StudentScore } from "../../types";

const Search = () => {
  const [searchResults, setSearchResults] = useState<StudentScore | null>(null);

  return (
    <div className="space-y-6">
      <SearchForm setSearchResults={setSearchResults} />
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Detailed Scores
        </h2>
        {searchResults ? (
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(searchResults)
              .filter(([key]) => key !== "id" && key !== "registration_number")
              .map(([subject, score]) => (
                <div
                  key={subject}
                  className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    {subject.replace("_", " ").toUpperCase()}
                  </h3>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {score || "none"}
                  </p>
                </div>
              ))}
          </div>
        ) : (
          <p className="text-gray-600 dark:text-gray-300">
            Enter a registration number to view scores
          </p>
        )}
      </div>
    </div>
  );
};

export default Search;
