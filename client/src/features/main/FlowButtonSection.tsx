import FullScreenSection from '../../components/FullScreenSection';
import StepItem from '../../components/StepItem';
import Image from '../../components/Image';
import flowBear from '../../assets/bears/flow-bear.svg';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const BearWrapper = styled.div`
  position: absolute;
  right: 0;
  width: 320px;
  height: auto;
  z-index: 1; // 필요 시
`;

const StickyWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StepWrapper = styled.div``;
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
  const steps = [
    { step: 1, text: '직업 가치관 검사' },
    { step: 2, text: '직무 추천' },
    { step: 3, text: '채용 공고 연결' },
  ];
  const { ref, controls } = useScrollAnimation(0);

  return (
    <FullScreenSection style={{ position: 'relative' }}>
      <StickyWrapper>
        <StepWrapper>
          {steps.map(({ step, text }) => (
            <StepItem key={step} step={step} text={text} />
          ))}
        </StepWrapper>
        <BearWrapper>
          <motion.div
            ref={ref}
            animate={controls}
            variants={motionVariants}
            style={{ display: 'flex', justifyContent: 'flex-end', position: 'relative' }} // ✅ 이 부분
          >
            <Image src={flowBear} alt="flow bear" motion="float" width="300px" />
          </motion.div>
        </BearWrapper>
      </StickyWrapper>
    </FullScreenSection>
  );
}
