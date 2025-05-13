import { ResponsiveRadar } from '@nivo/radar';
import resultData from '../../data/resultData';
import styled from 'styled-components';

type ChartContainerProps = {
  size?: number;
};

const ChartContainer = styled.div<ChartContainerProps>`
  width: ${({ size }) => size || 500}px;
  height: ${({ size }) => size || 500}px;
`;

export default function ResultChart({ size = 500 }: ChartContainerProps) {
  return (
    <ChartContainer>
      <ResponsiveRadar
        data={resultData}
        keys={['score']}
        indexBy="type"
        maxValue="auto"
        margin={{ top: 50, right: 80, bottom: 50, left: 150 }}
        curve="linearClosed"
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [['darker', 1]] }}
        gridLevels={5}
        gridShape="circular"
        gridLabelOffset={36}
        enableDots={false}
        colors={['#4F63FF']}
        fillOpacity={0.4}
        blendMode="normal"
        animate={true}
        motionConfig="gentle"
        isInteractive={true}
      />
    </ChartContainer>
  );
}
