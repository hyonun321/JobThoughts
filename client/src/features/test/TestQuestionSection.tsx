import { useState, useEffect } from 'react';
import styled from 'styled-components';
import FullScreenSection from '../../components/FullScreenSection';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Text from '../../components/Text';
import testData from '../../data/testData';

type Props = {
  currentIndex: number;
  onAnswer: (answer: string) => void;
};

// ============ styled-components ============
const CardContainer = styled.div`
  display: flex;
  gap: 4rem;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 3rem;
`;

const ButtonWrapper = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
`;

export default function TestQuestionSection({ currentIndex, onAnswer }: Props) {
  const { left, right } = testData[currentIndex - 1]; // 0은 설명 페이지니까 -1 보정
  const [selected, setSelected] = useState<string | null>(null);

  // 질문이 바뀔 때마다 선택 초기화
  useEffect(() => {
    setSelected(null);
  }, [currentIndex]);

  const handleNext = () => {
    if (selected) {
      onAnswer(selected);
    }
  };

  return (
    <FullScreenSection>
      <Text as="h3" size="lg" weight="medium" color="black" align="center">
        두 가치 중 자신에게 더 중요한 가치를 선택하세요.
      </Text>
      <Text
        as="p"
        size="lg"
        weight="light"
        color="black"
        align="center"
        style={{ marginTop: '0.5rem' }}
      >
        "아래의 답변을 클릭해 보세요"
      </Text>
      <CardContainer>
        <Card value={left} selected={selected === left} onClick={() => setSelected(left)} />
        <Card value={right} selected={selected === right} onClick={() => setSelected(right)} />
      </CardContainer>
      <ButtonWrapper>
        <Button text="다음" onClick={handleNext} variant="action" disabled={!selected} />
      </ButtonWrapper>
    </FullScreenSection>
  );
}
