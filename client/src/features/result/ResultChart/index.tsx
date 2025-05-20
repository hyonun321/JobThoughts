import { ResponsiveRadar } from '@nivo/radar';
import { Label, Wrapper } from './styles';

type ResultDataItem = {
  type: string;
  score: number;
};

type ResultChartProps = {
  data: { type: string; score: number }[];
  onLabelClick: (label: string) => void;
  activeLabel: string | null;
};

export default function ResultChart({ data, onLabelClick, activeLabel }: ResultChartProps) {
  type LabelPosition = {
    label: string;
    x: number;
    y: number;
  };

  const labels: LabelPosition[] = data.map((d: ResultDataItem, i: number) => {
    const angle = (i / data.length) * 2 * Math.PI - Math.PI / 2;
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
        data={data}
        keys={['score']}
        indexBy="type"
        margin={{ top: 30, right: 30, bottom: 30, left: 50 }}
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
