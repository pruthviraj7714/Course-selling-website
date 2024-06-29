"use client"

import axios from "axios";
import { useEffect, useState } from "react";

export default function() {
    const [courses, setCourses] = useState([]);

    const getPurchasedHistory = async () => {
        try {
          const res = await axios.get('/api/get-purchase-history');
          console.log(res.data);
        } catch (error : any) {
          console.log(error.message);
        }
      }

      useEffect(() => {
        getPurchasedHistory();
      }, []);

    return (
        <div className="h-screen bg-white dark:bg-gradient-to-r dark:from-slate-700 dark:to-slate-900">
      <div className="h-24 flex bg-black text-white  dark:bg-white dark:text-black items-center px-24 font-bold text-4xl font-serif">
        Purchase history
      </div>
    </div>
    )
}