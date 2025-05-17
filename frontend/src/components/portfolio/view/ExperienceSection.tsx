import React from "react";
import styled from "styled-components";
import { ContentArea, ContentContainer, SectionTitle } from "./CommonStyles";

// 타임라인 컨테이너
const TimelineContainer = styled.div`
  padding: 20px 0;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    left: 20px;
    top: 0;
    bottom: 0;
    width: 3px;
    background-color: #3182ce;
  }
`;

// 타임라인 항목
const TimelineItem = styled.div`
  margin-bottom: 30px;
  padding-left: 60px;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    left: 12px;
    top: 5px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: #3182ce;
    border: 3px solid white;
    box-shadow: 0 0 0 3px #3182ce;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

// 기간
const Period = styled.div`
  font-size: 1rem;
  font-weight: bold;
  color: #3182ce;
  margin-bottom: 5px;
`;

// 기관/회사명
const Organization = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 5px;
`;

// 설명
const Description = styled.div`
  font-size: 1rem;
  color: #4a5568;
  line-height: 1.5;
`;

const ExperienceContentContainer = styled(ContentContainer)`
  border: 3px solid #3182ce;
  box-sizing: border-box;
`;

interface Experience {
  id: number;
  period: string;
  organization: string;
  role: string;
  description: string;
}

interface ExperienceSectionProps {
  experiences: Experience[];
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experiences,
}) => {
  return (
    <ContentArea>
      <ExperienceContentContainer>
        <SectionTitle>이력</SectionTitle>
        <TimelineContainer>
          {experiences.map((exp) => (
            <TimelineItem key={exp.id}>
              <Period>{exp.period}</Period>
              <Organization>{exp.organization}</Organization>
              <Description>{exp.role}</Description>
              <Description>{exp.description}</Description>
            </TimelineItem>
          ))}
        </TimelineContainer>
      </ExperienceContentContainer>
    </ContentArea>
  );
};

export default ExperienceSection;
