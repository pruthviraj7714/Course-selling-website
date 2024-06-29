"use client";

import axios from "axios";
import { ShoppingCartIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function () {
  const [pHistory, setPHistory] = useState<any[]>([]);

  const getPurchasedHistory = async () => {
    try {
      const res = await axios.get("/api/get-purchase-history");
      console.log(res.data);
      setPHistory(res.data.purchaseHistory);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getPurchasedHistory();
  }, []);

  return (
    <div className="h-screen bg-primary-foreground">
      <div className="h-24 flex bg-primary items-center px-24 font-bold text-4xl shadow-lg">
        Purchase History
      </div>
      <div className="bg-gray-50 flex items-center justify-center py-10 dark:bg-slate-800">
        <div className="container mx-auto p-6 bg-white dark:bg-slate-700 shadow-lg rounded-lg">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-200 dark:bg-slate-600">
                <th className="py-3 px-4 text-left font-semibold text-sm text-gray-700 dark:text-gray-300">
                  Course
                </th>
                <th className="py-3 px-4 text-left font-semibold text-sm text-gray-700 dark:text-gray-300">
                  Details
                </th>
                <th className="py-3 px-4 text-left font-semibold text-sm text-gray-700 dark:text-gray-300">
                  Transaction Id
                </th>
                <th className="py-3 px-4 text-left font-semibold text-sm text-gray-700 dark:text-gray-300">
                  Price
                </th>
                <th className="py-3 px-4 text-left font-semibold text-sm text-gray-700 dark:text-gray-300">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {pHistory.map((course) => (
                <tr
                  key={course.transactionId}
                  className="border-b hover:bg-gray-100 dark:hover:bg-slate-600 text-gray-900 dark:text-gray-200 transition-colors duration-150"
                >
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <ShoppingCartIcon />
                      <span>{course.courseName}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span>{course.purchaseDate}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="ml-2 text-xs text-gray-500 dark:text-gray-400 hidden lg:inline">
                      {course.transactionId}
                    </span>
                  </td>
                  <td className="py-3 px-4">{course.price}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        course.status === "completed"
                          ? "bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100"
                          : "bg-red-100 text-red-700 dark:bg-red-700 dark:text-red-100"
                      }`}
                    >
                      {course.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
