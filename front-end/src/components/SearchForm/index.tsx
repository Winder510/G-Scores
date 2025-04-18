import { useState, FormEvent } from "react";
import axios from "../../config/axios.config";
import toast from "react-hot-toast";
import { IBackendRes, StudentScore } from "../../types";

interface SearchFormProps {
  setSearchResults: (results: any) => void;
}

const SearchForm = ({ setSearchResults }: SearchFormProps) => {
  const [registrationNumber, setRegistrationNumber] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.get<IBackendRes<StudentScore>>(
        `/student/find/${registrationNumber}`
      );

      if (response && response.data) {
        console.log("🚀 ~ handleSubmit ~ response:", response);
        const data = response.data;
        setSearchResults(data);
        toast.success("Student data found successfully!");
      } else {
        // @ts-ignore
        toast.error(response?.message || "No student data found");
      }
    } catch (error: any) {
      console.error("Error fetching student data:", error);
      setSearchResults(null);
      toast.error("Failed to fetch student data");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 max-w-md mx-auto transition-all duration-300">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100 tracking-tight">
        Search Student
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="registration"
            className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2"
          >
            Registration Number
          </label>
          <div className="relative flex items-center">
            <input
              type="text"
              id="registration"
              value={registrationNumber}
              onChange={(e) => setRegistrationNumber(e.target.value)}
              className="flex-1 block w-full rounded-l-lg border border-gray-200 dark:border-gray-700 
                bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 
                py-2.5 px-4 shadow-sm focus:ring-2 focus:ring-blue-500 
                dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 
                sm:text-sm transition-colors duration-200 placeholder-gray-400 dark:placeholder-gray-500"
              placeholder="Enter registration number"
              required
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center px-4 py-2.5 border border-transparent 
                text-sm font-medium rounded-r-lg text-white bg-blue-600 
                hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                dark:focus:ring-offset-gray-900 transition-colors duration-200
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Searching..." : "Search"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
