import styled from 'styled-components';
import Footer from '../components/Footer';
import FlowButtonSection from '../features/main/FlowButtonSection';
import HeroSection from '../features/main/HeroSection';
import TitleSection from '../features/main/TitleSection';
import MessageSection from '../features/main/MessageSection';
import StartCTASection from '../features/main/StartCTASection';
import QuestionSection from '../features/main/QuestionSection';
import CharacterBanner from '../features/main/CharacterBanner';

const PageWrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function MainPage() {
  return (
    <PageWrapper>
      <HeroSection />
      <TitleSection />
      <MessageSection />
      <FlowButtonSection />
      <QuestionSection />
      <StartCTASection />
      <CharacterBanner />
      <Footer />
    </PageWrapper>
  );
}
