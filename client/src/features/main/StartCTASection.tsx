import React from 'react';
import { useNavigate } from 'react-router-dom';
import FullScreenSection from '../../components/FullScreenSection';
import Button from '../../components/Button';

export default function StartCTASection() {
  const navigate = useNavigate();
  return (
    <FullScreenSection>
      <Button
        onClick={() => navigate('/test')}
        text={'지금 시작하기'}
        padding={'20px 72px'}
        size="lg"
        color={'primary'}
        transition={'all 0.3s ease'}
        backgroundColor={'white'}
        hoverColor={'primary'}
        boxShadow={'0px 0px 10px rgba(79, 99, 255, 0.4)'}
      />
    </FullScreenSection>
  );
}
