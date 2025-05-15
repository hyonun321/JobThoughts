import { useLocation } from 'react-router-dom';
import JobListHeader from '../features/jobs/JobListHeader';
import JobCardList from '../features/jobs/JobCardList';
import Image from '../components/Image';
import holdingBear from '../assets/bears/job-holding-bear.svg';
import styled from 'styled-components';
import tool from '../assets/icons/icon-tool.svg';
import megaphone from '../assets/icons/icon-megaphone.svg';
import pin from '../assets/icons/icon-pin.svg';

const BackgroundWrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  min-height: 200vh;
  background: linear-gradient(to bottom, #ffffff 35%, rgba(172, 196, 255, 0.75) 71%, #d8cfff 100%);
`;

const Icon = styled.div<{ top: string; left?: string; right?: string }>`
  position: absolute;
  top: ${({ top }) => top};
  left: ${({ left }) => left || 'auto'};
  right: ${({ right }) => right || 'auto'};
  width: 100px;
  z-index: 0;
`;

const HeaderWithBear = styled.div`
  position: relative;
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
  padding-top: 200px;
`;

const BearImage = styled.div`
  position: absolute;
  top: 12px;
  left: 50%;
  transform: translateX(-50%);
  width: 350px;
  z-index: 1;
`;

const SectionWrapper = styled.section`
  width: 100vw;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export default function JobListPage() {
  const location = useLocation();
  const selectedJob = location.state?.selectedJob || '웹 디자이너';

  return (
    <BackgroundWrapper>
      <SectionWrapper>
        <HeaderWithBear>
          <BearImage>
            <Image src={holdingBear} alt="job-holding-bear" width="100%" />
          </BearImage>
          <JobListHeader selectedJob={selectedJob} />
        </HeaderWithBear>
        <JobCardList selectedJob={selectedJob} />
      </SectionWrapper>
      <Icon top="25%" left="0%">
        <Image src={tool} width="15vw" motion="float" />
      </Icon>
      <Icon top="90%" left="5%">
        <Image src={pin} width="15vw" motion="float" />
      </Icon>
      <Icon top="60%" left="85%">
        <Image src={megaphone} width="15vw" motion="float" />
      </Icon>
    </BackgroundWrapper>
  );
}
