"use client"

import axios from "axios"



export default function ({params} : { params : any}) {
    console.log(params)


    const purchaseCoures = async() => {
        try {
            const res = await axios.post('/api/purchase-course', {
                courseId : params.courseId
            })
            alert("Course purchased successfully")
            
        } catch (error : any) {
            console.log(error.message);
        }
        
    }

    return <div className="h-screen bg-gradient-to-t from-slate-800 to-slate-950">
        <button className="bg-white text-black font-bold" onClick={purchaseCoures}>
            Buy Course
        </button>

    </div>

}