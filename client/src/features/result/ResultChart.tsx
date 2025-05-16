import { ResponsiveRadar } from '@nivo/radar';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

const Wrapper = styled.div`
  position: relative;
  width: clamp(250px, 50vw, 700px);
  max-width: 450px;
  aspect-ratio: 1 / 1;
  margin: 50px;
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
  font-size: ${({ $active }) =>
    $active ? `clamp(14px, 2vw, ${theme.fontSize.ml})` : `clamp(12px, 1.8vw, ${theme.fontSize.m})`};
  color: ${({ $active }) => ($active ? theme.colors.primary : theme.colors.gray900)};
  font-weight: ${({ $active }) => ($active ? theme.fontWeight.bold : theme.fontWeight.medium)};
  white-space: nowrap;
  transition: color 0.2s;

  &:hover {
    color: #4f63ff;
    font-weight: bold;
  }
`;

type ResultChartProps = {
  chartData: { type: string; score: number }[];
  onLabelClick: (label: string) => void;
  activeLabel: string | null;
};

export default function ResultChart({ chartData, onLabelClick, activeLabel }: ResultChartProps) {
  if (!chartData || chartData.length === 0) return <div>차트 데이터가 없습니다</div>;

  //라벨 좌표 타입 정의
  type LabelPosition = {
    label: string;
    x: number;
    y: number;
  };

  // 라벨 좌표 계산 (반응형 기준 % 좌표)
  const labels = chartData.map((data, i) => {
    const angle = (i / chartData.length) * 2 * Math.PI - Math.PI / 2; // 12시 기준 시작
    const r = Math.abs(Math.sin(angle)) > 0.95 ? 47 : 49;
    const centerX = 52;
    const centerY = 50;

    const x = centerX + r * Math.cos(angle);
    const y = centerY + r * Math.sin(angle);

    return { label: data.type, x, y };
  });

  return (
    <Wrapper>
      <ResponsiveRadar
        data={chartData}
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
