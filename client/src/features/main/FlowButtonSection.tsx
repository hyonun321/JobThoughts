import StepItem from '../../components/StepItem';
import Image from '../../components/Image';
import flowBear from '../../assets/bears/flow-bear.svg';
import useScrollAnimation from '../../hooks/useScrollAnimation'; // ✅ 수정됨
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useRef, useState, useEffect } from 'react';

const Section = styled.section`
  width: 100vw;
  height: 500vh;
  background-color: ${({ theme }) => theme.colors.white};
  position: relative;
`;

const BearWrapper = styled.div`
  position: absolute;
  right: 0;
  width: 400px;
  height: auto;
  z-index: 1;
`;

const StickyWrapper = styled.div`
  position: sticky;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StepWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  padding-left: 20vw;
  left: 0;

  @media (max-width: 1024px) {
    padding-left: 10vw;
  }

  @media (max-width: 768px) {
    padding-left: 0;
    align-items: center;
    gap: 1.5rem;
  }
`;

const motionVariants = {
  hidden: {
    transform: 'translateX(300px)',
    opacity: 0,
  },
  visible: {
    transform: 'translateX(20px)',
    opacity: 1,
    transition: { type: 'spring', stiffness: 80, damping: 12 },
  },
};

export default function FlowButtonSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const steps = [
    { step: 1, text: '직업 가치관 검사' },
    { step: 2, text: '직무 추천' },
    { step: 3, text: '채용 공고 연결' },
  ];

  const { ref, controls } = useScrollAnimation(0);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;

      const scrollY = window.scrollY;
      const sectionTop = sectionRef.current.offsetTop;
      const sectionHeight = sectionRef.current.offsetHeight;

      const relativeY = scrollY - sectionTop;

      if (relativeY < 0) return;

      const effectiveHeight = sectionHeight * 0.6; // ✅ 80%까지만 step 변화

      if (relativeY > effectiveHeight) {
        setActiveStep(steps.length - 1); // ✅ 마지막 step 유지
        return;
      }

      const progress = relativeY / effectiveHeight;
      const currentStep = Math.floor(progress * steps.length);
      const clampedStep = Math.min(currentStep, steps.length - 1);

      setActiveStep(clampedStep);
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [steps.length]);

  return (
    <Section ref={sectionRef}>
      <StickyWrapper>
        <StepWrapper>
          {steps.map(({ step, text }, index) => (
            <StepItem key={step} step={step} text={text} active={activeStep === index} />
          ))}
        </StepWrapper>
        <BearWrapper ref={ref}>
          <motion.div
            animate={controls}
            variants={motionVariants}
            style={{ display: 'flex', justifyContent: 'flex-end', position: 'relative' }}
          >
            <Image
              style={{ width: 'clamp(200px, 25vw, 450px)', height: 'auto' }}
              src={flowBear}
              alt="flow bear"
              motion="float"
            />
          </motion.div>
        </BearWrapper>
      </StickyWrapper>
    </Section>
  );
}
