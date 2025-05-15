import styled from 'styled-components';
import jobRecommendationData from '../../data/jobRecommendationData';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';

const Section = styled.div`
  margin-top: 32px;
`;

const Group = styled.div`
  margin-bottom: 24px;
`;

const JobList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export default function JobGroupSection() {
  const navigate = useNavigate();

  const handleClick = (job: string) => {
    navigate('/jobs', { state: { selectedJob: job } });
  };

  return (
    <Section>
      <h2>이런 직업은 어때요?</h2>
      {jobRecommendationData.map(({ category, jobs, emoji }) => (
        <Group key={category}>
          <h4>
            {emoji} {category}
          </h4>
          <JobList>
            {jobs.map((job) => (
              <Button
                key={job}
                text={job}
                variant="job"
                onClick={() => handleClick(job)}
                width="fit-content"
              >
                {job}
              </Button>
            ))}
          </JobList>
        </Group>
      ))}
    </Section>
  );
}
