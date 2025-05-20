import styled from 'styled-components';
import loading1 from '@/assets/bears/tele-bear.svg';
import loading2 from '@/assets/bears/hi-bear.svg';
import loading3 from '@/assets/bears/poison-bear.svg';
import loading4 from '@/assets/bears/setting-bear.svg';
import loading5 from '@/assets/bears/stop-bear.svg';
export const images = [loading1, loading2, loading3, loading4, loading5];

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;
