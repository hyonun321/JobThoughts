import styled from 'styled-components';
import WorkBear from '@/assets/bears/office-bear.svg';
import EducationBear from '@/assets/bears/study-bear.svg';
import LookingBear from '@/assets/bears/tele-bear.svg';
import Bookbear from '@/assets/bears/pencil-bear.svg';
import MedicalBear from '@/assets/bears/doctor-bear.svg';
import NatureBear from '@/assets/bears/poison-bear.svg';
import EngineerBear from '@/assets/bears/setting-bear.svg';
import ArtBear from '@/assets/bears/draw-bear.svg';
import { theme } from '@/styles/theme';

export const categoryImages: Record<string, string> = {
  계열무관: LookingBear,
  인문: Bookbear,
  사회: WorkBear,
  교육: EducationBear,
  공학: EngineerBear,
  의학: MedicalBear,
  자연: NatureBear,
  예체능: ArtBear,
};

export const Section = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: clamp(5px, 5vw, 50px);
`;

export const TitleContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1rem;
  }
`;

export const TextArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  h3 {
    font-size: clamp(${theme.fontSize.xs}, 2vw, ${theme.fontSize.lg});
    margin: 0 0 clamp(10px, 5vw, 30px) 0;
  }

  @media (max-width: 640px) {
    align-items: center;
  }
`;

export const H2Wrapper = styled.div`
  margin-right: -130px;

  h2 {
    font-size: clamp(${theme.fontSize.xs}, 3vw, ${theme.fontSize.xl});
    margin: 0;
  }

  h2 span {
    color: ${theme.colors.primary};
  }

  @media (max-width: 640px) {
    margin-right: 0;
  }
`;

export const ImageArea = styled.div`
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

  @media (max-width: 640px) {
    display: none;
  }
`;

export const TopTitle = styled.div`
  width: fit-content;
  margin-bottom: clamp(12px, 2vw, 20px);
  background-color: #f5f9ff;
  color: ${theme.colors.primary};
  padding: 8px 16px;
  border-radius: 100px;
  box-shadow: 2px 3px 1px rgba(200, 224, 255, 1);
  font-size: clamp(${theme.fontSize.xxs}, 2vw, ${theme.fontSize.lg});
  font-weight: ${theme.fontWeight.medium};

  @media (max-width: 640px) {
    margin-left: auto;
    margin-right: auto;
  }
`;

export const JobListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(16px, 3vw, 32px);
`;

export const JobGroup = styled.div`
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

export const Category = styled.div`
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

export const JobButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: clamp(5px, 1vw, 12px);
  flex: 1;
  align-items: center;
  padding: clamp(10px, 2vw, 20px);
  background-color: rgb(245, 249, 255);
  border-radius: clamp(8px, 2vw, 30px);
  box-shadow: 4px 4px 4px rgba(200, 224, 255);

  @media (max-width: 640px) {
    justify-content: center;
    box-shadow: none;

    button {
      box-shadow: none;
    }
  }
`;
