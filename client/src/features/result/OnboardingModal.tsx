import styled from 'styled-components';
import Text from '../../components/Text';

interface Props {
  onClose: () => void;
}

const Overlay = styled.div`
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(3px);
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  max-width: 400px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 1rem;

  & > div {
    text-align: left;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  button {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    border: none;
    border-radius: 0.5rem;
    padding: 0.75rem 1.5rem;
    cursor: pointer;
  }
`;

const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

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
        <button onClick={onClose}>확인했어요!</button>
      </ModalContent>
    </Overlay>
  );
}
