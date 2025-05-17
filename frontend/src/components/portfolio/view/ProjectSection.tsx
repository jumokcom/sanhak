import React from "react";
import styled from "styled-components";
import { ContentArea, ContentContainer, SectionTitle } from "./CommonStyles";

// 프로젝트 그리드
const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

// 프로젝트 카드
const ProjectCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  }
`;

// 프로젝트 이미지
const ProjectImage = styled.div`
  height: 180px;
  background-color: #e2e8f0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 프로젝트 정보
const ProjectInfo = styled.div`
  padding: 15px;
`;

// 프로젝트 제목
const ProjectTitle = styled.h4`
  font-size: 1.2rem;
  margin-bottom: 8px;
  color: #2d3748;
`;

// 프로젝트 기간
const ProjectPeriod = styled.div`
  font-size: 0.9rem;
  color: #718096;
  margin-bottom: 10px;
`;

// 프로젝트 설명
const ProjectDescription = styled.p`
  font-size: 0.9rem;
  color: #4a5568;
  line-height: 1.4;
  margin-bottom: 15px;
`;

// 기술 태그 컨테이너
const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

// 기술 태그
const Tag = styled.span`
  background-color: #ebf4ff;
  color: #3182ce;
  padding: 4px 10px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
`;

interface Project {
  id: number;
  title: string;
  period: string;
  description: string;
  image: string;
  tags: string[];
}

interface ProjectSectionProps {
  projects: Project[];
}

const ProjectSection: React.FC<ProjectSectionProps> = ({ projects }) => {
  return (
    <ContentArea>
      <ContentContainer>
        <SectionTitle>프로젝트</SectionTitle>
        <ProjectGrid>
          {projects.map((project) => (
            <ProjectCard key={project.id}>
              <ProjectImage>
                {project.image ? (
                  <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 16L8.58579 11.4142C9.36683 10.6332 10.6332 10.6332 11.4142 11.4142L16 16M14 14L15.5858 12.4142C16.3668 11.6332 17.6332 11.6332 18.4142 12.4142L20 14M14 8H14.01M6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20Z" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </ProjectImage>
              <ProjectInfo>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectPeriod>{project.period}</ProjectPeriod>
                <ProjectDescription>{project.description}</ProjectDescription>
                <TagContainer>
                  {project.tags.map((tag, index) => (
                    <Tag key={index}>{tag}</Tag>
                  ))}
                </TagContainer>
              </ProjectInfo>
            </ProjectCard>
          ))}
        </ProjectGrid>
      </ContentContainer>
    </ContentArea>
  );
};

export default ProjectSection;
