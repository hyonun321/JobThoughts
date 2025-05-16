import ResultChart from '../features/result/ResultChart';
import ResultDescriptionCard from '../features/result/ResultDescriptionCard';
import JobGroupSection from '../features/result/JobGroupSection';
import styled from 'styled-components';
import { useState } from 'react';
import { motion } from 'framer-motion';
import ClickFinger from '../../src/assets/icons/icon-click-finger.svg';
import { theme } from '../../src/styles/theme';

const LayoutTitle = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;

  h1 {
    text-align: center;
    color: ${theme.colors.gray900};
    font-size: clamp(12px, 3vw, ${theme.fontSize.lg});
    font-weight: normal;
    transform: translateX(40px);
  }

  span {
    color: ${theme.colors.primary};
  }

  .image-wrapper {
    width: clamp(40px, 18vw, 200px);
    margin-left: -35px;
    margin-top: -50px;
  }

  @media (max-width: 768px) {
    .image-wrapper {
      margin-left: -25px;
      margin-top: -40px;
    }
  }
  @media (max-width: 485px) {
    .image-wrapper {
      margin-left: -15px;
      margin-top: -30px;
    }
    h1 {
      transform: translateX(20px);
    }
  }
`;

const ResultSection = styled.div`
  padding: 0px 20px;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
`;

const ResultTopWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2vw;
  justify-content: center;
  align-items: center;
  margin-top: -30px;
  min-height: clamp(400px, 60vw, 500px);
`;

const DescriptionWrapper = styled(motion.div)`
  @media (max-width: 768px) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

// ======================= animation variants =======================
const layoutSpring = {
  type: 'spring', // spring 애니메이션 적용
  stiffness: 40, // 낮을수록 부드럽고 천천히 감
  damping: 20, // 감쇠율을 높이면 느리게 멈춤, 기본적으로 20
};

const slideInVariants = {
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: layoutSpring,
  },
  exit: {
    x: -100,
    opacity: 0,
    transition: layoutSpring,
  },
};

// ======================= components =======================
export default function ResultPage() {
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  return (
    <ResultSection>
      <LayoutTitle>
        <h1>
          차트의 각 항목을 <span>클릭</span> 해보세요!
          <br />
          나의 직업 가치관에 대한 설명을 확인할 수 있어요
        </h1>
        <img className="image-wrapper" src={ClickFinger} alt="클릭하는 손가락 아이콘" />
      </LayoutTitle>
      <ResultTopWrapper>
        <motion.div key="chart" layout transition={layoutSpring}>
          <ResultChart
            onLabelClick={(label) => setSelectedLabel(label)}
            activeLabel={selectedLabel}
          />
        </motion.div>
        {selectedLabel && (
          <DescriptionWrapper
            key="description"
            variants={slideInVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <ResultDescriptionCard label={selectedLabel} onClose={() => setSelectedLabel(null)} />
          </DescriptionWrapper>
        )}
      </ResultTopWrapper>
      <JobGroupSection />
    </ResultSection>
  );
}
