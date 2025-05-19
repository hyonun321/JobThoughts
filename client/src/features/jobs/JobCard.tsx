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
import type { Job } from '../../types';
import { motion } from 'framer-motion';
import useScrollAnimation from '../../hooks/useScrollAnimation'; // ✅ 수정됨

type Props = {
  job: Job;
  dDay: string;
};

const Card = styled.div`
  background: ${theme.colors.deco2};
  border-radius: 3rem;
  padding: 2.5rem;
  box-shadow:
    8px 12px 30px rgba(63, 94, 255, 0.15),
    inset -1px -1px 3px ${theme.colors.background + '80'}; /* 안쪽 그림자 */
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  cursor: default;
  z-index: 1;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TitleInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.8rem;
`;

const Company = styled.div`
  font-size: clamp(0.8rem, 2vw, 1.2rem);
  font-weight: 500;
  color: #555;
`;

const Title = styled.div`
  font-size: clamp(1.2rem, 3vw, 2rem);
  font-weight: 700;
`;

const Share = styled.div`
  font-size: 12px;
  color: ${theme.colors.gray500};
  display: flex;
  width: 80px;
  align-items: center;
  gap: 0.3rem;
  cursor: pointer;
  &:hover {
    color: ${theme.colors.gray800}; // 또는 다른 색상
  }
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

const ScrapButton = styled.button`
  background-color: ${theme.colors.deco2};
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

  &:hover {
    background-color: ${theme.colors.white}; // 또는 hover 시 색상
  }
`;

const Dday = styled.div`
  position: absolute;
  top: -20px;
  right: 18px;
  background: #f0f4ff;
  color: ${theme.colors.black};
  padding: 0.2rem;
  font-size: clamp(0.7rem, 2vw, 0.9rem);
  border-radius: 12px;
  width: clamp(4rem, 15vw, 5rem);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.white};
  font-weight: light;
  cursor: default;
  z-index: 1;
  box-shadow: 0 3px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 640px) {
    right: 25px;
  }
`;

const ApplyButton = styled.a`
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  height: 48px;
  width: 120px;
  border: none;
  font-size: clamp(0.9rem, 2vw, 1.2rem);
  cursor: pointer;
  text-decoration: none;
  transition: all 0.02s ease-in;

  &:hover {
    background: ${theme.colors.area};
  }

  &:active {
    box-shadow: inset 0 3px 3px rgba(0, 0, 0, 0.3);
    transform: scale(0.98);
  }
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
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const DetailItem = styled.div`
  display: flex;
  gap: 0.6rem;
  font-size: clamp(0.9rem, 2vw, 1rem);
  align-items: center;
  color: ${theme.colors.gray900};
`;
const ButtonWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const Label = styled.div`
  font-weight: 500;
  min-width: 60px;
  color: ${theme.colors.gray900};
`;

const HighlightDesc = styled.div`
  color: ${theme.colors.primary};
`;
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};
const MotionCard = motion(Card);

export default function JobCard({ job, dDay }: Props) {
  const isScrapButton = false;
  const { ref, controls } = useScrollAnimation(0.1);
  return (
    <MotionCard
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={cardVariants}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
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
          <ButtonWrapper>
            <Dday>{dDay}</Dday>
            {isScrapButton && (
              <ScrapButton>
                <Image src={starIcon} width="20px" style={{ cursor: 'pointer' }} />
                스크랩
              </ScrapButton>
            )}
            <ApplyButton href={job.link} target="_blank" rel="noopener noreferrer">
              입사 지원
            </ApplyButton>
          </ButtonWrapper>
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
          <Label>고용형태</Label>
          <HighlightDesc>{job.type}</HighlightDesc>
        </DetailItem>
        <DetailItem>
          <Image src={locationIcon} width="20px" />
          <Label>근무지역</Label>
          <div>{job.location}</div>
        </DetailItem>
      </DetailGrid>
    </MotionCard>
  );
}
