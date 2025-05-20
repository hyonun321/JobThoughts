import Text from '@/components/Text';
import { ModalContent, Overlay, TextGroup } from './styles';
import Button from '@/components/Button';

interface Props {
  onClose: () => void;
}

export default function OnboardingModal({ onClose }: Props) {
  return (
    <Overlay>
      <ModalContent>
        <Text as="h2" size="lg" weight="bold" align="center">
          👋 결과 확인 방법 안내
        </Text>
        <TextGroup>
          <Text align="center" as="p" size="m" weight="medium">
            <strong>차트 항목</strong>을 클릭하면 상세 설명이 나와요.
          </Text>
          <Text align="center" as="p" size="m" weight="medium">
            <strong>아래로 스크롤</strong>하면 <br />
            나에게 맞는 직업 정보도 확인할 수 있어요.
          </Text>
        </TextGroup>
        <Button onClick={onClose} text="확인했어요!" />
      </ModalContent>
    </Overlay>
  );
}
