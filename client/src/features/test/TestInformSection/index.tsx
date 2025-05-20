import CardFrame from '@/components/CardFrame';
import Button from '@/components/Button';
import Text from '@/components/Text';
import { InfoCard } from '@/components/Card';
import { useMediaQuery } from 'react-responsive';
import {
  TextWrapper,
  ExampleBlock,
  InfoTag,
  TextGroup,
  ButtonWrapper,
  SampleWrapper,
  InfoCardWrapper,
  MotionSection,
} from './styles';
type Props = {
  onStart: () => void;
};

function renderCardContent(isMobile: boolean, isTablet: boolean, isDesktop: boolean) {
  return (
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
            여러분이 직업에서 중요하게 여기는
            <br /> 다양한 욕구와 가치를 파악하고,
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
            여러분이 직업에서 중요하게 여기는
            <br />
            다양한 욕구와 가치를 파악하고,
            <br />그 가치가 충족될 가능성이 높은 직업을 탐색할 수 있도록 도움을 주는 검사입니다.
          </Text>
        )}

        {isDesktop && (
          <Text
            as="h2"
            size="clamp(0.75rem, 1.6vw, 1.5rem)"
            weight="bold"
            color="black"
            align="center"
          >
            여러분이 직업에서 중요하게 여기는 다양한 욕구와 가치를 파악하고,
            <br />그 가치가 충족될 가능성이 높은 직업을 탐색할 수 있도록 도움을 주는 검사입니다.
          </Text>
        )}
      </TextWrapper>

      <ExampleBlock>
        <InfoTag>검사 진행방법</InfoTag>
        <Text
          as="p"
          size="clamp(0.625rem, 1.5vw, 1rem)"
          weight="medium"
          color="gray900"
          align="center"
        >
          각 문항별로 짝을 지어 제시되는 두 가지 항목 중에서 자신에게 더 중요한 것에 응답해
          주십시오.
        </Text>

        <SampleWrapper>
          <TextGroup>
            <Text
              as="p"
              size="clamp(0.625rem, 2vw, 1.5rem)"
              weight="medium"
              color="black"
              align="center"
            >
              두 가치 중 자신에게 더 중요한 가치를 선택하세요.
            </Text>
            <Text
              as="p"
              size="clamp(0.625rem, 2vw, 1rem)"
              weight="light"
              color="black"
              align="center"
            >
              "아래의 답변을 클릭해 보세요"
            </Text>
          </TextGroup>
          <InfoCardWrapper>
            <InfoCard value="능력발휘" width="120px" height="125px" />
            <InfoCard value="자율성" width="120px" height="125px" />
          </InfoCardWrapper>
        </SampleWrapper>
        <Text
          as="p"
          size="clamp(0.625rem, 1.2vw, 0.875rem)"
          weight="light"
          color="gray700"
          align="center"
          style={{ marginTop: '1rem' }}
        >
          키보드 방향키 <strong>←</strong>는 왼쪽 선택, <strong>→</strong>는 오른쪽 선택,
          <strong> Enter</strong>는 다음 문항으로 이동합니다.
        </Text>
      </ExampleBlock>
    </div>
  );
}

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
