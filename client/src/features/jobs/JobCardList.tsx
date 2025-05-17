import styled from 'styled-components';
import JobCard from './JobCard';
import type { Job } from '../../types';
import { motion } from 'framer-motion';
const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 1000px;
  width: 80vw;
`;
const MotionListWrapper = motion(ListWrapper);

function getDday(postedAt: string): string {
  const today = new Date();
  const postDate = new Date(postedAt);
  const diff = Math.floor((today.getTime() - postDate.getTime()) / (1000 * 60 * 60 * 24));
  const due = 30 - diff;
  return due > 0 ? `D-${due}` : '마감';
}
export default function JobCardList({ jobs }: { jobs: Job[] }) {
  return (
    <MotionListWrapper>
      {jobs.length > 0
        ? jobs.map((job) => <JobCard key={job.id} job={job} dDay={getDday(job.postedAt)} />)
        : ''}
    </MotionListWrapper>
  );
}
