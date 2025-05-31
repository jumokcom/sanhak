import React from "react";
import styled from "styled-components";

// 포트폴리오 섹션과 일관성 있는 Footer 디자인
const FooterContainer = styled.footer`
  background: linear-gradient(135deg, #764ba2 0%, #667eea 100%); /* 헤더와 반대 방향 */
  padding: 0 70px;
  font-size: 0.9rem;
  position: relative;
  z-index: 10;
  box-shadow: 
    0 -8px 32px rgba(0, 0, 0, 0.2), /* 위쪽 그림자 */
    0 -4px 16px rgba(0, 0, 0, 0.15),
    0 -2px 8px rgba(0, 0, 0, 0.1);
  
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 60% 60%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
    pointer-events: none;
  }
  
  /* 상단 강조 오버레이로 경계 명확화 */
  &:after {
    content: "";
    position: absolute;
    top: -2px;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, 
      transparent 0%, 
      rgba(0, 0, 0, 0.1) 20%,
      rgba(0, 0, 0, 0.15) 50%, 
      rgba(0, 0, 0, 0.1) 80%,
      transparent 100%
    );
    filter: blur(2px);
  }
`;

const FooterContent = styled.div`
  padding: 25px 0;
  text-align: center;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  z-index: 2;
  position: relative;
`;

const FooterText = styled.span`
  font-weight: 500;
  text-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    text-shadow: 
      0 1px 5px rgba(0, 0, 0, 0.3),
      0 0 15px rgba(255, 255, 255, 0.3);
    filter: brightness(1.1);
  }
`;

const CopyrightText = styled(FooterText)`
  font-size: 0.85rem;
  opacity: 0.9;
`;

const DeveloperBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }
`;

const DeveloperIcon = styled.div`
  width: 20px;
  height: 20px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(240, 147, 251, 0.3);
  
  svg {
    width: 12px;
    height: 12px;
    color: white;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <DeveloperBadge>
          <DeveloperIcon>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeWidth="2"/>
              <circle cx="12" cy="7" r="4" strokeWidth="2"/>
            </svg>
          </DeveloperIcon>
          <FooterText>developed by 고재우</FooterText>
        </DeveloperBadge>
        <CopyrightText>&copy; 2024 Sanhak team2</CopyrightText>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
