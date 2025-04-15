import SearchForm from "../../components/SearchForm";

const Search = () => {
  return (
    <div className="space-y-6">
      <SearchForm />
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Detailed Scores
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Detailed view of search scores here!
        </p>
      </div>
    </div>
  );
};

export default Search;
