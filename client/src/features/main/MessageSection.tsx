import FullScreenSection from '../../components/FullScreenSection';
import Text from '../../components/Text';

export default function MessageSection() {
  return (
    <>
      <FullScreenSection>
        <Text as="h1" size="120px" weight="bold" color="primary" align="left">
          무슨 생각?
        </Text>
        <Text as="h1" size="120px" weight="bold" color="black" align="left">
          잡 생각
        </Text>
      </FullScreenSection>

      <FullScreenSection>
        <h2>하고 싶은 일을 몰라도 괜찮아요</h2>
        <h2>우리는 당신에게 맞는 길부터 찾으니까요</h2>
        <h1>잡생각은, 이런 걸 합니다</h1>
      </FullScreenSection>
    </>
  );
}
