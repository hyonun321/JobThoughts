import { useNavigate } from 'react-router-dom';
import Button from '@/components/Button';

import JobIntroBear from '@/assets/bears/job-introduce-bear.svg';
import {
  Category,
  H2Wrapper,
  ImageArea,
  JobButtonContainer,
  JobGroup,
  JobListContainer,
  Section,
  TextArea,
  TitleContainer,
  TopTitle,
  categoryImages,
} from './styles';
type JobsByMajor = {
  [major: string]: string[];
};

type ResultJobListProps = {
  topValues: string[];
  jobsByMajor: JobsByMajor;
};

export default function JobGroupSection({ topValues, jobsByMajor }: ResultJobListProps) {
  const navigate = useNavigate();

  const handleClick = (job: string) => {
    navigate('/jobs', { state: { selectedJob: job } });
  };

  return (
    <Section>
      <TopTitle>나의 가치관과 관련이 높은 직업</TopTitle>
      <TitleContainer>
        <TextArea>
          <H2Wrapper>
            <h2 style={{ padding: '0px', margin: '0px' }}>
              <span>{topValues[0]}</span>도 챙기고, <span>{topValues[1]}</span>도 놓치기 싫은 당신!
            </h2>
            <h2 style={{ padding: '0px', margin: '0px' }}>이런 직업은 어때요?</h2>
          </H2Wrapper>

          <h3 style={{ marginTop: '10px', color: '#212121' }}>
            직업을 클릭하면, 실시간 채용 공고까지 확인할 수 있어요.
          </h3>
        </TextArea>
        <ImageArea>
          <img src={JobIntroBear} alt="직업을 소개하는 곰돌이" />
        </ImageArea>
      </TitleContainer>
      <JobListContainer>
        {Object.entries(jobsByMajor).map(([category, jobs]) => (
          <JobGroup key={category}>
            <Category>
              <img src={categoryImages[category]} alt={category} />
              <h4>{category}</h4>
            </Category>
            <JobButtonContainer>
              {jobs.map((job) => (
                <Button key={job} text={job} variant="job" onClick={() => handleClick(job)} />
              ))}
            </JobButtonContainer>
          </JobGroup>
        ))}
      </JobListContainer>
    </Section>
  );
}
