import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { IBackendRes, ScoreLevel, ScoreStatistics } from "../../types";
import axios from "../../config/axios.config";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface SubjectStatistics {
  [subject: string]: ScoreLevel;
}

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
      labels: {
        font: {
          size: 12,
        },
      },
    },
    title: {
      display: true,
      text: "Score Distribution by Subject",
      font: {
        size: 16,
        weight: "bold",
      },
      padding: {
        top: 10,
        bottom: 20,
      },
    },
    tooltip: {
      enabled: true,
      bodyFont: {
        size: 12,
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: "Number of Students",
        font: {
          size: 14,
        },
      },
      ticks: {
        font: {
          size: 12,
        },
      },
    },
    x: {
      title: {
        display: true,
        text: "Subjects",
        font: {
          size: 14,
        },
      },
      ticks: {
        font: {
          size: 10,
          autoSkip: true,
          maxRotation: 45,
          minRotation: 0,
        },
      },
    },
  },
};

const Reports = () => {
  const [statistics, setStatistics] = useState<SubjectStatistics | null>(null);
  const subjects = [
    "math",
    "literature",
    "foreign_language",
    "physics",
    "chemistry",
    "biology",
    "history",
    "geography",
    "civic_education",
  ];

  const formatSubjectName = (subject: string) => {
    return subject
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get<IBackendRes<ScoreStatistics>>(
          "student/statistics"
        );
        if (response && response.data) {
          // @ts-ignore
          setStatistics(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch statistics:", error);
      }
    };
    fetchStatistics();
  }, []);

  const chartData = {
    labels: subjects.map(formatSubjectName),
    datasets: [
      {
        label: "Excellent (≥8)",
        data: subjects.map((subject) => statistics?.[subject]?.[">=8"] || 0),
        backgroundColor: "rgba(53, 162, 235, 0.8)",
      },
      {
        label: "Good (6-8)",
        data: subjects.map((subject) => statistics?.[subject]?.["6-8"] || 0),
        backgroundColor: "rgba(75, 192, 192, 0.8)",
      },
      {
        label: "Average (4-6)",
        data: subjects.map((subject) => statistics?.[subject]?.["4-6"] || 0),
        backgroundColor: "rgba(255, 206, 86, 0.8)",
      },
      {
        label: "Poor (<4)",
        data: subjects.map((subject) => statistics?.[subject]?.["<4"] || 0),
        backgroundColor: "rgba(255, 99, 132, 0.8)",
      },
    ],
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Score Distribution Report
      </h1>
      {statistics ? (
        <div className="w-full h-[600px]">
          <Bar options={options as any} data={chartData} />
        </div>
      ) : (
        <div className="flex items-center justify-center h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      )}
    </div>
  );
};

export default Reports;
