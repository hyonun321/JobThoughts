import closeButton from '@/assets/icons/icon-close-button.png';
import resultValuesData from '@/data/resultValuesData';
import { Card, CloseButton, SectionContent, SectionTitle } from './styles';

type ResultDescriptionCardProps = {
  label: string;
  onClose: () => void;
  chartData: { type: string; score: number; description?: string }[];
};

export default function ResultDescriptionCard({ label, onClose }: ResultDescriptionCardProps) {
  const result = resultValuesData.find((item) => item.type === label);
  if (!result) return null;

  const { value, choice, work } = result.description;
  return (
    <Card>
      <CloseButton onClick={onClose}>
        <img src={closeButton} alt="닫기 버튼" style={{ width: '20px', height: '20px' }} />
      </CloseButton>
      <div>
        <SectionTitle>특징</SectionTitle>
        <SectionContent>{value}</SectionContent>
      </div>
      <div>
        <SectionTitle>직업 선택</SectionTitle>
        <SectionContent>{choice}</SectionContent>
      </div>
      <div>
        <SectionTitle>직업 생활</SectionTitle>
        <SectionContent>{work}</SectionContent>
      </div>
    </Card>
  );
}
