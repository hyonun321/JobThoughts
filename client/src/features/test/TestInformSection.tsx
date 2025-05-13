import FullScreenSection from '../../components/FullScreenSection';

type Props = {
  onStart: () => void;
};

export default function TestInformSection({ onStart }: Props) {
  return (
    <FullScreenSection>
      <h2>직업과 관련된 다양한 욕구 및 가치를...</h2>
      <p>두 가치 중에서 더 중요한 걸 골라주세요</p>
      <button onClick={onStart}>직업 가치관 검사 시작</button>
    </FullScreenSection>
  );
}
