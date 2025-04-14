import SearchForm from "../../components/SearchForm";

const Search = () => {
  return (
    <div className="space-y-6">
      <SearchForm />
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Detailed Scores</h2>
        <p className="text-gray-600">Detailed view of search scores here!</p>
      </div>
    </div>
  );
};

export default Search;
