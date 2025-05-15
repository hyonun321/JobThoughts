import styled, { useTheme } from 'styled-components';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// 카드 프레임 컴포넌트에서 받아올 props 정의 (질문/프론트/중간/백)
type CardFrameProps = {
  step: number;
  topContent: React.ReactNode;
  middleContent: React.ReactNode;
  backContent: React.ReactNode;
};

// 전체 카드 프레임 영역
const FrameWrapper = styled.div`
  position: relative;
  width: 65%;
  height: 65%;
`;

// 카드 하나의 스타일 정의 (프론트/중간/백 전부 공통)
const AnimatedCard = styled(motion.div)<{ z: number; color: string }>`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 30px;
  background-color: ${({ color }) => color};
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  z-index: ${({ z }) => z}; // 카드 계층 순서
  display: flex;
  justify-content: center;
  align-items: center;
  transform-origin: center bottom;
  overflow: hidden;
`;

// 카드 안쪽 콘텐츠를 감싸는 영역
const ForegroundContent = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 콘텐츠 내부 레이아웃
const ContentWrapper = styled.div`
  width: 90%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 2rem;
`;

export default function CardFrame({
  step,
  topContent,
  middleContent,
  backContent,
}: CardFrameProps) {
  const theme = useTheme(); // ✅ theme 객체 사용
  const [internalStep, setInternalStep] = useState(step); // 내부 단계 상태 (렌더링 기준)
  const [animating, setAnimating] = useState(false); // 현재 애니메이션 중인지 여부

  // 각 카드의 상태: id, 색상, 회전값
  const [topCard, setTopCard] = useState({
    id: step,
    color: theme.colors.deco2,

    rotation: 0,
  });
  const [middleCard, setMiddleCard] = useState({
    id: step - 1,
    color: 'rgba(220, 234, 255, 1)',
    rotation: -3,
  });
  const [backCard, setBackCard] = useState({
    id: step - 2,
    color: 'rgba(213, 229, 255, 1)',
    rotation: 3,
  });

  // step이 바뀔 때 애니메이션 트리거
  useEffect(() => {
    if (step !== internalStep) {
      setAnimating(true); // 애니메이션 시작

      // 카드 회전 조정 (중간 → 0도, 백 → -3도)
      setMiddleCard((prev) => ({ ...prev, rotation: 0 }));
      setBackCard((prev) => ({ ...prev, rotation: -3 }));

      // 0.6초 뒤 카드 위치/색상 업데이트
      setTimeout(() => {
        setTopCard({ ...middleCard, rotation: 0 }); // 중간 카드 → 탑 카드
        setMiddleCard({ ...backCard, rotation: -3 }); // 백 카드 → 중간 카드
        setBackCard({ id: step - 2, color: topCard.color, rotation: 3 }); // 새로운 백 카드 생성

        setInternalStep(step); // 내부 step 동기화
        setAnimating(false); // 애니메이션 종료
      }, 600);
    }
  }, [step]);

  // 카드 하나를 렌더링하는 함수
  const renderCard = (card: typeof topCard, z: number, content: React.ReactNode, isTop = false) => (
    <AnimatedCard
      key={`${isTop ? 'top' : 'card'}-${card.id}`} // 고유 key
      z={z}
      color={card.color}
      initial={isTop ? { x: 0, opacity: 1, rotate: 0 } : undefined}
      animate={
        isTop
          ? animating
            ? { x: -400, opacity: 0, rotate: -10 } // 탑카드는 왼쪽으로 날아감
            : { x: 0, opacity: 1, rotate: 0 }
          : { rotate: card.rotation } // 나머지는 회전만 적용
      }
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      style={isTop ? { pointerEvents: animating ? 'none' : 'auto' } : undefined}
    >
      <ForegroundContent>
        <ContentWrapper>{content}</ContentWrapper>
      </ForegroundContent>
    </AnimatedCard>
  );

  // 세 장의 카드를 순서대로 렌더링
  return (
    <FrameWrapper>
      {renderCard(backCard, 0, backContent)}
      {renderCard(middleCard, 1, middleContent)}
      {renderCard(topCard, 2, topContent, true)}
    </FrameWrapper>
  );
}
