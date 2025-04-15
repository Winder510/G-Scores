const SearchForm = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        User Registration
      </h2>
      <form className="space-y-4">
        <div>
          <label
            htmlFor="registration"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Registration Number
          </label>
          <div className="mt-1 flex">
            <input
              type="text"
              id="registration"
              className="flex-1 block w-full rounded-l-md border-gray-300 dark:border-gray-600 
                bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                shadow-sm focus:border-blue-500 focus:ring-blue-500 
                dark:focus:border-blue-400 dark:focus:ring-blue-400 sm:text-sm"
              placeholder="Enter registration number"
            />
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent 
                text-sm font-medium rounded-r-md text-white bg-blue-600 
                hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                dark:focus:ring-offset-gray-800"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
