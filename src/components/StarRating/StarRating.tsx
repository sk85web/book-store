import StarIcon from '../Icons/StarIcon/StarIcon';
import './StarRating.css';

interface StarRatingProps {
  rating: string;
}

const totalStars = 5;

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  return (
    <ul className="stars-container">
      {Array.from({ length: totalStars }, (_, index) => {
        const isFilled = index < +rating;
        return (
          <li key={index} className="star-item">
            <StarIcon filled={isFilled} />
          </li>
        );
      })}
    </ul>
  );
};

export default StarRating;
