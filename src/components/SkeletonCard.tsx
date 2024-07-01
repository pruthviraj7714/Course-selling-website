
 export function SkeletonCard() {
  return (
    <div className="flex flex-col justify-between  rounded-lg w-[300px] h-[340px] bg-white text-black shadow-xl dark:bg-gray-800 m-5">
    <div className="w-full h-[160px] bg-gray-300 rounded-t-lg animate-pulse dark:bg-gray-400"></div>
    <div className="px-4 py-3 space-y-2">
      <div className="h-6 bg-gray-300 rounded animate-pulse w-3/4 dark:bg-gray-400"></div>
      <div className="h-4 bg-gray-300 rounded animate-pulse w-1/2 dark:bg-gray-400"></div>
      <div className="h-4 bg-gray-300 rounded animate-pulse w-1/3 dark:bg-gray-400"></div>
      <div className="h-4 bg-gray-300 rounded animate-pulse w-1/4 dark:bg-gray-400"></div>
      <div className="flex justify-between items-center">
        <div className="h-6 bg-gray-300 rounded animate-pulse w-1/4 dark:bg-gray-400"></div>
        <div className="h-8 bg-gray-300 rounded animate-pulse w-1/3 dark:bg-gray-400"></div>
      </div>
    </div>
  </div>
  
  )
}