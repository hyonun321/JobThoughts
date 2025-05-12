import styled from 'styled-components';

const FilterBarWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const FilterButton = styled.button`
  background: #4d6fff;
  color: white;
  border: none;
  padding: 0.5rem 1.2rem;
  border-radius: 999px;
  font-size: 14px;
  cursor: pointer;
`;

export default function FilterBar() {
  return (
    <FilterBarWrapper>
      <FilterButton>지역 ⏷</FilterButton>
      <FilterButton>고용형태 ⏷</FilterButton>
      <FilterButton>경력 ⏷</FilterButton>
    </FilterBarWrapper>
  );
}
