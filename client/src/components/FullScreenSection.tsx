import styled from 'styled-components';

const FullScreenSection = styled.section`
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column; /* 필요시 row로 바꿔도 됨 */
  justify-content: center;
  align-items: center;
  scroll-snap-align: start; /* 선택 사항 */
`;

export default FullScreenSection;
