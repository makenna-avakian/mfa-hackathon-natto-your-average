import React, { useState, useEffect } from "react";
import { StarRating } from './Starrating';
import goldFrame from './assets/fancy-frame-transparent.png';

interface Question {
  question: string;
  options: string[];
}

const questions: Question[] = [
  {
    question: "What is your favorite Italian pasta?",
    options: ["Buccatini", "Farfalle", "Orecchiette", "Rigatoni", "Angel Hair"],
  },
  {
    question: "Do you like Natto?",
    options: ["Yes", "No", "Huh?"],
  },
  {
    question: "Favorite Dev?",
    options: ["Mak", "Wataru", "Brandon", "Tia"],
  }
];

interface ModalProps {
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ onClose }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<
    number | null
  >(null);
  const [rating, setRating] = useState(0);
  const [showRating, setShowRating] = useState(false);


  useEffect(() => {
    if (questions.length > 0) {
      setCurrentQuestionIndex(Math.floor(Math.random() * questions.length));
    }
  }, []);

  const handleNext = () => {
    if (currentQuestionIndex !== null && questions.length > 0) {
      questions.splice(currentQuestionIndex, 1);
      if (questions.length > 0) {
        setCurrentQuestionIndex(Math.floor(Math.random() * questions.length));
      } else {
        setCurrentQuestionIndex(null);
        setShowRating(true);
      }
    }
  };

  const handleRatingChange = (value: number) => {
    setRating(value);
  };

  if (showRating) {
    return <StarRating rating={rating} onRatingChange={handleRatingChange} onClose={onClose} />;
  }

  if (currentQuestionIndex === null) {
    return null;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div 
          className="relative flex items-center justify-center" 
          style={{ 
            backgroundImage: `url(${goldFrame})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            width: '600px', 
            height: '600px', 
          }}
        >
          <div 
            className="bg-white p-6 rounded-md shadow-md w-full h-full flex flex-col justify-between ml-6" 
            style={{ 
              maxWidth: '49%', 
              maxHeight: '69%',
            }}
          >
            <h2 className="text-xl font-bold mb-4 text-center">{currentQuestion.question}</h2>
            <div className="space-y-2">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  className="w-full px-4 py-2 text-left bg-gray-100 hover:bg-gray-200 rounded-md"
                  onClick={handleNext}
                >
                  {option}
                </button>
              ))}
            </div>
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 mx-auto"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };