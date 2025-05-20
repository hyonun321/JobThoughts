import styled from 'styled-components';
import achievement from '../assets/card/achievement.svg';
import autonomy from '../assets/card/autonomy.svg';
import creativity from '../assets/card/creativity.svg';
import pay from '../assets/card/pay.svg';
import selfDevelopment from '../assets/card/self-development.svg';
import socialContribution from '../assets/card/social-contribution.svg';
import socialRecognition from '../assets/card/social-recognition.svg';
import stability from '../assets/card/stability.svg';

// Card 컴포넌트 props 정의
type Props = {
  value: string;
  selected?: boolean;
  onClick?: () => void;
  width?: string;
  height?: string;
  description?: string;
};

// 텍스트 값과 아이콘을 매핑하는 객체
const iconMap: Record<string, string> = {
  능력발휘: achievement,
  자율성: autonomy,
  창의성: creativity,
  보수: pay,
  자기계발: selfDevelopment,
  사회봉사: socialContribution,
  '사회적 인정': socialRecognition, //사회의인정 -> 사회적인정: 커리어넷 api대로 수정
  안정성: stability,
};

// ================= styled-components =================
// 카드 전체 wrapper
const CardWrapper = styled.div<{
  selected: boolean;
  width?: string;
  height?: string;
  mode?: 'info' | 'default';
}>`
  width: ${({ width }) =>
    width ? `clamp(100px, ${parseInt(width)}px, 240px)` : 'clamp(120px, 35vw, 240px)'};
  height: ${({ height }) =>
    height ? `clamp(100px, ${parseInt(height)}px, 240px)` : 'clamp(120px, 35vw, 240px)'};
  background-color: ${({ theme, selected }) => (selected ? '#e0f0ff' : theme.colors.white)};
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  padding: 12px;

  box-shadow: ${({ selected }) =>
    selected
      ? `
        inset 4px 4px 10px rgba(0, 0, 0, 0.2),
        inset -4px -4px 10px rgba(255, 255, 255, 0.3)
      `
      : `
        inset 10px 10px 10px 4px rgba(255, 255, 255, 0.6),
        inset -5px -5px 15px 4px rgba(193, 215, 249, 1)
        `};
  @media (max-width: 920px) {
    width: ${({ mode }) => (mode === 'info' ? 'clamp(64px, 24vw, 90px)' : '90%')};
    height: ${({ mode }) => (mode === 'info' ? 'clamp(64px, 24vw, 90px)' : 'auto')};
    flex-direction: ${({ mode }) => (mode === 'info' ? 'column' : 'row')};
    gap: ${({ mode }) => (mode === 'info' ? '0.25rem' : '1rem')};
    padding: ${({ mode }) => (mode === 'info' ? '0.4rem 0' : '1rem 1.25rem')};
  }
`;

// 아이콘 스타일
const CardIcon = styled.img`
  margin-top: -18px;
  width: 65%;
  height: 65%;

  @media (max-width: 920px) {
    width: 48px;
    height: 48px;
    margin-top: 0;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

// 텍스트 그룹
const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;

  @media (max-width: 920px) {
    flex: 1;
    align-items: center;
    min-width: 0; // 줄바꿈 방지
  }
`;

// 텍스트 스타일
const CardLabel = styled.span`
  margin-top: -10px;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.fontSize.lg};

  white-space: nowrap; // ✅ 줄바꿈 방지
  text-align: center;

  @media (max-width: 920px) {
    margin-top: 0;
    font-size: ${({ theme }) => theme.fontSize.m};
  }
  @media (max-width: 780px) {
    margin-top: 0;
    font-size: ${({ theme }) => theme.fontSize.xs};
    text-align: center;
  }
`;

// 텍스트 스타일 : Inform섹션용
const InfoCardLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSize.m};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.black};

  @media (max-width: 920px) {
    font-size: ${({ theme }) => theme.fontSize.s};
  }

  @media (max-width: 780px) {
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
`;

// 가치 설명 텍스트용 스타일
const CardDescription = styled.span`
  max-width: 180px;
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.gray700};
  text-align: center;
  margin-top: 0.25rem;
  line-height: 1.4;

  @media (max-width: 920px) {
    text-align: left;
    max-width: 100%;
    margin-top: 0.3rem;
  }
`;

// ================= Card Component =================
/**
 * 개별 가치(선택지)를 카드 형태로 시각화하는 컴포넌트
 * 선택 여부에 따라 스타일이 달라지고, 클릭 시 상위에서 전달된 콜백을 실행함
 */
export default function Card({ value, selected, onClick, width, height, description }: Props) {
  // value에 해당하는 아이콘 불러오기
  const icon = iconMap[value];

  return (
    <CardWrapper
      selected={selected ?? false}
      onClick={() => {
        if (onClick) onClick(); // undefined 방지
      }}
      width={width}
      height={height}
      mode="default"
    >
      <CardIcon src={icon} alt={`${value} 아이콘`} />
      <TextBlock>
        <CardLabel>{value}</CardLabel>
        {description && <CardDescription>{description}</CardDescription>}
      </TextBlock>
    </CardWrapper>
  );
}

export function InfoCard({ value, selected, width, height }: Props) {
  // value에 해당하는 아이콘 불러오기
  const icon = iconMap[value];

  return (
    <CardWrapper
      selected={selected ?? false}
      onClick={(e) => {
        e.preventDefault(); // 클릭 무시
      }}
      width={width}
      height={height}
      mode="info"
    >
      <CardIcon src={icon} alt={`${value} 아이콘`} />
      <InfoCardLabel>{value}</InfoCardLabel>
    </CardWrapper>
  );
}
