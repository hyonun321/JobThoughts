import FullScreenSection from '../../components/FullScreenSection';
import testData from '../../data/testData';

type Props = {
  currentIndex: number;
  onAnswer: (answer: string) => void;
};

export default function TestQuestionSection({ currentIndex, onAnswer }: Props) {
  const { left, right } = testData[currentIndex - 1]; // 0은 설명 페이지니까 -1 보정

  return (
    <FullScreenSection>
      <h3>두 가치 중 더 중요한 걸 선택하세요</h3>
      <button onClick={() => onAnswer(left)}>{left}</button>
      <button onClick={() => onAnswer(right)}>{right}</button>
    </FullScreenSection>
  );
}
