import { useState } from 'react';
import styled from 'styled-components';
import TestInformSection from '../features/test/TestInformSection';
import TestQuestionSection from '../features/test/TestQuestionSection';
import TestCompleteSection from '../features/test/TestCompleteSection';
import testData from '../data/testData';
import Image from '../components/Image';
import cubeIcon from '../assets/icons/icon-cube.png';
import ringIcon from '../assets/icons/icon-ring.png';
import waveIcon from '../assets/icons/icon-wave.png';

// 📌 배경 이미지 전용 래퍼
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
  const [answers, setAnswers] = useState<string[]>([]);

  const isComplete = currentIndex > testData.length;

  const handleAnswer = (value: string) => {
    setAnswers((prev) => [...prev, value]);
    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* 배경 이미지 레이어 */}
      <BackgroundFloatWrapper>
        <Image
          src={waveIcon}
          alt="배경 웨이브"
          width="55%"
          motion="float"
          style={{ top: '-5%', left: '0%' }}
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
          style={{ bottom: '5%', right: '10%' }}
        />
      </BackgroundFloatWrapper>

      {/* 본문 콘텐츠 */}
      {currentIndex === 0 && <TestInformSection onStart={() => setCurrentIndex(1)} />}
      {!isComplete && currentIndex > 0 && (
        <TestQuestionSection currentIndex={currentIndex} onAnswer={handleAnswer} />
      )}
      {isComplete && <TestCompleteSection answers={answers} />}
    </div>
  );
}
