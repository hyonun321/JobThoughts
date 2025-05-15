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
};

// 텍스트 값과 아이콘을 매핑하는 객체
const iconMap: Record<string, string> = {
  능력발휘: achievement,
  자율성: autonomy,
  창의성: creativity,
  보수: pay,
  자기계발: selfDevelopment,
  사회봉사: socialContribution,
  사회의인정: socialRecognition,
  안정성: stability,
};

// ================= styled-components =================
// 카드 전체 wrapper
const CardWrapper = styled.div<{
  selected: boolean;
  width?: string;
  height?: string;
}>`
  width: ${({ width }) => width || '240px'};
  height: ${({ height }) => height || '240px'};
  background-color: ${({ theme, selected }) => (selected ? '#e0f0ff' : theme.colors.deco2)};
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
`;

// 아이콘 스타일
const CardIcon = styled.img`
  width: 70%;
  height: 70%;
  margin-bottom: 0.5rem;
`;

// 텍스트 스타일
const CardLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.black};
`;

// 텍스트 스타일 : Inform섹션용
const InfoCardLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSize.m};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.black};
`;

// ================= Card Component =================
/**
 * 개별 가치(선택지)를 카드 형태로 시각화하는 컴포넌트
 * 선택 여부에 따라 스타일이 달라지고, 클릭 시 상위에서 전달된 콜백을 실행함
 */
export default function Card({ value, selected, onClick, width, height }: Props) {
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
    >
      <CardIcon src={icon} alt={`${value} 아이콘`} />
      <CardLabel>{value}</CardLabel>
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
    >
      <CardIcon src={icon} alt={`${value} 아이콘`} />
      <InfoCardLabel>{value}</InfoCardLabel>
    </CardWrapper>
  );
}
