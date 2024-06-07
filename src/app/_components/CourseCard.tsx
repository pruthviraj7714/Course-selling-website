import Link from "next/link"


const CourseCard = ({title, thumbnail, studentsEnrolledCount, duration, price, rating, category, id} : {
  title : string,
  thumbnail : string,
  studentsEnrolledCount : number,
  duration : string,
  price : number,
  rating : number,
  category : string,
  id : string;
}) => {
  return (
    <Link href={`/courses/${category}/${id}`} className="flex flex-col justify-center border w-[300px] h-[310px] bg-zinc-200 text-black  border-white shadow-md">
          <img className="w-full object-cover h-[160px]" src={thumbnail} alt={title} />
          <div className='px-3 py-2'>
            <h1 className="font-semibold text-lg text-wrap">{title}</h1>
            <h4 className="font-semibold text-sm">{studentsEnrolledCount}+ Students Enrolled</h4>
            <p className="text-black">{duration} total hours</p>
            <p className="text-black">{rating}+rating</p>
            <h1 className="font-bold text-lg">₹{price}</h1>
          </div>
    </Link>
  )
}

export default CourseCard