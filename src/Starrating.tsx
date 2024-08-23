import React, { useState } from 'react';

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  onClose: () => void;
}

export const StarRating: React.FC<StarRatingProps> = ({ rating, onRatingChange, onClose }) => {
  const [hoveredStars, setHoveredStars] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const distanceFromTop = e.clientY - rect.top;
    const totalHeight = rect.height - 200;
    const starsToShow = Math.min(5, Math.max(1, Math.floor((distanceFromTop / totalHeight) * 5)));

    setHoveredStars(starsToShow);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-md" onMouseMove={handleMouseMove}>
        <h2 className="text-xl font-bold mb-4">How great are we?</h2>
        <div className="flex space-x-2 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              className={`text-3xl ${star <= Math.max(rating, hoveredStars) ? 'text-yellow-500' : 'text-gray-300'}`}
              onClick={() => onRatingChange(star)}
            >
              ★
            </button>
          ))}
        </div>
        <div className="flex justify-center mt-96">
          <button
            className=" bottom-0 mb-8 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            onClick={onClose}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
