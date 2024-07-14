import React, { useState, useRef } from 'react';

interface RatingProps {
  initialRating?: number;
  maxRating?: number;
  bookId: string;
  onRatingChange: (bookId: string, rating: number) => void;
}

const Rating: React.FC<RatingProps> = ({
  initialRating = 0,
  maxRating = 5,
  bookId,
  onRatingChange,
}) => {
  const [currentRating, setCurrentRating] = useState(initialRating);
  const ratingRef = useRef<HTMLDivElement>(null);

  const updateRating = (rating: number) => {
    setCurrentRating(rating);
    onRatingChange(bookId, rating);
  };

  const highlightRating = (rating: number) => {
    const stars = ratingRef.current?.querySelectorAll('span');
    stars?.forEach((star, index) => {
      if (index < rating) {
        star.classList.add('text-yellow-500');
      } else {
        star.classList.remove('text-yellow-500');
      }
    });
  };

  return (
    <div ref={ratingRef}>
      <div className="rating flex items-center">
        {Array.from({ length: maxRating }, (_, index) => (
          <span
            key={index}
            className="text-gray-400 cursor-pointer"
            onClick={() => updateRating(index + 1)}
            onMouseOver={() => highlightRating(index + 1)}
            onMouseOut={() => highlightRating(currentRating)}
          >
            &#9733;
          </span>
        ))}
        <span className="ml-2">{currentRating}{currentRating > 0 && " Star"}</span>

      </div>
    </div>
  );
};

export default Rating;
