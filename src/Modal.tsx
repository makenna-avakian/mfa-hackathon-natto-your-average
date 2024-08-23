import React, { useState, useEffect } from "react";

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
];

interface ModalProps {
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ onClose }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<
    number | null
  >(null);

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
      }
    }
  };

  if (currentQuestionIndex === null) {
    return null;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-md">
        <h2 className="text-xl font-bold mb-4">{currentQuestion.question}</h2>
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
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};
