import { ResponsiveRadar } from '@nivo/radar';
import styled from 'styled-components';
import resultData from '../../data/resultData';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;
  aspect-ratio: 1 / 1;
  margin: 70px;
  border-radius: 1px solid red;
  .nivo-radar .grid text {
    display: none;
  }
`;

const Label = styled.div<{ x: number; y: number }>`
  position: absolute;
  transform: translate(-50%, -50%);
  left: ${({ x }) => x}%;
  top: ${({ y }) => y}%;
  cursor: pointer;
  font-size: 14px;
  color: #333;
  user-select: none;
  white-space: nowrap;
  transition: color 0.2s;

  &:hover {
    color: #4f63ff;
    font-weight: bold;
  }
`;

type ChartContainerProps = {
  size?: number;
};

const ChartContainer = styled.div<ChartContainerProps>`
  width: ${({ size }) => size || 800}px;
  height: ${({ size }) => size || 800}px;
`;

export default function ResultChart({ size = 800 }: ChartContainerProps) {
  const handleClickLabel = (label: string) => {
    console.log(`라벨 클릭: ${label}`);
  };

  // 라벨 좌표 계산 (반응형 기준 % 좌표)
  const labels = resultData.map((d, i) => {
    const angle = (i / resultData.length) * 2 * Math.PI - Math.PI / 2; // 12시 기준 시작
    const r = Math.abs(Math.sin(angle)) > 0.95 ? 47 : 49;
    // 중심 보정값 추가 (직접 미세조정)
    const centerX = 52; // X축 0.5% 우측으로 보정
    const centerY = 51; // Y축 0.5% 위로 보정

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
        enableLabels={false}
        margin={{ top: 40, right: 40, bottom: 40, left: 60 }}
        gridLabelOffset={170}
        enableDots={false}
        colors={['#4F63FF']}
        fillOpacity={0.4}
        isInteractive={true}
        animate={true}
        motionConfig="gentle"
      />
      {labels.map((l) => (
        <Label key={l.label} x={l.x} y={l.y} onClick={() => handleClickLabel(l.label)}>
          {l.label}
        </Label>
      ))}
    </Wrapper>
  );
}
