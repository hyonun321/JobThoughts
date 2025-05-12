import { useState } from 'react';
import TestInformSection from '../features/test/TestInformSection';
import TestQuestionSection from '../features/test/TestQuestionSection';
import TestCompleteSection from '../features/test/TestCompleteSection';
import testData from '../data/testData';

export default function TestPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const isComplete = currentIndex > testData.length;

  const handleAnswer = (value: string) => {
    setAnswers((prev) => [...prev, value]);
    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <>
      {currentIndex === 0 && <TestInformSection onStart={() => setCurrentIndex(1)} />}
      {!isComplete && currentIndex > 0 && (
        <TestQuestionSection currentIndex={currentIndex} onAnswer={handleAnswer} />
      )}
      {isComplete && <TestCompleteSection answers={answers} />}
    </>
  );
}
