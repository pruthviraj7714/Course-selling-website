export default function CourseSkeleton() {
  return (
    <div className="flex justify-center items-center p-10">
      <div className="border-2 border-black bg-white dark:bg-black rounded-lg shadow-lg w-8/12 py-10 px-8">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-10">
          <div className="flex flex-col space-y-6 text-center lg:text-left">
            <div className="h-6 bg-gray-300 rounded animate-pulse w-3/4 lg:w-80 my-1"></div>
            <div className="h-3 bg-gray-300 rounded animate-pulse w-full mb-10"></div>
            <div className="h-2 bg-gray-300 rounded animate-pulse w-1/3"></div>
       
            <div className="flex justify-center lg:justify-start">
              <div className="h-6 bg-gray-300 rounded animate-pulse w-20 mt-5"></div>
            </div>
            <div className="my-2 h-4 bg-gray-300 rounded animate-pulse w-1/3"></div>
            <div className="flex gap-2 justify-center lg:justify-start items-center">
              <div className="h-3 bg-gray-300 rounded animate-pulse w-2/3"></div>
            </div>
            <div className="flex gap-2 justify-center lg:justify-start items-center">
              <div className="h-2 bg-gray-300 rounded animate-pulse w-1/4"></div>
            </div>
            <div className="flex gap-2 justify-center lg:justify-start items-center">
              <div className="h-2 bg-gray-300 rounded animate-pulse w-8/12"></div>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div className="border-2 border-white rounded-lg w-[350px] h-[230px] bg-gray-300 animate-pulse"></div>
          </div>
        </div>
        <div className="flex justify-center items-center mt-10">
          <div className="flex flex-col lg:flex-row justify-between items-center w-full gap-6">
            <div className="h-12 bg-gray-300 rounded animate-pulse w-full lg:w-auto"></div>
            <div className="h-12 bg-gray-300 rounded animate-pulse w-full lg:w-auto"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
