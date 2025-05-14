import { useState } from 'react';
import styled from 'styled-components';
import Dropdown from '../../components/Dropdown';

const FilterBarWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  gap: 4rem;
`;

export default function FilterBar() {
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [sort, setSort] = useState('');

  return (
    <FilterBarWrapper>
      <Dropdown
        options={['서울', '대전', '대구', '부산']}
        selected={location}
        onSelect={setLocation}
        placeholder="지역"
      />
      <Dropdown
        options={['정규직', '계약직', '아르바이트', '프리랜서']}
        selected={type}
        onSelect={setType}
        placeholder="고용형태"
      />
      <Dropdown
        options={['등록오름차순', '등록내림차순']}
        selected={sort}
        onSelect={setSort}
        placeholder="정렬"
      />
    </FilterBarWrapper>
  );
}
