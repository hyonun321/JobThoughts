import styled from 'styled-components';

const Card = styled.div`
  background: #f9fbff;
  border-radius: 16px;
  padding: 24px;
  margin: 24px 0;
`;

export default function ResultDescriptionCard() {
  return (
    <Card>
      <h3>특징</h3>
      <p>나의 능력을 충분히 발휘할 수 있을 때 보람과 만족을 느낍니다.</p>
      <h3>직업 선택</h3>
      <p>능력을 발휘할 기회가 주어지는 직업을 선택할 것입니다.</p>
      <h3>직업 생활</h3>
      <p>어려운 일도 하나씩 해결하며 성취감을 느낍니다.</p>
    </Card>
  );
}
