import { useEffect, useState } from "react";
import axios from "../../config/axios.config";
import { IBackendRes, TopStudent } from "../../types";

const TopStudents = () => {
  const [topStudents, setTopStudents] = useState<TopStudent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTopStudents = async () => {
      try {
        const response = await axios.get<IBackendRes<TopStudent[]>>(
          "student/top-group-a"
        );
        if (response.data) {
          const data = response.data;
          setTopStudents(data as any);
        }
      } catch (error) {
        console.error("Failed to fetch top students:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopStudents();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-center h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
        Top 10 Students - Group A Subjects
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="p-3 text-left font-semibold text-gray-900 dark:text-white">
                Rank
              </th>
              <th className="p-3 text-left font-semibold text-gray-900 dark:text-white">
                Registration No.
              </th>
              <th className="p-3 text-right font-semibold text-gray-900 dark:text-white">
                Math
              </th>
              <th className="p-3 text-right font-semibold text-gray-900 dark:text-white">
                Physics
              </th>
              <th className="p-3 text-right font-semibold text-gray-900 dark:text-white">
                Chemistry
              </th>
              <th className="p-3 text-right font-semibold text-gray-900 dark:text-white">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {topStudents.map((student, index) => (
              <tr
                key={student.registration_number}
                className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
              >
                <td className="p-3 text-gray-800 dark:text-gray-200">
                  #{index + 1}
                </td>
                <td className="p-3 text-gray-800 dark:text-gray-200">
                  {student.registration_number}
                </td>
                <td className="p-3 text-right text-gray-800 dark:text-gray-200">
                  {student.math.toFixed(2)}
                </td>
                <td className="p-3 text-right text-gray-800 dark:text-gray-200">
                  {student.physics.toFixed(2)}
                </td>
                <td className="p-3 text-right text-gray-800 dark:text-gray-200">
                  {student.chemistry.toFixed(2)}
                </td>
                <td className="p-3 text-right font-semibold text-gray-800 dark:text-gray-200">
                  {student.total.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopStudents;
