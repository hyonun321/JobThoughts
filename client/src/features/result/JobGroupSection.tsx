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
  padding: clamp(5px, 5vw, 50px);
`;

const TitleContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

// 제목 텍스트 부분
const TextArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  h3 {
    font-size: clamp(${theme.fontSize.xs}, 2vw, ${theme.fontSize.lg});
    margin: 0 0 clamp(10px, 5vw, 30px) 0;
  }
`;

const H2Wrapper = styled.div`
  margin-right: -130px;

  h2 {
    font-size: clamp(${theme.fontSize.xs}, 3vw, ${theme.fontSize.xl});
    margin: 0;
  }

  h2 span {
    color: ${theme.colors.primary};
  }
`;

const ImageArea = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  align-items: flex-end;
  height: clamp(100px, 20vw, 200px);

  img {
    width: clamp(130px, 37vw, 350px);
    height: auto;
    object-fit: contain;
    z-index: 10;
  }
`;

const TopTitle = styled.div`
  width: fit-content;
  margin-bottom: clamp(12px, 2vw, 20px);
  background-color: #f5f9ff;
  color: ${theme.colors.primary};
  padding: 8px 16px;
  border-radius: 100px;
  box-shadow: 2px 3px 1px rgba(200, 224, 255, 1);
  font-size: clamp(${theme.fontSize.xxs}, 2vw, ${theme.fontSize.lg});
  font-weight: ${theme.fontWeight.medium};
`;

// 직업 리스트 전체 레이아웃 O
const JobListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(16px, 3vw, 32px);
`;

// 계열별 직업 리스트 레이아웃 O
const JobGroup = styled.div`
  display: flex;
  gap: 15px;

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 5px;
    img {
      display: none;
    }
  }
`;

// 계열 레이아웃
const Category = styled.div`
  display: flex;
  align-items: center;
  width: clamp(160px, 20vw, 250px);
  flex-shrink: 0;
  background-color: #e0ecff;
  border-radius: clamp(8px, 2vw, 30px);
  box-shadow: 4px 4px 4px rgba(200, 224, 255, 1);

  img {
    width: clamp(100px, 12vw, 150px);
    height: clamp(120px, 15vw, 170px);
    object-fit: contain;
  }

  h4 {
    font-size: clamp(${theme.fontSize.xs}, 1.5vw, ${theme.fontSize.lg});
    margin-left: -5px;
  }

  @media (max-width: 640px) {
    width: 100%;

    img {
      display: none;
    }

    h4 {
      margin: 0 auto;
      padding: 12px;
    }
  }
`;

// 직업 버튼 레이아웃 O
const JobButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: clamp(4px, 1vw, 12px);
  flex: 1;
  align-items: center;
  padding: clamp(10px, 2vw, 20px);
  background-color: rgb(245, 249, 255);
  border-radius: clamp(8px, 2vw, 30px);
  box-shadow: 4px 4px 4px rgba(200, 224, 255);
`;

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
