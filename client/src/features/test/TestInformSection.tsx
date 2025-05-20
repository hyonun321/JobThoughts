import styled from 'styled-components';
import { motion } from 'framer-motion';
import CardFrame from '../../components/CardFrame';
import Button from '../../components/Button';
import Text from '../../components/Text';
import { InfoCard } from '../../components/Card';
import testData from '../../data/testData';
import { useMediaQuery } from 'react-responsive';

type Props = {
  onStart: () => void;
};

// ================= styled-components =================
const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

//이전 페이지에서 넘어올때 부드러운 화면 전환 추가를 위한 MotionSection
const MotionSection = motion(Wrapper);

const TextWrapper = styled.div`
  padding-bottom: 20px;
`;

// 검사 진행방법, 설명 텍스트, 샘플 묶음
const ExampleBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: clamp(0.5rem, 2vw, 1.5rem);

  @media (max-width: 780px) {
    align-items: center;
  }
`;

const SampleWrapper = styled.div`
  width: 100%;
  height: clamp(170px, 33vh, 250px);
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    max-height: 170px;
  }
`;

const TextGroup = styled.div`
  margin-bottom: clamp(0.5rem, 1.5vw, 2.5rem);
`;

// 검사 진행방법 o
const InfoTag = styled.div`
  padding: 3px 35px;
  background-color: white;
  color: black;
  border-radius: 100px;
  font-size: clamp(0.75rem, 1.2vw, 1.125rem);
  box-shadow: 1px 2px 6px rgba(79, 99, 255, 0.4);
`;

// 버튼 o
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: clamp(1rem, 4vh, 3rem);
`;

// 검사 진행방법 소개페이지에서는 Card 컴포넌트에 hover해도 cursor가 활성화되지 않도록 함
const InfoCardWrapper = styled.div`
  display: flex;
  gap: clamp(25px, 2.7vw, 35px);

  & > * {
    cursor: default !important;
  }
`;

const { left, right } = testData[0];

// 🔁 카드에 들어갈 공통 콘텐츠 정의
const renderCardContent = (isMobile: boolean, isTablet: boolean, isDesktop: boolean) => (
  <div>
    <TextWrapper>
      {isMobile && (
        <Text
          as="h2"
          size="clamp(0.75rem, 1.6vw, 1.125rem)"
          weight="bold"
          color="black"
          align="center"
        >
          직업과 관련된 다양한 욕구 및 가치들에 대해
          <br /> 여러분이 상대적으로 무엇을 얼마나
          <br /> 더 중요하게 여기는가를 살펴보고,
          <br /> 그 가치가 충족될 가능성이 높은 직업을
          <br /> 탐색할 수 있도록 도움을 주는 검사입니다.
        </Text>
      )}

      {isTablet && (
        <Text
          as="h2"
          size="clamp(0.75rem, 1.6vw, 1.125rem)"
          weight="bold"
          color="black"
          align="center"
        >
          직업과 관련된 다양한 욕구 및 가치들에 대해
          <br />
          여러분이 상대적으로 무엇을 얼마나 더 중요하게 여기는가를 살펴보고,
          <br />그 가치가 충족될 가능성이 높은 직업을 탐색할 수 있도록 도움을 주는 검사입니다.
        </Text>
      )}

      {isDesktop && (
        <Text
          as="h2"
          size="clamp(0.75rem, 1.6vw, 1.125rem)"
          weight="bold"
          color="black"
          align="center"
        >
          직업과 관련된 다양한 욕구 및 가치들에 대해 여러분이 상대적으로 무엇을 얼마나 더 중요하게
          여기는가를 살펴보고,
          <br />그 가치가 충족될 가능성이 높은 직업을 탐색할 수 있도록 도움을 주는 검사입니다.
        </Text>
      )}
    </TextWrapper>

    <ExampleBlock>
      <InfoTag>검사 진행방법</InfoTag>
      <Text
        as="p"
        size="clamp(0.625rem, 1.5vw, 0.875rem)"
        weight="medium"
        color="gray900"
        align="center"
      >
        각 문항별로 짝을 지어 제시되는 두 가지 항목 중에서 자신에게 더 중요한 것에 응답해 주십시오.
      </Text>

      <SampleWrapper>
        <TextGroup>
          <Text
            as="p"
            size="clamp(0.625rem, 2vw, 0.875rem)"
            weight="medium"
            color="black"
            align="center"
          >
            두 가치 중 자신에게 더 중요한 가치를 선택하세요.
          </Text>
          <Text
            as="p"
            size="clamp(0.625rem, 2vw, 0.875rem)"
            weight="light"
            color="black"
            align="center"
          >
            "아래의 답변을 클릭해 보세요"
          </Text>
        </TextGroup>
        <InfoCardWrapper>
          <InfoCard value={left} width="120px" height="125px" />
          <InfoCard value={right} width="120px" height="125px" />
        </InfoCardWrapper>
      </SampleWrapper>
    </ExampleBlock>
  </div>
);

export default function TestInformSection({ onStart }: Props) {
  const isMobile = useMediaQuery({ query: '(max-width: 480px)' });
  const isTablet = useMediaQuery({ query: '(min-width: 481px) and (max-width: 1023px)' });
  const isDesktop = useMediaQuery({ query: '(min-width: 1025px)' });

  return (
    <>
      <MotionSection
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <CardFrame
          step={0}
          direction="forward"
          renderContent={() => renderCardContent(isMobile, isTablet, isDesktop)}
          renderOnlyTopCard
        />
        <ButtonWrapper>
          <Button onClick={onStart} variant="link" text="직업 가치관 검사 시작" hoverColor="area" />
        </ButtonWrapper>
      </MotionSection>
    </>
  );
}
