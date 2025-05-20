import styled from 'styled-components';
import { motion } from 'framer-motion';

export const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 1000px;
  width: 80vw;
`;
export const MotionListWrapper = motion(ListWrapper);
