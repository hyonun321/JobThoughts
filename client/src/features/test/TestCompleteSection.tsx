import FullScreenSection from '../../components/FullScreenSection';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { LastCard } from '../../components/CardFrame';
import Image from '../../components/Image';
import Text from '../../components/Text';
import Button from '../../components/Button';
import IconCheck from '../../assets/icons/icon-check.png';

type Props = {
  answers: string[];
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
  gap: 2rem;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.2rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
`;

export default function TestCompleteSection({ answers }: Props) {
  const navigate = useNavigate();
  console.log(answers, '추후 api로 넘길 데이터');
  return (
    <FullScreenSection>
      <LastCard>
        <Wrapper>
          <Image src={IconCheck} width="150px" />
          <TextWrapper>
            <Text as="h1" weight="bold" size="32px" color="black">
              검사가 완료되었습니다
            </Text>
            <Text as="p" weight="light" size="24px" color="black">
              수고하셨습니다! 이제 결과를 바탕으로 어떤 포지션이 잘 맞는지 알아볼까요?
            </Text>
          </TextWrapper>
          {/*📌TestQuestionSection.tsx의 '다음'버튼과 최대한 같은 위치에 있도록 할 것 */}
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
