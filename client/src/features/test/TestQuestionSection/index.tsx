import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import FullScreenSection from '@/components/FullScreenSection';
import Text from '@/components/Text';
import CardFrame from '@/components/CardFrame';
import Loading from '@/components/Loading';
import { fetchQuestions } from '@/api/questions';
import type { Question } from '@/api/questions';
import {
  ButtonWrapper,
  CardContainer,
  MotionWrapper,
  QuestionTextWrapper,
  ResponsiveButton,
  ResponsiveCard,
} from './styles';

type Props = {
  currentIndex: number;
  step: number;
  direction: 'forward' | 'backward';
  onAnswer: (value: string) => void;
  onBack: () => void;
};

export default function TestQuestionSection({
  currentIndex,
  step,
  direction,
  onAnswer,
  onBack,
}: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [animating, setAnimating] = useState(false);
  const [clicked, setClicked] = useState(false); // 중복 클릭 방지용
  const isMobile = useMediaQuery({ query: '(max-width: 480px)' });

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const data = await fetchQuestions();
        setQuestions(data);
      } catch (err) {
        console.error(err);
        alert('질문지를 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, []);

  useEffect(() => {
    setSelected(null); // 질문이 바뀌면 선택 초기화
    setClicked(false); // 다음 질문 도착 시 초기화
  }, [currentIndex]);

  const handleNext = () => {
    if (!selected || !questions[currentIndex] || clicked || animating) return;

    setClicked(true); // 클릭 시 바로 재클릭 방지
    setTimeout(() => {
      onAnswer(selected); // 기존 상위 컴포넌트 호출
    }, 300);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!questions[currentIndex] || clicked || animating) return;

      const { answer01: left, answer02: right } = questions[currentIndex];

      switch (e.key) {
        case 'ArrowLeft':
          setSelected(left);
          break;
        case 'ArrowRight':
          setSelected(right);
          break;
        case 'Enter':
          if (selected) handleNext();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selected, questions, currentIndex, clicked, animating]);

  const handleBack = () => {
    if (clicked || animating) return;

    setClicked(true);
    setTimeout(() => {
      onBack();
    }, 300);
  };

  const renderQuestion = (index: number, isMobile: boolean) => {
    const data = questions[index];
    if (!data) return null;

    const { answer01: left, answer02: right } = data;

    return (
      <div
        style={{
          pointerEvents: 'auto',
          width: '100%',
          height: '100%',
          maxHeight: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          textAlign: 'center',
          padding: '1.5vh',
        }}
      >
        <QuestionTextWrapper>
          {isMobile ? (
            <Text
              as="h3"
              size="clamp(0.75rem, 1vw, 1.5rem)"
              weight="medium"
              color="black"
              align="center"
              style={{ marginBottom: '0.5rem' }}
            >
              두 가치 중 자신에게
              <br />더 중요한 가치를 선택하세요.
            </Text>
          ) : (
            <Text
              as="h3"
              size="clamp(0.75rem, 2vw, 2rem)"
              weight="medium"
              color="black"
              align="center"
              style={{ marginBottom: '0.5rem' }}
            >
              두 가치 중 자신에게 더 중요한 가치를 선택하세요.
            </Text>
          )}
          <Text
            as="p"
            size="clamp(0.7rem, 1vw, 1.5rem)"
            weight="light"
            color="black"
            align="center"
            style={{ marginBottom: 'clamp(0.75rem, 2vh, 1.5rem)' }}
          >
            "아래의 답변을 클릭해 보세요"
          </Text>
        </QuestionTextWrapper>

        <CardContainer>
          <ResponsiveCard
            value={left}
            selected={selected === left}
            onClick={() => setSelected(left)}
            description={data.answer03}
          />
          <ResponsiveCard
            value={right}
            selected={selected === right}
            onClick={() => setSelected(right)}
            description={data.answer04}
          />
        </CardContainer>

        <ButtonWrapper>
          <ResponsiveButton
            text="다음"
            onClick={handleNext}
            variant="action"
            disabled={!selected || animating || clicked}
          />
        </ButtonWrapper>
      </div>
    );
  };

  return (
    <FullScreenSection>
      {loading ? (
        <Loading message="당신에게 맞는 질문을 준비 중이에요..." />
      ) : (
        <MotionWrapper
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <CardFrame
            step={step}
            renderContent={(s) => renderQuestion(s, isMobile)}
            onBack={handleBack}
            direction={direction}
            onAnimatingChange={setAnimating}
            total={questions.length}
          />
        </MotionWrapper>
      )}
    </FullScreenSection>
  );
}
