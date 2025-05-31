import React from "react";
import styled from "styled-components";
import { ContentArea, ContentContainer, SectionTitle } from "./CommonStyles";

const AboutMeContentContainer = styled(ContentContainer)`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(15px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  box-shadow: 
    0 35px 70px rgba(0, 0, 0, 0.2),
    0 15px 35px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
  transition: all 0.4s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 
      0 45px 90px rgba(0, 0, 0, 0.25),
      0 20px 45px rgba(0, 0, 0, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 1);
  }
`;

const AboutMeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 30px;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 25px;
  }
`;

const AboutMeCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 
    0 15px 35px rgba(0, 0, 0, 0.08),
    0 5px 15px rgba(0, 0, 0, 0.04),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  padding: 30px;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
  position: relative;
  min-height: 400px;
  
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #667eea, #764ba2, #f093fb);
    border-radius: 20px 20px 0 0;
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 
      0 20px 45px rgba(0, 0, 0, 0.12),
      0 8px 20px rgba(0, 0, 0, 0.06),
      inset 0 1px 0 rgba(255, 255, 255, 1);
  }
  
  /* 각 카드별 다른 색상 강조 */
  &:nth-child(1):before {
    background: linear-gradient(90deg, #667eea, #764ba2);
  }
  
  &:nth-child(2):before {
    background: linear-gradient(90deg, #764ba2, #f093fb);
  }
  
  &:nth-child(3):before {
    background: linear-gradient(90deg, #f093fb, #f5576c);
  }
`;

const AboutMeCardTitle = styled.h4`
  font-size: 1.4rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 20px;
  position: relative;
  padding-bottom: 12px;
  
  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 40px;
    height: 3px;
    background: linear-gradient(90deg, #667eea, #764ba2);
    border-radius: 2px;
  }
`;

const AboutMeCardContent = styled.div`
  font-size: 1rem;
  line-height: 1.7;
  color: #475569;
  white-space: pre-line;
  flex: 1;
  padding: 15px 0;
  
  /* 스크롤이 필요한 경우 */
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(148, 163, 184, 0.1);
    border-radius: 2px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #667eea, #764ba2);
    border-radius: 2px;
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  color: #94a3b8;
  text-align: center;
  gap: 15px;
  
  svg {
    width: 60px;
    height: 60px;
  }
  
  p {
    font-size: 1.1rem;
    font-weight: 500;
  }
`;

interface AboutMeSectionProps {
  content: {
    growth: string;
    personality: string;
    experience: string;
  };
}

const AboutMeSection: React.FC<AboutMeSectionProps> = ({ content }) => {
  const hasContent = content.growth || content.personality || content.experience;
  
  if (!hasContent) {
    return (
      <ContentArea>
        <AboutMeContentContainer>
          <SectionTitle>자기소개</SectionTitle>
          <EmptyState>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeWidth="2"/>
              <circle cx="12" cy="7" r="4" strokeWidth="2"/>
            </svg>
            <p>아직 자기소개가 작성되지 않았습니다.</p>
          </EmptyState>
        </AboutMeContentContainer>
      </ContentArea>
    );
  }

  return (
    <ContentArea>
      <AboutMeContentContainer>
        <SectionTitle>자기소개</SectionTitle>
        <AboutMeGrid>
          {content.growth && (
            <AboutMeCard>
              <AboutMeCardTitle>성장과정</AboutMeCardTitle>
              <AboutMeCardContent>{content.growth}</AboutMeCardContent>
            </AboutMeCard>
          )}
          
          {content.personality && (
            <AboutMeCard>
              <AboutMeCardTitle>성격소개</AboutMeCardTitle>
              <AboutMeCardContent>{content.personality}</AboutMeCardContent>
            </AboutMeCard>
          )}
          
          {content.experience && (
            <AboutMeCard>
              <AboutMeCardTitle>핵심경험</AboutMeCardTitle>
              <AboutMeCardContent>{content.experience}</AboutMeCardContent>
            </AboutMeCard>
          )}
        </AboutMeGrid>
      </AboutMeContentContainer>
    </ContentArea>
  );
};

export default AboutMeSection;