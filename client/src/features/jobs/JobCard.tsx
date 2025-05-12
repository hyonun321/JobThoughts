import styled from 'styled-components';

const Card = styled.div`
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const Badge = styled.span`
  background: #e9f0ff;
  color: #2d4de0;
  padding: 0.3rem 0.8rem;
  border-radius: 999px;
  font-size: 12px;
`;

const Right = styled.div`
  text-align: right;
`;

type Job = {
  id: number;
  company: string;
  title: string;
  career: string;
  education: string;
  type: string;
  location: string;
};

export default function JobCard({ job }: { job: Job }) {
  return (
    <Card>
      <Info>
        <strong>{job.company}</strong>
        <div>{job.title}</div>
        <div>
          <Badge>{job.career}</Badge>
          <Badge>{job.education}</Badge>
          <Badge>{job.type}</Badge>
          <Badge>{job.location}</Badge>
        </div>
      </Info>
      <Right>
        <div>D-8</div>
        <button>입사 지원</button>
      </Right>
    </Card>
  );
}
