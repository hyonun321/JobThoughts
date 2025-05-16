import ResultChart from '../features/result/ResultChart';
import ResultDescriptionCard from '../features/result/ResultDescriptionCard';
import JobGroupSection from '../features/result/JobGroupSection';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ClickFinger from '../../src/assets/icons/icon-click-finger.svg';
import { theme } from '../../src/styles/theme';
import axios from 'axios';
import { mockAnswersData } from '../data/mockAnswersData';

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
  gap: 3rem;
  justify-content: center;
  align-items: center;
  margin-top: -70px;
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
  const [chartData, setChartData] = useState([]);
  const [jobsByMajor, setJobsByMajor] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResultData = async () => {
      setLoading(true);
      try {
        const { data } = await axios.post('/api/report', { answer: mockAnswersData });
        console.log(data);
        setChartData(
          data.results.scores.map((item) => ({
            type: item.name,
            score: item.score,
            description: item.description,
          }))
        );
        setJobsByMajor(data.results.jobsByMajor);
      } catch (error) {
        console.error('결과 가져오기 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResultData();
  }, []);

  if (loading) {
    return <div>결과를 불러오는 중입니다...</div>;
  }

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
            chartData={chartData}
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
            <ResultDescriptionCard
              label={selectedLabel}
              onClose={() => setSelectedLabel(null)}
              chartData={chartData}
            />
          </motion.div>
        )}
      </ResultTopWrapper>
      <JobGroupSection jobsByMajor={jobsByMajor} />
    </ResultSection>
  );
}
