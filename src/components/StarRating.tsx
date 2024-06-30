import { BsFillStarFill, BsStarHalf } from 'react-icons/bs'; 

export const StarRating = ({ rating } : {rating : number}) => {
    const fullStars = rating; 
    const hasHalfStar = 5 - rating !== 0;

  return (
    <div className="star-rating flex justify-center lg:justify-start">
      {[...Array(fullStars)].map((_, index) => (
        <BsFillStarFill key={index} />
      ))}
      {hasHalfStar && <BsStarHalf key="half-star" />}
      {!fullStars && !hasHalfStar && <div>No ratings yet. Be the first!</div>}
    </div>
  );
};