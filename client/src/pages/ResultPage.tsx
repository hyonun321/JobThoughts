import ResultChart from '../features/result/ResultChart';
import ResultDescriptionCard from '../features/result/ResultDescriptionCard';
import JobGroupSection from '../features/result/JobGroupSection';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ClickFinger from '../../src/assets/icons/icon-click-finger.svg';
import { theme } from '../../src/styles/theme';
import { useTestStore } from '../store/useTestStore';
import { postReport } from '../api/report';
import Loading from '../components/Loading';
import Text from '../components/Text';

interface Score {
  name: string;
  score: number;
}

interface ReportResponse {
  scores: Score[];
  topValues: string[];
  jobsByMajor: Record<string, string[]>;
}

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
  const [reportData, setReportData] = useState<ReportResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const { answers } = useTestStore(); // 사용자가 선택한 답변

  useEffect(() => {
    postReport(answers)
      .then((res) => {
        console.log('✅ report 응답:', res);
        setReportData(res.results);
      })
      .catch((err) => {
        console.error(err);
        alert('결과를 불러오지 못했습니다.');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading message="결과를 불러오는 중이에요..." />;
  if (!reportData || !reportData.scores)
    return (
      <Text as="p" color="gray800" align="center">
        결과가 없습니다.
      </Text>
    );

  // ✅ ResultChart에 맞는 형식으로 변환
  const chartData = reportData.scores.map((s) => ({
    type: s.name,
    score: s.score,
  }));

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
            data={chartData}
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
