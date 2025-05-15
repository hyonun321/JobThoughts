import styled from 'styled-components';
import closeButton from '../../assets/icons/icon-close-button.png';

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

export default function ResultDescriptionCard({
  label,
  onClose,
}: {
  label: string;
  onClose: () => void;
}) {
  return (
    <Card>
      <CloseButton onClick={onClose}>
        <img src={closeButton} style={{ width: '20px', height: '20px' }} />
      </CloseButton>
      <div>
        <SectionTitle>특징</SectionTitle>
        <p>나의 능력을 충분히 발휘할 수 있을 때 보람과 만족을 느낍니다.</p>
      </div>
      <div>
        <SectionTitle>직업 선택</SectionTitle>
        <p>능력을 발휘할 기회가 주어지는 직업을 선택할 것입니다.</p>
      </div>
      <div>
        <SectionTitle>직업 생활</SectionTitle>
        <p>어려운 일도 하나씩 해결하며 성취감을 느낍니다.</p>
      </div>
    </Card>
  );
}
