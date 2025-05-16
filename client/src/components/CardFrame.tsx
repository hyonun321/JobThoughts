import styled, { useTheme } from 'styled-components';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import IconBack from '../assets/icons/icon-back.svg';

type CardFrameProps = {
  step: number;
  renderContent: (step: number) => React.ReactNode;
  onBack?: () => void;
  direction?: 'forward' | 'backward';
};

type LastCardProps = {
  children: React.ReactNode;
};

const FrameWrapper = styled.div`
  position: relative;
  width: 65%;
  height: 65%;
`;

const AnimatedCard = styled(motion.div)<{ z: number; color: string }>`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 30px;
  background-color: ${({ color }) => color};
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  z-index: ${({ z }) => z};
  display: flex;
  justify-content: center;
  align-items: center;
  transform-origin: center bottom;
  overflow: hidden;
`;

const ForegroundContent = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentWrapper = styled.div`
  position: relative;
  width: 90%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 2rem;
`;

// 이전 질문 이동 버튼
const BackButton = styled.button`
  position: absolute;
  top: 1rem;
  left: -0.5rem;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  z-index: 5;

  img {
    width: 100%;
  }
`;

export default function CardFrame({
  step,
  renderContent,
  onBack,
  direction = 'forward',
}: CardFrameProps) {
  const theme = useTheme();

  const [internalStep, setInternalStep] = useState(step);
  const [displayedStep, setDisplayedStep] = useState(step);
  const [animating, setAnimating] = useState(false);
  const [waitForTimeout, setWaitForTimeout] = useState(false);

  const [topCard, setTopCard] = useState({ id: step, color: theme.colors.deco2, rotation: 0 });
  const [middleCard, setMiddleCard] = useState({
    id: step - 1,
    color: 'rgba(220, 234, 255, 1)',
    rotation: -3,
  });
  const [backCard, setBackCard] = useState({
    id: step - 2,
    color: 'rgba(191, 217, 255, 1)',
    rotation: 3,
  });

  useEffect(() => {
    setTopCard({ id: step, color: theme.colors.deco2, rotation: 0 });
    setMiddleCard({ id: step - 1, color: 'rgba(220, 234, 255, 1)', rotation: -3 });
    setBackCard({ id: step - 2, color: 'rgba(191, 217, 255, 1)', rotation: 3 });
  }, [theme]);

  useEffect(() => {
    if (step === internalStep) return;
    setAnimating(true);

    if (direction === 'forward') {
      // forward: 중간 -> 탑, 백 -> 중간, 새 백 생성
      setMiddleCard((prev) => ({ ...prev, rotation: 0 }));
      setBackCard((prev) => ({ ...prev, rotation: -3 }));

      setTimeout(() => {
        setTopCard({ ...middleCard, rotation: 0 });
        setMiddleCard({ ...backCard, rotation: -3 });
        setBackCard({ id: step - 2, color: topCard.color, rotation: 3 });

        setInternalStep(step);
        setDisplayedStep(step);
        setAnimating(false);
      }, 600);
    } else {
      // backward: 백 -> 탑 (0), 탑 -> 중간 (-3), 중간 -> 백 (3)
      const newTop = { id: step, color: backCard.color, rotation: 0 };
      setTopCard(newTop);
      setDisplayedStep(step);
      setWaitForTimeout(false);

      setTimeout(() => {
        setWaitForTimeout(true);
        setTopCard(newTop);
        setMiddleCard({ id: topCard.id, color: topCard.color, rotation: -3 });
        setBackCard({ id: middleCard.id, color: middleCard.color, rotation: 3 });

        setInternalStep(step);
        setAnimating(false);
      }, 600);
    }
  }, [step]);

  // 카드 하나를 렌더링하는 함수
  const renderCard = (
    card: typeof topCard,
    z: number,
    content: React.ReactNode,
    isTop = false,
    showBackBtn = false
  ) => {
    const isTopAnim = isTop && animating;
    const isBackFading = direction === 'backward' && z === 0 && animating;

    return (
      <AnimatedCard
        key={`${isTop ? 'top' : 'card'}-${card.id}`}
        z={z}
        color={card.color}
        initial={
          isTop
            ? {
                x: direction === 'backward' ? -400 : 0,
                opacity: direction === 'backward' ? 0 : 1,
                rotate: direction === 'backward' ? -10 : 0,
              }
            : undefined
        }
        animate={
          isTop
            ? isTopAnim
              ? direction === 'forward'
                ? { x: -400, opacity: 0, rotate: -10 }
                : { x: 0, opacity: 1, rotate: 0 }
              : { x: 0, opacity: 1, rotate: 0 }
            : isBackFading
              ? waitForTimeout
                ? { opacity: 0 }
                : { rotate: card.rotation }
              : { rotate: card.rotation }
        }
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        style={isTop ? { pointerEvents: animating ? 'none' : 'auto' } : undefined}
      >
        <ForegroundContent>
          <ContentWrapper>
            {isTop && showBackBtn && onBack && (
              <BackButton onClick={onBack}>
                <img src={IconBack} alt="이전" />
              </BackButton>
            )}
            {content}
          </ContentWrapper>
        </ForegroundContent>
      </AnimatedCard>
    );
  };

  return (
    <FrameWrapper>
      {renderCard(backCard, 0, renderContent(displayedStep + 2))}
      {renderCard(middleCard, 1, renderContent(displayedStep + 1))}
      {renderCard(
        topCard,
        2,
        renderContent(displayedStep),
        true,
        displayedStep > 0 // <- 현재 보여지고 있는 카드 기준으로 버튼 노출
      )}
    </FrameWrapper>
  );
}

export const TopCard = styled(AnimatedCard)`
  z-index: 2;
  background-color: ${({ theme }) => theme.colors.deco2};
  pointer-events: auto;
`;

export function LastCard({ children }: LastCardProps) {
  return (
    <FrameWrapper>
      <TopCard
        z={2}
        color="rgba(181, 231, 233, 1)"
        initial={{ x: 0, opacity: 1, rotate: 0 }}
        animate={{ x: 0, opacity: 1, rotate: 0 }}
        transition={{ duration: 0.6 }}
      >
        <ForegroundContent>
          <ContentWrapper>{children}</ContentWrapper>
        </ForegroundContent>
      </TopCard>
    </FrameWrapper>
  );
}
