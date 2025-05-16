import styled from 'styled-components';
import Dropdown from '../../components/Dropdown';

const FilterBarWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  gap: 4rem;
`;
type Props = {
  locationFilter: string;
  setLocationFilter: (value: string) => void;
  typeFilter: string;
  setTypeFilter: (value: string) => void;
  sortFilter: string;
  setSortFilter: (value: string) => void;
};

export default function FilterBar({
  locationFilter,
  setLocationFilter,
  typeFilter,
  setTypeFilter,
  sortFilter,
  setSortFilter,
}: Props) {
  return (
    <FilterBarWrapper>
      <Dropdown
        options={['서울', '대전', '대구', '부산']}
        selected={locationFilter}
        onSelect={setLocationFilter}
        placeholder="지역"
      />
      <Dropdown
        options={['정규직', '계약직', '아르바이트', '프리랜서']}
        selected={typeFilter}
        onSelect={setTypeFilter}
        placeholder="고용형태"
      />
      <Dropdown
        options={['등록오름차순', '등록내림차순']}
        selected={sortFilter}
        onSelect={setSortFilter}
        placeholder="정렬"
      />
    </FilterBarWrapper>
  );
}
