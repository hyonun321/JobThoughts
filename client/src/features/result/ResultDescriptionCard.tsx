import styled from 'styled-components';
import closeButton from '../../assets/icons/icon-close-button.png';
import resultValuesData from '../../data/resultValuesData';
import { theme } from '../../styles/theme';

const Card = styled.div`
  position: relative;
  width: clamp(200px, 42vw, 500px);
  min-height: clamp(300px, 50vw, 400px);
  display: flex;
  flex-direction: column;
  background: #f9fbff;
  border-radius: 16px;
  padding: clamp(5px, 1vw, 10px) clamp(20px, 3vw, 30px) clamp(5px, 1vw, 10px) clamp(15px, 2vw, 24px);
  box-shadow:
    inset 10px 10px 10px 4px rgba(255, 255, 255, 0.6),
    inset -5px -5px 15px 4px rgba(193, 215, 249, 1);

  & p {
    padding-left: clamp(8px, 1vw, 10px);
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}`;

const SectionTitle = styled.h3`
  width: clamp(80px, 20vw, 100px);
  background-color: white;
  border-radius: 100px;
  box-shadow: 0px 1px 3px rgba(79, 99, 255, 0.5);
  padding: clamp(3px, 0.8vw, 5px) clamp(8px, 1vw, 12px);
  text-align: center;
  font-size: clamp(12px, 2vw, ${theme.fontSize.m});
`;

const SectionContent = styled.p`
  font-size: clamp(12px, 2vw, ${theme.fontSize.m});
  line-height: clamp(18px, 4vw, 28px);
`;

type ResultDescriptionCardProps = {
  label: string;
  onClose: () => void;
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
