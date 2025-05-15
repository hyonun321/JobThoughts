import styled from 'styled-components';
import closeButton from '../../assets/icons/icon-close-button.png';
import resultValuesData from '../../data/resultValuesData';

const Card = styled.div`
  position: relative;
  width: clamp(200px, 40vw, 500px);
  min-height: 300px;
  display: flex;
  flex-direction: column;
  background: #f9fbff;
  border-radius: 16px;
  padding: 5px 24px;
  box-shadow:
    inset 10px 10px 10px 4px rgba(255, 255, 255, 0.6),
    inset -5px -5px 15px 4px rgba(193, 215, 249, 1);

  & p {
    padding-left: 10px;
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
  width: 120px;
  background-color: white;
  border-radius: 100px;
  box-shadow: 0px 1px 3px rgba(79, 99, 255, 0.5);
  padding: 5px 0px;
  text-align: center;
  font-size: 20px;
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
        <p>{value}</p>
      </div>
      <div>
        <SectionTitle>직업 선택</SectionTitle>
        <p>{choice}</p>
      </div>
      <div>
        <SectionTitle>직업 생활</SectionTitle>
        <p>{work}</p>
      </div>
    </Card>
  );
}
