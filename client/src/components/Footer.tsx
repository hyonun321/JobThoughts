import styled from 'styled-components';

import Bear1 from '../assets/bears/bears-1.svg';
import Bear2 from '../assets/bears/bears-2.svg';
import Bear3 from '../assets/bears/bears-3.svg';
import Bear4 from '../assets/bears/bears-4.svg';
import Bear5 from '../assets/bears/bears-5.svg';
import Logo from '../assets/logo/job-logo.svg';
import IconGithub from '../assets/icons/icon-github.svg';
import IconFigma from '../assets/icons/icon-figma.svg';
import IconNotion from '../assets/icons/icon-notion.svg';

import { theme } from '../styles/theme';

const FooterWrapper = styled.footer`
  background: ${theme.colors.black};
  color: ${theme.colors.white};
  padding: 40px 0;
  text-align: center;
  width: 100%;
`;

const BearsRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 25px;
  margin-bottom: 40px;
  flex-wrap: wrap;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
`;

const BearItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  img {
    width: clamp(160px, 30vw, 250px);
  }
`;

const LogoBox = styled.div`
  img {
    width: clamp(80px, 20vw, 140px);
    height: clamp(80px, 20vw, 140px);
    display: block;
    margin: 0 auto;
  }
`;

const Copyright = styled.div`
  margin-bottom: 28px;
  font-size: clamp(${theme.fontSize.xxs}, 2vw, ${theme.fontSize.s});
  color: ${theme.colors.white};
`;

const IconRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
`;

const BearName = styled.div`
  font-size: clamp(${theme.fontSize.s}, 2vw, ${theme.fontSize.ml});
  color: ${theme.colors.white};
`;

function Footer() {
  return (
    <FooterWrapper>
      <BearsRow>
        <BearItem>
          <img src={Bear1} alt="곰돌이1" />
          <BearName>김현훈</BearName>
        </BearItem>
        <BearItem>
          <img src={Bear2} alt="곰돌이2" />
          <BearName>김민서</BearName>
        </BearItem>
        <BearItem>
          <img src={Bear3} alt="곰돌이3" />
          <BearName>백세진</BearName>
        </BearItem>
        <BearItem>
          <img src={Bear4} alt="곰돌이4" />
          <BearName>염승아</BearName>
        </BearItem>
        <BearItem>
          <img src={Bear5} alt="곰돌이5" />
          <BearName>황주경</BearName>
        </BearItem>
      </BearsRow>

      <LogoBox>
        <img src={Logo} alt="로고" />
      </LogoBox>

      <Copyright>© 2025 JobThoughts. All rights reserved.</Copyright>

      <IconRow>
        <a
          href="https://github.com/hyonun321/JobThoughts"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={IconGithub} alt="GitHub" width={25} height={25} />
        </a>
        <a
          href="https://www.figma.com/design/kzBz8vu4o70rNzyNu9p76g/3%EC%A1%B0-%EC%9E%A1%EC%83%9D%EA%B0%81---%EC%9C%A0%EB%A0%88%EC%B9%B4-%EB%AF%B8%EB%8B%88%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B82?node-id=142-6&p=f&t=EYDy3VcovqG4nNeW-0"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={IconFigma} alt="Figma" width={25} height={25} />
        </a>
        <a
          href="https://www.notion.so/03-Team-Project-1ecbbd280f318080b3f1e61be738fdd6"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={IconNotion} alt="Notion" width={25} height={25} />
        </a>
      </IconRow>
    </FooterWrapper>
  );
}

export default Footer;
