"use client"

export default function ErrorBoundary({error} : {error : Error}) {
    return(
        <div className="text-red-400"> 
            {error.message}
        </div>
    )
}