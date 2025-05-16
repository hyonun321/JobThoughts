import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { theme } from '../../styles/theme';

// 곰돌이 이미지
import JobIntroBear from '../../assets/bears/job-introduce-bear.svg';
import WorkBear from '../../assets/bears/bears-1.svg';
import EducationBear from '../../assets/bears/bears-8.svg';
import LookingBear from '../../assets/bears/bears-2.svg';
import Bookbear from '../../assets/bears/bears-3.svg';
import MedicalBear from '../../assets/bears/bears-4.svg';
import NatureBear from '../../assets/bears/bears-5.svg';
import EngineerBear from '../../assets/bears/bears-6.svg';
import ArtBear from '../../assets/bears/bears-7.svg';

const categoryImages: Record<string, string> = {
  계열무관: LookingBear,
  인문: Bookbear,
  사회: WorkBear,
  교육: EducationBear,
  공학: EngineerBear,
  의학: MedicalBear,
  자연: NatureBear,
  예체능: ArtBear,
};

// 전체 레이아웃
const Section = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: clamp(20px, 5vw, 50px);
`;

const JobInfoArea = styled.div`
  display: flex;
  align-items: center;

  img {
    width: clamp(100px, 30vw, 300px);
    transform: translateY(24px);
  }
`;

const SmallTitle = styled.span`
  background-color: #f5f9ff;
  color: ${theme.colors.primary};
  padding: clamp(10px, 2vw, 16px) clamp(16px, 3vw, 24px);
  border-radius: 100px;
  box-shadow: 2px 3px 1px rgba(200, 224, 255, 1);
  font-size: clamp(14px, 2vw, ${theme.fontSize.ml});
  font-weight: ${theme.fontWeight.medium};
`;

// 제목 텍스트 부분
const TextArea = styled.div`
  ${SmallTitle} {
    display: inline-block;
    margin-bottom: clamp(12px, 2vw, 20px);
  }

  h2 {
    font-size: clamp(18px, 3vw, 28px);
    margin: clamp(5px, 1vw, 10px) 0;
  }

  h2 span {
    color: ${theme.colors.primary};
  }

  h3 {
    font-size: clamp(14px, 2vw, 20px);
    font-weight: ${theme.fontWeight.medium};
    margin: 0 0 clamp(30px, 5vw, 60px) 0;
  }
`;

// 계열별 직업 리스트 레이아웃
const Group = styled.div`
  display: flex;
  align-items: stretch;
  gap: 15px;
  margin-bottom: 24px;
`;

// 계열 레이아웃
const Category = styled.div`
  display: flex;
  align-items: center;
  width: clamp(180px, 20vw, 250px);
  flex-shrink: 0;
  background-color: #e0ecff;
  border-radius: 30px;
  box-shadow: 4px 4px 4px rgba(200, 224, 255, 1);

  img {
    width: clamp(100px, 12vw, 150px);
    height: clamp(120px, 15vw, 170px);
    object-fit: contain;
  }

  h4 {
    font-size: clamp(16px, 2vw, 22px);
    margin: 0;
    white-space: nowrap;
  }
`;

// 직업 버튼 레이아웃
const JobList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: clamp(4px, 1vw, 12px);
  flex: 1;
  align-items: center;
  padding-left: clamp(10px, 2vw, 20px);
  background-color: rgb(245, 249, 255);
  border-radius: 30px;
  box-shadow: 4px 4px 4px rgba(200, 224, 255, 1);
`;

type JobsByMajor = {
  [major: string]: string[];
};

type ResultJobListProps = {
  jobsByMajor: JobsByMajor;
};

export default function JobGroupSection({ jobsByMajor }: ResultJobListProps) {
  const navigate = useNavigate();

  const handleClick = (job: string) => {
    navigate('/jobs', { state: { selectedJob: job } });
  };

  return (
    <Section>
      <JobInfoArea>
        <TextArea>
          <SmallTitle>나의 가치관과 관련이 높은 직업</SmallTitle>
          <h2>
            <span>자율성</span>도 챙기고, <span>보수</span>도 놓치기 싫은 당신! 이런 직업은 어때요?
          </h2>
          <h3>직업을 클릭하면, 실시간 채용 공고까지 확인할 수 있어요.</h3>
        </TextArea>
        <div>
          <img src={JobIntroBear} alt="직업을 소개하는 곰돌이" />
        </div>
      </JobInfoArea>
      {Object.entries(jobsByMajor).map(([category, jobs]) => (
        <Group key={category}>
          <Category>
            <img src={categoryImages[category]} alt={category} />
            <h4>{category}</h4>
          </Category>
          <JobList>
            {jobs.map((job) => (
              <Button
                key={job}
                text={job}
                variant="job"
                onClick={() => handleClick(job)}
                padding="clamp(6px, 1vw, 12px) clamp(10px, 2vw, 20px)"
                width="fit-content"
              />
            ))}
          </JobList>
        </Group>
      ))}
    </Section>
  );
}
