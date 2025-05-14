import styled from 'styled-components';

import achievement from '../assets/card/achievement.svg';
import autonomy from '../assets/card/autonomy.svg';
import creativity from '../assets/card/creativity.svg';
import pay from '../assets/card/pay.svg';
import selfDevelopment from '../assets/card/self-development.svg';
import socialContribution from '../assets/card/social-contribution.svg';
import socialRecognition from '../assets/card/social-recognition.svg';
import stability from '../assets/card/stability.svg';

type Props = {
  value: string;
  selected: boolean;
  onClick: () => void;
  width?: string;
  height?: string;
};

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

const CardIcon = styled.img`
  width: 70%;
  height: 70%;
  margin-bottom: 0.5rem;
`;

const CardLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.black};
`;

export default function Card({ value, selected, onClick, width, height }: Props) {
  const icon = iconMap[value];

  return (
    <CardWrapper selected={selected} onClick={onClick} width={width} height={height}>
      <CardIcon src={icon} alt={`${value} 아이콘`} />
      <CardLabel>{value}</CardLabel>
    </CardWrapper>
  );
}
