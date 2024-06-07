"use client"

import axios from "axios";
import { getSession } from "next-auth/react"
import { useEffect, useState } from "react";



export const Purchased_Courses =async() => {

    const [Purchased_Courses, setPurchased_Courses] = useState([]);
    const session = await getSession();
    
    if(!session || !session.user) {
        alert("User not found");
    }

    // useEffect(() => {
        
    //     const getCourses = async () => {
    //         session?.user..
    //     }


    // }, [])

    


    return (
    <div>

    </div>
  )
}

