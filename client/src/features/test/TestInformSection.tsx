import styled from 'styled-components';
import FullScreenSection from '../../components/FullScreenSection';
import CardFrame from '../../components/CardFrame';
import Button from '../../components/Button';

type Props = {
  onStart: () => void;
};

// ================= styled-components =================
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const CardContent = styled.div`
  text-align: center;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  top: calc(88%);
`;

export default function TestInformSection({ onStart }: Props) {
  return (
    <FullScreenSection>
      <Wrapper>
        <CardFrame>
          <CardContent>
            <h2>직업과 관련된 다양한 욕구 및 가치를...</h2>
            <p>두 가치 중에서 더 중요한 걸 골라주세요</p>
          </CardContent>
        </CardFrame>
        <ButtonWrapper>
          <Button onClick={onStart} variant="link" text="직업 가치관 검사 시작" />
        </ButtonWrapper>
      </Wrapper>
    </FullScreenSection>
  );
}
