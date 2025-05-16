import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import FullScreenSection from '../../components/FullScreenSection';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Text from '../../components/Text';
import CardFrame from '../../components/CardFrame';

import { fetchQuestions } from '../../api/questions';
import type { Question } from '../../api/questions';

// ============ Props Type ============
type Props = {
  currentIndex: number;
  onAnswer: (value: string) => void;
};

// ============ Styled Components ============
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const MotionWrapper = motion(Wrapper);

const CardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 5%;
  row-gap: 2vh;
`;

const ButtonWrapper = styled.div`
  margin-top: 2vh;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const ResponsiveCard = styled(Card)`
  flex: 1 1 40%;
  max-width: 45%;
  min-width: 30%;
  aspect-ratio: 1 / 1;
`;

const ResponsiveButton = styled(Button)`
  font-size: ${({ theme }) => theme.fontSize.s};
  padding: 0.75rem 1.5rem;
  min-width: 100px;
`;

// ============ Main Component ============
export default function TestQuestionSection({ currentIndex, onAnswer }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  // 질문 데이터 fetch
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
  }, [currentIndex]);

  const handleNext = () => {
    if (!selected) return;
    setStep((prev) => prev + 1);
    setTimeout(() => {
      onAnswer(selected); // 상위 컴포넌트로 선택한 답변 전달
    }, 600);
  };

  const renderQuestion = (index: number) => {
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
        <div>
          <Text
            as="h3"
            size="lg"
            weight="medium"
            color="black"
            align="center"
            style={{ marginBottom: '0.5rem' }}
          >
            두 가치 중 자신에게 더 중요한 가치를 선택하세요.
          </Text>
          <Text
            as="p"
            size="lg"
            weight="light"
            color="black"
            align="center"
            style={{ marginBottom: '1.5rem' }}
          >
            "아래의 답변을 클릭해 보세요"
          </Text>
        </div>

        <CardContainer>
          <ResponsiveCard
            value={left}
            selected={selected === left}
            onClick={() => setSelected(left)}
          />
          <ResponsiveCard
            value={right}
            selected={selected === right}
            onClick={() => setSelected(right)}
          />
        </CardContainer>

        <ButtonWrapper>
          <ResponsiveButton
            text="다음"
            onClick={handleNext}
            variant="action"
            disabled={!selected}
          />
        </ButtonWrapper>
      </div>
    );
  };

  return (
    <FullScreenSection>
      {loading ? (
        <Text as="p" size="m" weight="medium" color="gray700">
          질문지를 불러오는 중입니다...
        </Text>
      ) : (
        <MotionWrapper
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <CardFrame
            step={step}
            topContent={renderQuestion(currentIndex)}
            middleContent={renderQuestion(currentIndex + 1)}
            backContent={renderQuestion(currentIndex + 2)}
          />
        </MotionWrapper>
      )}
    </FullScreenSection>
  );
}
