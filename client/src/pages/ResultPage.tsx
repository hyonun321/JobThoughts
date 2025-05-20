import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import ResultChart from '../features/result/ResultChart';
import ResultDescriptionCard from '../features/result/ResultDescriptionCard';
import JobGroupSection from '../features/result/JobGroupSection';
import ClickFinger from '../../src/assets/icons/icon-click-finger.svg';
import { theme } from '../../src/styles/theme';
import { useTestStore } from '../store/useTestStore';
import { useResultStore } from '../store/useResultStore';
import { postReport } from '../api/report';
import NoResult from '../components/NoResult';
import { useNavigate } from 'react-router-dom';
import LoadingSection from '../features/result/LoadingSection';
import OnboardingModal from '../features/result/OnboardingModal';
import mockResultData from '../data/mockResultData';
const ResultSection = styled.div`
  padding: 0px 20px;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
`;

const ChartInfoText = styled.div`
  position: relative;
  margin: 0 auto;

  h1 {
    text-align: center;
    color: ${theme.colors.gray900};
    font-size: clamp(12px, 3vw, ${theme.fontSize.lg});
    font-weight: normal;
  }

  span {
    color: ${theme.colors.primary};
  }

  &::after {
    content: '';
    position: absolute;
    background-image: url(${ClickFinger});
    background-size: contain;
    background-repeat: no-repeat;
    width: clamp(40px, 18vw, 150px);
    height: clamp(40px, 18vw, 200px);
    top: -30%;
    left: calc(100% - 30px);
  }
`;

const ResultTopWrapper = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 4rem;
  justify-content: center;
  align-items: center;
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

const layoutSpring = {
  type: 'spring',
  stiffness: 40,
  damping: 10,
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

export default function ResultPage() {
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const { answers } = useTestStore();
  const { result, setResult } = useResultStore();
  const isDev = process.env.NODE_ENV === 'development';
  const navigate = useNavigate();

  const preventClose = (e: BeforeUnloadEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    window.addEventListener('beforeunload', preventClose);

    return () => {
      window.removeEventListener('beforeunload', preventClose);
    };
  }, []);

  useEffect(() => {
    if (result) {
      setLoading(false);
      return;
    }

    // ✅ answers가 없으면 리포트 요청하지 않음
    if (!answers || answers.length === 0) {
      setLoading(false);
      return;
    }

    postReport(answers)
      .then((res) => {
        const resultData = res.results;
        setResult(resultData);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [answers, result, setResult]);

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    if (!hasSeenOnboarding) {
      setShowOnboarding(true);
      localStorage.setItem('hasSeenOnboarding', 'true');
    }
  }, []);

  useEffect(() => {
    if (isDev) {
      if (!result) {
        setResult(mockResultData);
        setLoading(false);
      }
    }
  }, [result, setResult]);

  if (loading) return <LoadingSection />;
  // 로딩 중이 아닌데, 테스트를 진행하지 않았거나 결과가 없는 경우 - 404 페이지로 통일 처리
  if (!loading && (!result || ((!answers || answers.length === 0) && !isDev))) {
    return (
      <NoResult
        title="404 Page Not Found"
        description="요청하신 테스트 결과를 찾을 수 없습니다."
        subDescription={
          <>
            아래 버튼을 눌러 다시 검사해 보세요!
            <br />
            당신에게 꼭 맞는 직업과 채용 정보를 안내해드릴게요.
          </>
        }
        buttonText="다시 검사하기"
        onButtonClick={() => navigate('/test')}
      />
    );
  }

  const chartData = result!.scores.map((s) => ({
    type: s.name,
    score: s.score,
  }));

  return (
    <ResultSection>
      {showOnboarding && <OnboardingModal onClose={() => setShowOnboarding(false)} />}
      <ChartInfoText>
        <h1>
          차트의 각 항목을 <span>클릭</span> 해보세요!
          <br />
          나의 직업 가치관에 대한 설명을 확인할 수 있어요
        </h1>
      </ChartInfoText>
      <ResultTopWrapper>
        <motion.div key="chart" layout transition={layoutSpring}>
          <ResultChart
            data={chartData}
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
            <ResultDescriptionCard
              label={selectedLabel}
              onClose={() => setSelectedLabel(null)}
              chartData={chartData}
            />
          </DescriptionWrapper>
        )}
      </ResultTopWrapper>
      <JobGroupSection jobsByMajor={result!.jobsByMajor} topValues={result!.topValues} />
    </ResultSection>
  );
}
