import styled, { useTheme } from 'styled-components';
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import IconBack from '../assets/icons/icon-back.svg';

const ANIMATION_DURATION = 300;

type CardFrameProps = {
  step: number;
  renderContent: (step: number) => React.ReactNode;
  onBack?: () => void;
  direction?: 'forward' | 'backward';
  onAnimatingChange?: (animating: boolean) => void;
  total?: number;
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

const StepIndicator = styled.div`
  position: absolute;
  top: 1rem;
  right: -0.5rem;
  z-index: 5;
  font-size: ${({ theme }) => theme.fontSize.m};
  color: ${({ theme }) => theme.colors.black};
  background-color: rgba(255, 255, 255, 0.8);
  padding: 0.3rem 0.6rem;
  border-radius: 1rem;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

export default function CardFrame({
  step,
  renderContent,
  onBack,
  direction = 'forward',
  onAnimatingChange,
  total,
}: CardFrameProps) {
  const theme = useTheme();

  const [internalStep, setInternalStep] = useState(step);
  const [displayedStep, setDisplayedStep] = useState(step);
  const [animating, setAnimating] = useState(false);
  const [waitForTimeout, setWaitForTimeout] = useState(false);

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
    color: 'rgba(191, 217, 255, 1)',
    rotation: 3,
  });

  const directionRef = useRef(direction);
  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  const middleCardRef = useRef(middleCard);
  const backCardRef = useRef(backCard);
  useEffect(() => {
    middleCardRef.current = middleCard;
    backCardRef.current = backCard;
  }, [middleCard, backCard]);

  useEffect(() => {
    onAnimatingChange?.(animating);
  }, [animating]);

  useEffect(() => {
    if (internalStep === step) return;

    setAnimating(true);

    if (directionRef.current === 'forward') {
      setMiddleCard((prev) => ({ ...prev, rotation: 0 }));
      setBackCard((prev) => ({ ...prev, rotation: -3 }));

      setTimeout(() => {
        setTopCard({ ...middleCardRef.current, rotation: 0 });
        setMiddleCard({ ...backCardRef.current, rotation: -3 });
        setBackCard({
          id: step - 2,
          color: topCard.color,
          rotation: 3,
        });

        setInternalStep(step);
        setDisplayedStep(step);
        setAnimating(false);
      }, ANIMATION_DURATION);
    } else {
      const newTop = {
        id: step,
        color: backCard.color,
        rotation: 0,
      };
      setTopCard(newTop);
      setDisplayedStep(step);
      setWaitForTimeout(false);

      setTimeout(() => {
        setWaitForTimeout(true);
        setTopCard(newTop);
        setMiddleCard({
          id: topCard.id,
          color: topCard.color,
          rotation: -3,
        });
        setBackCard({
          id: middleCard.id,
          color: middleCard.color,
          rotation: 3,
        });

        setInternalStep(step);
        setAnimating(false);
      }, ANIMATION_DURATION);
    }
  }, [step]);

  const renderCard = (
    card: typeof topCard,
    z: number,
    content: React.ReactNode,
    isTop = false,
    showBackBtn = false
  ) => {
    const isTopAnim = isTop && animating;

    return (
      <AnimatedCard
        key={`${isTop ? 'top' : 'card'}-${card.id}-${z}-${directionRef.current}`}
        z={z}
        color={card.color}
        initial={
          isTop
            ? {
                x: directionRef.current === 'backward' ? -400 : 0,
                opacity: directionRef.current === 'backward' ? 0 : 1,
                rotate: directionRef.current === 'backward' ? -10 : 0,
              }
            : undefined
        }
        animate={
          isTop
            ? isTopAnim
              ? directionRef.current === 'forward'
                ? { x: -400, opacity: 0, rotate: -10 }
                : { x: 0, opacity: 1, rotate: 0 }
              : { x: 0, opacity: 1, rotate: 0 }
            : directionRef.current === 'backward' && z === 0 && animating
              ? waitForTimeout
                ? { opacity: 0 }
                : { rotate: card.rotation }
              : { rotate: card.rotation }
        }
        transition={{ duration: ANIMATION_DURATION / 1000, ease: 'easeInOut' }}
        style={isTop ? { pointerEvents: animating ? 'none' : 'auto' } : undefined}
      >
        <ForegroundContent>
          <ContentWrapper>
            {isTop && showBackBtn && onBack && (
              <BackButton onClick={onBack}>
                <img src={IconBack} alt="이전" />
              </BackButton>
            )}
            {total && (
              <StepIndicator>
                {displayedStep + 1} / {total}
              </StepIndicator>
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
      {renderCard(topCard, 2, renderContent(displayedStep), true, displayedStep > 0)}
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
        transition={{ duration: ANIMATION_DURATION / 1000 }}
      >
        <ForegroundContent>
          <ContentWrapper>{children}</ContentWrapper>
        </ForegroundContent>
      </TopCard>
    </FrameWrapper>
  );
}
