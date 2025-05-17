import React from "react";
import styled from "styled-components";
import { ContentArea, ContentContainer, SectionTitle } from "./CommonStyles";

// 자기소개 스타일
const AboutMeContent = styled.div`
  font-size: 1.1rem;
  line-height: 1.7;
  color: #4a5568;
  white-space: pre-line;
`;

interface AboutMeSectionProps {
  content: string;
}

const AboutMeSection: React.FC<AboutMeSectionProps> = ({ content }) => {
  return (
    <ContentArea>
      <ContentContainer>
        <SectionTitle>자기소개</SectionTitle>
        <AboutMeContent>{content}</AboutMeContent>
      </ContentContainer>
    </ContentArea>
  );
};

export default AboutMeSection;
