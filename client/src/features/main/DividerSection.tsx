import styled from 'styled-components';

const Divider = styled.div`
  height: 35vh;
  background: linear-gradient(to bottom, #ffffff 0%, ${({ theme }) => theme.colors.white} 100%);
  width: 100%;


  }
`;

export default function DividerSection() {
  return <Divider />;
}
