import { useState, useEffect } from 'react';
import styled from 'styled-components';
import FullScreenSection from '../../components/FullScreenSection';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Text from '../../components/Text';
import CardFrame from '../../components/CardFrame';
import TestCompleteSection from './TestCompleteSection';
import testData from '../../data/testData';

// ============ Styled Components ============
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

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
export default function TestQuestionSection() {
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 질문 인덱스
  const [selected, setSelected] = useState<string | null>(null); // 선택된 답변
  const [step, setStep] = useState(0); // 카드 애니메이션 단계
  const [answers, setAnswers] = useState<string[]>([]); // 전체 답변 목록
  const [isComplete, setIsComplete] = useState(false); // 설문 완료 여부
  const [displayIndex, setDisplayIndex] = useState(0); // 카드 콘텐츠 인덱스

  // 질문 전환 시 선택 초기화
  useEffect(() => {
    setSelected(null);
  }, [currentIndex]);

  const handleNext = () => {
    if (!selected) return;

    setStep((prev) => prev + 1); // 카드 애니메이션 트리거

    setTimeout(() => {
      setAnswers((prev) => [...prev, selected]); // 답변 저장

      const nextIndex = currentIndex + 1;
      if (nextIndex >= testData.length) {
        setIsComplete(true); // 모든 질문 완료 시
      } else {
        setCurrentIndex(nextIndex);
        setDisplayIndex(nextIndex);
      }
    }, 600); // 카드 애니메이션과 동기화
  };

  const renderQuestion = (index: number) => {
    const data = testData[index];
    if (!data) return null;

    const { left, right } = data;

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

  return isComplete ? (
    <TestCompleteSection answers={answers} />
  ) : (
    <FullScreenSection>
      <Wrapper>
        <CardFrame
          step={step}
          topContent={renderQuestion(displayIndex)}
          middleContent={renderQuestion(displayIndex + 1)}
          backContent={renderQuestion(displayIndex + 2)}
        />
      </Wrapper>
    </FullScreenSection>
  );
}
