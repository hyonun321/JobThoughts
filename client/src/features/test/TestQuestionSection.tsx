import { useState, useEffect } from 'react';
import styled from 'styled-components';
import FullScreenSection from '../../components/FullScreenSection';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Text from '../../components/Text';
import testData from '../../data/testData';

// Props 타입 정의
type Props = {
  currentIndex: number;
  onAnswer: (answer: string) => void;
};

// ============ styled-components ============
// 카드 영역 스타일
const CardContainer = styled.div`
  display: flex;
  gap: 4rem;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 3rem;
`;

// 버튼 영역 스타일
const ButtonWrapper = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
`;

// ================= TestQuestionSection 컴포넌트 =================
/**
 * 질문 인덱스를 기반으로 두 개의 선택지를 보여주는 테스트 화면
 * 사용자가 하나를 선택하면 '다음' 버튼이 활성화되고,
 * 선택 후 'onAnswer' 콜백을 통해 상위로 선택값을 전달함
 */
export default function TestQuestionSection({ currentIndex, onAnswer }: Props) {
  // 현재 질문에서 좌/우 선택지 가져오기 (0은 설명페이지이므로 -1 보정)
  const { left, right } = testData[currentIndex - 1];

  // 현재 선택된 답변 상태
  const [selected, setSelected] = useState<string | null>(null);

  // 질문이 바뀔 때마다 선택 초기화
  useEffect(() => {
    setSelected(null);
  }, [currentIndex]);

  // 다음 버튼 클릭 시 선택된 값 전달
  const handleNext = () => {
    if (selected) {
      onAnswer(selected);
    }
  };

  return (
    <FullScreenSection>
      {/* 질문 제목 */}
      <Text as="h3" size="lg" weight="medium" color="black" align="center">
        두 가치 중 자신에게 더 중요한 가치를 선택하세요.
      </Text>
      {/* 안내 문구 */}
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

      {/* 카드 선택 영역 */}
      <CardContainer>
        <Card value={left} selected={selected === left} onClick={() => setSelected(left)} />
        <Card value={right} selected={selected === right} onClick={() => setSelected(right)} />
      </CardContainer>

      {/* 다음 버튼 영역 */}
      <ButtonWrapper>
        <Button text="다음" onClick={handleNext} variant="action" disabled={!selected} />
      </ButtonWrapper>
    </FullScreenSection>
  );
}
