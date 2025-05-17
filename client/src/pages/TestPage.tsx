import { useState, useEffect } from 'react';
import styled from 'styled-components';
import TestInformSection from '../features/test/TestInformSection';
import TestQuestionSection from '../features/test/TestQuestionSection';
import TestCompleteSection from '../features/test/TestCompleteSection';

import { fetchQuestions } from '../api/questions';
import type { Question } from '../api/questions';
import { useTestStore } from '../store/useTestStore';
import { formatAnswers } from '../api/report';

import Loading from '../components/Loading';
import Image from '../components/Image';
import cubeIcon from '../assets/icons/icon-cube.png';
import ringIcon from '../assets/icons/icon-ring.png';
import waveIcon from '../assets/icons/icon-wave.png';

const BackgroundFloatWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 0;
  overflow: hidden;
  img {
    position: absolute;
    pointer-events: none;
    z-index: 0;
  }
`;

export default function TestPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  const { addAnswer, resetAnswers, removeLastAnswer, answers } = useTestStore();

  useEffect(() => {
    resetAnswers();
    fetchQuestions()
      .then((data) => setQuestions(data))
      .catch((err) => {
        console.error(err);
        alert('질문 데이터를 불러올 수 없습니다.');
      })
      .finally(() => setLoading(false));
  }, []);

  const isComplete = currentIndex > questions.length;

  const handleAnswer = (value: string) => {
    const question = questions[currentIndex - 1];
    const selectedScore =
      value === question.answer01 ? question.answerScore01 : question.answerScore02;

    addAnswer({ qitemNo: question.qitemNo, answerScore: selectedScore });
    setDirection('forward');
    setCurrentIndex((prev) => prev + 1);
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (currentIndex === 0) return;
    removeLastAnswer();
    setDirection('backward');
    setCurrentIndex((prev) => prev - 1);
    setStep((prev) => prev - 1);
  };

  useEffect(() => {
    if (isComplete) {
      const formatted = formatAnswers(answers);
      console.log('✅ formatted answers string:', formatted);
    }
  }, [isComplete]);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      <BackgroundFloatWrapper>
        <Image
          src={waveIcon}
          alt="배경 웨이브"
          width="55%"
          motion="float"
          style={{ top: '-10%', left: '-5%' }}
        />
        <Image
          src={ringIcon}
          alt="배경 링"
          width="20%"
          motion="float"
          style={{ top: '75%', left: '25%' }}
        />
        <Image
          src={cubeIcon}
          alt="배경 큐브"
          width="15%"
          motion="float"
          style={{ bottom: '0%', right: '8%' }}
        />
      </BackgroundFloatWrapper>

      {loading ? (
        <Loading message="당신에게 맞는 질문을 준비 중이에요..." />
      ) : currentIndex === 0 ? (
        <TestInformSection onStart={() => setCurrentIndex(1)} />
      ) : !isComplete ? (
        <TestQuestionSection
          currentIndex={currentIndex - 1}
          onAnswer={handleAnswer}
          onBack={handleBack}
          step={step}
          direction={direction}
        />
      ) : (
        <TestCompleteSection answers={answers} />
      )}
    </div>
  );
}
