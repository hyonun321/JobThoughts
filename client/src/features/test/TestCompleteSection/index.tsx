import FullScreenSection from '@/components/FullScreenSection';
import { useNavigate } from 'react-router-dom';
import { LastCard } from '@/components/CardFrame';
import Image from '@/components/Image';
import Text from '@/components/Text';
import Button from '@/components/Button';
import IconCheck from '@/assets/icons/icon-check.png';
import { Wrapper, TextWrapper, ButtonWrapper } from './styles';

export default function TestCompleteSection() {
  const navigate = useNavigate();

  return (
    <FullScreenSection>
      <LastCard>
        <Wrapper>
          <Image src={IconCheck} width="clamp(100px, 20vw, 150px)" />
          <TextWrapper>
            <Text as="h1" weight="bold" size="clamp(20px, 3vw, 32px)" color="black">
              검사가 완료되었습니다
            </Text>
            <Text as="p" weight="light" size="clamp(14px, 2.6vw,22px)" color="black" align="center">
              수고하셨습니다!
            </Text>
            <Text as="p" weight="light" size="clamp(14px, 2.6vw,22px)" color="black" align="center">
              이제 결과를 바탕으로 어떤 포지션이 잘 맞는지 알아볼까요?
            </Text>
          </TextWrapper>

          <ButtonWrapper>
            <Button
              onClick={() => navigate('/result')}
              variant="link"
              text={'결과 보기'}
              hoverColor="area"
            />
          </ButtonWrapper>
        </Wrapper>
      </LastCard>
    </FullScreenSection>
  );
}
