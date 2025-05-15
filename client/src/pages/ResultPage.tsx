import ResultChart from '../features/result/ResultChart';
import ResultDescriptionCard from '../features/result/ResultDescriptionCard';
import JobGroupSection from '../features/result/JobGroupSection';
import styled from 'styled-components';
import { useState } from 'react';
import { motion } from 'framer-motion';

const ResultSection = styled.div`
  padding: 0px 20px;
  display: flex;
  flex-direction: column;
`;

const ResultTopWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;
  justify-content: center;
  align-items: center;
  > * {
    flex: 1 1 300px; /* 최소 300px까지 줄어듦 */
    max-width: 600px; /* (선택) 너무 커지지 않게 제한 */
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
      <ResultTopWrapper>
        <motion.div key="chart" layout transition={layoutSpring}>
          <ResultChart
            onLabelClick={(label) => setSelectedLabel(label)}
            activeLabel={selectedLabel}
          />
        </motion.div>
        {selectedLabel && (
          <motion.div
            key="description"
            variants={slideInVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <ResultDescriptionCard label={selectedLabel} onClose={() => setSelectedLabel(null)} />
          </motion.div>
        )}
      </ResultTopWrapper>
      <JobGroupSection />
    </ResultSection>
  );
}
