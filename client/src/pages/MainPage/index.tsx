import Footer from '@/components/Footer';
import HeroSection from '@/features/main/HeroSection';
import FlowButtonSection from '@/features/main/FlowButtonSection';
import TitleSection from '@/features/main/TitleSection';
import MessageSection from '@/features/main/MessageSection';
import StartCTASection from '@/features/main/StartCTASection';
import QuestionSection from '@/features/main/QuestionSection';
import DividerSection from '@/features/main/DividerSection';
import { PageWrapper } from './styles';

export default function MainPage() {
  return (
    <PageWrapper>
      <HeroSection />
      <TitleSection />
      <MessageSection />
      <DividerSection />
      <FlowButtonSection />
      <QuestionSection />
      <StartCTASection />
      <Footer />
    </PageWrapper>
  );
}
