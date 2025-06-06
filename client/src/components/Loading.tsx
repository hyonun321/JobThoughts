import styled, { keyframes } from 'styled-components';
import Text from './Text';

export default function Loading({ message = '문항을 불러오는 중이에요...' }: { message?: string }) {
  return (
    <LoadingContainer>
      <Spinner />
      <Text as="p" size="m" weight="medium" color="gray700">
        {message}
      </Text>
    </LoadingContainer>
  );
}

// 스타일 정의
const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 150px;
  gap: 1.5rem;
  z-index: 2;
`;

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  width: 35px;
  height: 35px;
  border: 4px solid ${({ theme }) => theme.colors.gray300};
  border-top: 4px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  animation: ${rotate} 1s linear infinite;
`;
