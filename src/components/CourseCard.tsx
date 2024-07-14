import Link from "next/link";

const CourseCard = ({
  title,
  thumbnail,
  studentsEnrolledCount,
  duration,
  price,
  rating,
  category,
  id,
}: {
  title: string;
  thumbnail: string;
  studentsEnrolledCount: number;
  duration: string;
  price: number;
  rating: number;
  category: string;
  id: string;
}) => {
  return (
    <Link
      href={`/courses/${category}/${id}`}
      className="flex flex-col justify-between border rounded-lg w-[300px] h-[340px] bg-white text-black shadow-xl border-black transform transition-transform hover:scale-105 dark:bg-gray-800"
    >
      <img
        className="w-full h-[160px] object-cover rounded-t-lg"
        src={thumbnail}
        alt={title}
      />
      <div className="px-4 py-3 space-y-2">
        <h1 className="font-semibold text-xl text-gray-800 truncate dark:text-white">{title}</h1>
        <h4 className="font-medium text-sm text-gray-600 dark:text-white">{studentsEnrolledCount}+ Students Enrolled</h4>
        <p className="text-gray-600 dark:text-white">{duration} total hours</p>
        <p className="text-gray-600 dark:text-white">Rating: {rating}</p>
        <div className="flex justify-between items-center">
          <span className="font-bold text-lg text-green-600">₹{price}</span>
          <button className="bg-blue-500 text-white px-3 py-1 rounded-md shadow-sm transition-transform transform hover:scale-105">
            View
          </button>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
