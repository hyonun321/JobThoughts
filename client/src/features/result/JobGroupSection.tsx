import styled from 'styled-components';
import jobRecommendationData from '../../data/jobRecommendationData';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { theme } from '../../styles/theme';

// 곰돌이 이미지
import JobIntroBear from '../../assets/bears/job-introduce-bear.png';
import WorkBear from '../../assets/bears/bears-1.svg';
import LookingBear from '../../assets/bears/bears-2.svg';
import Bookbear from '../../assets/bears/bears-3.svg';
import MedicalBear from '../../assets/bears/bears-4.svg';
import NatureBear from '../../assets/bears/bears-5.svg';
import EngineerBear from '../../assets/bears/bears-6.png';
import ArtBear from '../../assets/bears/bears-7.png';

const categoryImages: Record<string, string> = {
  계열무관: LookingBear,
  인문: Bookbear,
  사회: WorkBear,
  공학: EngineerBear,
  의학: MedicalBear,
  자연: NatureBear,
  예체능: ArtBear,
};

// 전체 레이아웃
const Section = styled.div`
  border: 1px solid green;
  max-width: 1200px;
  margin: 0 auto;
  padding: 50px;
`;

const JobInfoText = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 20vw;
  }
`;

const SmallTitle = styled.span`
  background-color: #f5f9ff;
  color: ${theme.colors.primary};
  padding: 16px 24px;
  border-radius: 100px;
  box-shadow: 2px 3px 1px rgb(200, 224, 255, 1);
  font-size: ${theme.fontSize.ml};
  font-weight: ${theme.fontWeight.medium};
`;

const Highlight = styled.span`
  color: ${theme.colors.primary};
`;

// 계열별 직업 리스트 레이아웃
const Group = styled.div`
  border: 1px solid blue;
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 24px;
`;

// 계열 레이아웃
const Category = styled.div`
  display: flex;
  align-items: center;
  width: 250px;
  flex-shrink: 0;

  img {
    width: 150px;
    height: 170px;
    object-fit: contain;
  }

  h4 {
    font-size: 22px;
    margin: 0;
    white-space: nowrap; /* 줄바꿈 방지 */
  }
`;

// 직업 버튼 레이아웃
const JobList = styled.div`
  border: 1px solid red;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  flex: 1;
`;

export default function JobGroupSection() {
  const navigate = useNavigate();

  const handleClick = (job: string) => {
    navigate('/jobs', { state: { selectedJob: job } });
  };

  return (
    <Section>
      <JobInfoText>
        <div>
          <SmallTitle>나의 가치관과 관련이 높은 직업</SmallTitle>
          <h2>
            <Highlight>자율성</Highlight>도 챙기고, <Highlight>보수</Highlight>도 놓치기 싫은 당신!
            이런 직업은 어때요?
          </h2>
          <h3>직업을 클릭하면, 실시간 채용 공고까지 확인할 수 있어요.</h3>
        </div>
        <div>
          <img src={JobIntroBear} alt="직업을 소개하는 곰돌이" />
        </div>
      </JobInfoText>
      {jobRecommendationData.map(({ category, jobs }) => (
        <Group key={category}>
          <Category>
            <div>
              <img src={categoryImages[category]} alt={category} />
            </div>
            <h4>{category}</h4>
          </Category>
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
