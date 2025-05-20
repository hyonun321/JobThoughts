import { useState, useEffect } from 'react';
import TestInformSection from '@/features/test/TestInformSection';
import TestQuestionSection from '@/features/test/TestQuestionSection';
import TestCompleteSection from '@/features/test/TestCompleteSection';
import { fetchQuestions } from '@/api/questions';
import type { Question } from '@/api/questions';
import { useTestStore } from '@/store/useTestStore';
import Loading from '@/components/Loading';
import Image from '@/components/Image';
import cubeIcon from '@/assets/icons/icon-cube.png';
import ringIcon from '@/assets/icons/icon-ring.png';
import waveIcon from '@/assets/icons/icon-wave.png';
import { BackgroundFloatWrapper, LoadingWrapper } from './styles';

export default function TestPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  const { addAnswer, resetAnswers, removeLastAnswer } = useTestStore();

  useEffect(() => {
    resetAnswers();
    fetchQuestions()
      .then((data) => setQuestions(data))
      .catch((err) => {
        console.error(err);
        alert('질문 데이터를 불러올 수 없습니다.');
      })
      .finally(() => setLoading(false));
  }, [resetAnswers]);

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

  return (
    <div style={{ position: 'relative', minHeight: '100vh', height: '100lvh', overflow: 'hidden' }}>
      <BackgroundFloatWrapper>
        <Image
          src={waveIcon}
          alt="배경 웨이브"
          width="clamp(450px, 55vw, 1100px)"
          motion="float"
          className="wave"
          style={{
            top: 'calc(-5vw)', // 화면 작아지면 더 들어가고 커지면 살짝 튀어나옴
          }}
        />
        <Image
          src={ringIcon}
          alt="배경 링"
          width="clamp(200px, 20vw, 25vw)"
          motion="float"
          className="ring"
        />
        <Image
          src={cubeIcon}
          alt="배경 큐브"
          width="clamp(170px, 15vw, 288px)"
          motion="float"
          className="cube"
          style={{
            bottom: 'clamp(25%,5%,5%)',
          }}
        />
      </BackgroundFloatWrapper>

      {loading ? (
        <LoadingWrapper>
          <Loading message="당신에게 맞는 질문을 준비 중이에요..." />
        </LoadingWrapper>
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
        <TestCompleteSection />
      )}
    </div>
  );
}
