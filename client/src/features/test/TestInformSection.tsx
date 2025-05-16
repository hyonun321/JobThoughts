import styled from 'styled-components';
import { motion } from 'framer-motion';
import CardFrame from '../../components/CardFrame';
import Button from '../../components/Button';
import Text from '../../components/Text';
import { InfoCard } from '../../components/Card';
import testData from '../../data/testData';

type Props = {
  onStart: () => void;
};

// ================= styled-components =================
const FullScreenSection = styled.section`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column; /* 필요시 row로 바꿔도 됨 */
  justify-content: center;
  align-items: center;
  scroll-snap-align: start; /* 선택 사항 */
`;

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

const CardContent = styled.div`
  max-width: 85%;
`;

// 검사 설명/예시 묶음
const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px; // 제목과 아래 요소 간격
  padding-top: 20px;
  padding-bottom: 10px;
`;

// 검사 진행방법, 설명 텍스트, 샘플 묶음
const ExampleBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;

const SampleWrapper = styled.div`
  width: 100%;
  height: 250px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 20px;
  margin-top: 6px;
  padding-top: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TextWrapper = styled.div`
  width: 100%;
  padding: 0 1rem;
  box-sizing: border-box;
`;

const InfoTag = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 3px 35px;
  background-color: white;
  color: black;
  border-radius: 100px;
  font-size: ${({ theme }) => theme.fontSize.ml};
  box-shadow: 1px 2px 6px rgba(79, 99, 255, 0.4);
  width: fit-content;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  top: calc(88%);
`;

//검사 진행방법 소개페이지에서는 Card 컴포넌트에 hover해도 cursor가 활성화되지 않도록 함
const InfoCardWrapper = styled.div`
  display: flex;
  gap: 30px;
  & > * {
    cursor: default !important;
  }
`;

const { left, right } = testData[0];

// 🔁 카드에 들어갈 공통 콘텐츠 정의
const renderCardContent = () => (
  <CardContent>
    <InfoBlock>
      <TextWrapper>
        <Text as="h2" size="ml" weight="bold" color="black" align="center">
          직업과 관련된 다양한 욕구 및 가치들에 대해 여러분이 상대적으로 무엇을 얼마나 더 중요하게
          여기는가를 살펴보고,
        </Text>
        <Text as="h2" size="ml" weight="bold" color="black" align="center">
          그 가치가 충족될 가능성이 높은 직업을 탐색할 수 있도록 도움을 주는 검사입니다.
        </Text>
      </TextWrapper>

      <ExampleBlock>
        <InfoTag>검사 진행방법</InfoTag>
        <Text as="p" size="m" weight="medium" color="gray900" align="center">
          각 문항별로 짝을 지어 제시되는 두 가지 항목 중에서 자신에게 더 중요한 것에 응답해
          주십시오.
        </Text>

        <SampleWrapper>
          <Text as="p" size="s" weight="medium" color="black" align="center">
            두 가치 중 자신에게 더 중요한 가치를 선택하세요.
          </Text>
          <Text
            as="p"
            size="s"
            weight="light"
            color="black"
            align="center"
            style={{ marginTop: '0.1rem', marginBottom: '2rem' }}
          >
            "아래의 답변을 클릭해 보세요"
          </Text>
          <InfoCardWrapper>
            <InfoCard value={left} width="120px" height="125px" />
            <InfoCard value={right} width="120px" height="125px" />
          </InfoCardWrapper>
        </SampleWrapper>
      </ExampleBlock>
    </InfoBlock>
  </CardContent>
);

export default function TestInformSection({ onStart }: Props) {
  return (
    <FullScreenSection>
      <MotionSection
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <CardFrame
          step={0} // 설명 페이지는 애니메이션이 필요 없으므로 step 고정
          topContent={renderCardContent()}
          middleContent={renderCardContent()}
          backContent={renderCardContent()}
          showBackButton={false}
        />
        <ButtonWrapper>
          <Button onClick={onStart} variant="link" text="직업 가치관 검사 시작" hoverColor="area" />
        </ButtonWrapper>
      </MotionSection>
    </FullScreenSection>
  );
}
