import Image from '@/components/Image';
import bagIcon from '@/assets/icons/icon-bag.svg';
import dollarIcon from '@/assets/icons/icon-dollar.svg';
import capIcon from '@/assets/icons/icon-edu-hat.svg';
import calendarIcon from '@/assets/icons/icon-calendar.svg';
import typeIcon from '@/assets/icons/icon-paper.svg';
import locationIcon from '@/assets/icons/icon-map.svg';
import shareIcon from '@/assets/icons/icon-share.svg';
import starIcon from '@/assets/icons/icon-star.svg';
import type { Job } from '@/types';
import useScrollAnimation from '@/hooks/useScrollAnimationOrigin';
import { useState } from 'react';
import { Toast } from '@/components/Toast';
import {
  ApplyButton,
  ButtonWrapper,
  cardVariants,
  Company,
  Dday,
  DetailGrid,
  DetailItem,
  Divider,
  HighlightDesc,
  Label,
  MotionCard,
  Right,
  ScrapButton,
  Share,
  Title,
  TitleInfo,
  Top,
} from './styles';

type Props = {
  job: Job;
  dDay: string;
};

export default function JobCard({ job, dDay }: Props) {
  const isScrapButton = false;
  const { ref, controls } = useScrollAnimation(0.1, true);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(job.link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500); // 2초 후 사라짐
    } catch (err) {
      console.error('클립보드 복사 실패:', err);
    }
  };
  return (
    <>
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
            <Share onClick={handleCopyLink}>
              <Image src={shareIcon} width="16px" />
              복사하기
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
      {copied && <Toast>링크가 복사되었습니다!</Toast>}
    </>
  );
}
