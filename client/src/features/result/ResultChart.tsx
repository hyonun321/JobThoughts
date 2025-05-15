import { ResponsiveRadar } from '@nivo/radar';
import styled from 'styled-components';
import resultData from '../../data/resultData';

// resultData 타입 정의
type ResultDataItem = {
  type: string;
  score: number;
};

type ResultChartProps = {
  onLabelClick: (label: string) => void;
  activeLabel: string | null;
};

const Wrapper = styled.div`
  position: relative;
  width: 50vw;
  max-width: 450px;
  aspect-ratio: 1 / 1;
  margin: 70px;
  border-radius: 1px solid red;
  .nivo-radar .grid text {
    display: none;
  }
`;

const Label = styled.div<{ x: number; y: number; $active: boolean }>`
  position: absolute;
  transform: translate(-50%, -50%);
  left: ${({ x }) => x}%;
  top: ${({ y }) => y}%;
  cursor: pointer;
  font-size: ${({ $active }) => ($active ? '18px' : '14px')};
  color: ${({ $active }) => ($active ? '#4f63ff' : '#333')};
  font-weight: ${({ $active }) => ($active ? 'bold' : 'normal')};
  white-space: nowrap;
  transition: color 0.2s;

  &:hover {
    color: #4f63ff;
    font-weight: bold;
  }
`;

export default function ResultChart({ onLabelClick, activeLabel }: ResultChartProps) {
  //라벨 좌표 타입 정의
  type LabelPosition = {
    label: string;
    x: number;
    y: number;
  };

  // 라벨 좌표 계산 (반응형 기준 % 좌표)
  const labels: LabelPosition[] = resultData.map((d: ResultDataItem, i: number) => {
    const angle = (i / resultData.length) * 2 * Math.PI - Math.PI / 2; // 12시 기준 시작
    const r = Math.abs(Math.sin(angle)) > 0.95 ? 47 : 49;
    const centerX = 52;
    const centerY = 50;

    const x = centerX + r * Math.cos(angle);
    const y = centerY + r * Math.sin(angle);

    return { label: d.type, x, y };
  });

  return (
    <Wrapper>
      <ResponsiveRadar
        data={resultData}
        keys={['score']}
        indexBy="type"
        margin={{ top: 40, right: 40, bottom: 40, left: 60 }}
        gridLabelOffset={400}
        enableDots={false}
        colors={['#4F63FF']}
        fillOpacity={0.4}
        isInteractive={true}
        animate={true}
        motionConfig="gentle"
      />
      {labels.map((l) => (
        <Label
          key={l.label}
          x={l.x}
          y={l.y}
          $active={l.label === activeLabel}
          onClick={() => onLabelClick(l.label)}
        >
          {l.label}
        </Label>
      ))}
    </Wrapper>
  );
}
