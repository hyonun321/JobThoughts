import styled from 'styled-components';
import Image from '../../components/Image';
import bagIcon from '../../assets/icons/icon-bag.svg';
import dollarIcon from '../../assets/icons/icon-dollar.svg';
import capIcon from '../../assets/icons/icon-edu-hat.svg';
import calendarIcon from '../../assets/icons/icon-calendar.svg';
import typeIcon from '../../assets/icons/icon-paper.svg';
import locationIcon from '../../assets/icons/icon-map.svg';
import shareIcon from '../../assets/icons/icon-share.svg';
import starIcon from '../../assets/icons/icon-star.svg';
import { theme } from '../../styles/theme';

type Job = {
  id: number;
  job: string;
  company: string;
  title: string;
  career: string;
  education: string;
  salary: string;
  workDays: string;
  location: string;
  type: string;
  postedAt: string;
};

type Props = {
  job: Job;
  dDay: string;
};

const Card = styled.div`
  background: white;
  border-radius: 24px;
  padding: 2.5rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.06);
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const TitleInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.8rem;
`;

const Company = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #555;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 700;
`;

const Share = styled.div`
  font-size: 12px;
  color: #888;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  cursor: pointer;
`;

const Right = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  height: 100%;
`;

const Scrap = styled.button`
  background: white;
  border: 1px solid #ccc;
  border-radius: 30%;
  font-size: ${theme.fontSize.xs};
  color: ${theme.colors.gray600};
  flex-direction: column;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Dday = styled.div`
  position: absolute;
  top: 14%;
  right: 3.64rem;
  background: #f0f4ff;
  color: #333;
  padding: 0.2rem;
  font-size: ${theme.fontSize.xs};
  border-radius: 12px;
  width: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.white};
  font-weight: light;
  cursor:
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

const ApplyButton = styled.button`
  background: #3f5eff;
  color: ${theme.colors.white};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  height: 48px;
  width: 120px;
  border: none;
  font-size: 1rem;
  cursor: pointer;
`;

const Divider = styled.hr`
  border: none;
  height: 1px;
  background: #eee;
  margin: 0.5rem 0;
`;

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 1rem;
  column-gap: 1.5rem;
`;

const DetailItem = styled.div`
  display: flex;
  gap: 0.6rem;
  font-size: 14px;
  align-items: center;
  color: ${theme.colors.gray900};
`;

const Label = styled.div`
  font-weight: 500;
  min-width: 60px;
  color: ${theme.colors.gray900};
`;

const HighlightDesc = styled.div`
  color: ${theme.colors.primary};
`;

export default function JobCard({ job, dDay }: Props) {
  return (
    <Card>
      <Top>
        <TitleInfo>
          <Company>{job.company}</Company>
          <Title>{job.title}</Title>
          <Share>
            <Image src={shareIcon} width="14px" />
            공유하기
          </Share>
        </TitleInfo>
        <Right>
          <Dday>{dDay}</Dday>
          <Scrap>
            <Image src={starIcon} width="20px" style={{ cursor: 'pointer' }} />
            스크랩
          </Scrap>
          <ApplyButton>입사 지원</ApplyButton>
        </Right>
      </Top>
      <Divider />
      <DetailGrid>
        <DetailItem>
          <Image src={bagIcon} width="20px" />
          <Label>경력</Label>
          <HighlightDesc>{job.career}</HighlightDesc>
        </DetailItem>
        <DetailItem>
          <Image src={dollarIcon} width="20px" />
          <Label>급여</Label>
          <div>{job.salary}</div>
        </DetailItem>
        <DetailItem>
          <Image src={capIcon} width="20px" />
          <Label>학력</Label>
          <HighlightDesc>{job.education}</HighlightDesc>
        </DetailItem>
        <DetailItem>
          <Image src={calendarIcon} width="20px" />
          <Label>근무요일</Label>
          <div>{job.workDays}</div>
        </DetailItem>
        <DetailItem>
          <Image src={typeIcon} width="20px" />
          <Label>근무형태</Label>
          <HighlightDesc>{job.type}</HighlightDesc>
        </DetailItem>
        <DetailItem>
          <Image src={locationIcon} width="20px" />
          <Label>근무지역</Label>
          <div>{job.location}</div>
        </DetailItem>
      </DetailGrid>
    </Card>
  );
}
