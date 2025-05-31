import React, { useState } from "react";
import styled from "styled-components";
import { ContentArea, ContentContainer, SectionTitle } from "./CommonStyles";

const ProjectContentContainer = styled(ContentContainer)`
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

// 프로젝트 탭
const ProjectTabs = styled.div`
  display: flex;
  gap: 30px;
  margin: 25px 0;
  padding-bottom: 15px;
  border-bottom: 2px solid rgba(102, 126, 234, 0.1);
`;

const ProjectTab = styled.button<{ isActive: boolean }>`
  padding: 12px 0;
  border: none;
  background: none;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  color: ${props => props.isActive ? '#667eea' : '#94a3b8'};
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: -17px;
    left: 0;
    width: 100%;
    height: 3px;
    background: ${props => props.isActive ? 'linear-gradient(90deg, #667eea, #764ba2)' : 'transparent'};
    border-radius: 2px;
    transition: all 0.3s ease;
  }

  &:hover {
    color: ${props => props.isActive ? '#667eea' : '#667eea'};
    transform: translateY(-2px);
  }
`;

// 프로젝트 그리드
const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr); /* 6열 고정 */
  grid-template-rows: repeat(2, 1fr); /* 2행 고정 */
  gap: 15px;
  margin-top: 20px;
  height: calc(100vh - 380px); /* 전체 높이 조금 줄임 */
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto;
    height: auto;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    height: auto;
  }
`;

// 프로젝트 카드
const ProjectCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  box-shadow: 
    0 8px 20px rgba(0, 0, 0, 0.06),
    0 3px 8px rgba(0, 0, 0, 0.04),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  border: 2px solid rgba(102, 126, 234, 0.3);
  position: relative;
  padding: 15px;
  
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #667eea, #764ba2, #f093fb);
  }
  
  &:hover {
    transform: translateY(-5px) scale(1.03);
    border-color: rgba(102, 126, 234, 0.5);
    box-shadow: 
      0 15px 30px rgba(0, 0, 0, 0.12),
      0 6px 15px rgba(0, 0, 0, 0.06),
      inset 0 1px 0 rgba(255, 255, 255, 1);
  }
`;

// 프로젝트 정보
const ProjectInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
`;

// 프로젝트 제목
const ProjectTitle = styled.h4`
  font-size: 1.2rem;
  margin-bottom: 4px;
  color: #334155;
  font-weight: 700;
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

// 프로젝트 기간
const ProjectPeriod = styled.div`
  font-size: 0.8rem;
  color: #667eea;
  margin-bottom: 6px;
  font-weight: 600;
  padding: 2px 8px;
  background: rgba(102, 126, 234, 0.1);
  border-radius: 8px;
  display: inline-block;
  width: fit-content;
`;

// 프로젝트 역할
const ProjectRole = styled.div`
  font-size: 0.9rem;
  color: #64748b;
  margin-bottom: 8px;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1.3;
  
  span.role-label {
    color: #667eea;
    font-weight: 600;
    font-size: 0.8rem;
    background: rgba(102, 126, 234, 0.1);
    padding: 2px 6px;
    border-radius: 6px;
    margin-right: 6px;
    border: 1px solid rgba(102, 126, 234, 0.2);
  }
`;

// 기술 태그 컨테이너
const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: auto;
`;

// 기술 태그
const Tag = styled.span`
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  color: #667eea;
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 600;
  border: 1px solid rgba(102, 126, 234, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    transform: translateY(-1px);
  }
`;

// 모달 스타일
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalContent = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(15px);
  border-radius: 24px;
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  padding: 40px;
  box-shadow: 
    0 35px 70px rgba(0, 0, 0, 0.2),
    0 15px 35px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
  border: 2px solid rgba(255, 255, 255, 0.3);
  
  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(148, 163, 184, 0.1);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #667eea, #764ba2);
    border-radius: 3px;
  }
`;

const ModalImage = styled.div`
  width: 100%;
  height: 300px;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: 16px;
  margin-bottom: 25px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ModalTitle = styled.h3`
  font-size: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 20px;
  font-weight: 800;
`;

const ModalInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-bottom: 30px;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 15px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 8px;
  }
`;

const InfoLabel = styled.span`
  font-size: 1rem;
  color: #64748b;
  font-weight: 600;
  min-width: 120px;
  
  @media (max-width: 768px) {
    min-width: auto;
  }
`;

const InfoContent = styled.div`
  font-size: 1rem;
  color: #334155;
  flex: 1;
`;

const ModalDescription = styled.div`
  margin-bottom: 30px;
`;

const DescriptionTitle = styled.h4`
  font-size: 1.3rem;
  color: #334155;
  margin-bottom: 15px;
  font-weight: 700;
`;

const DescriptionContent = styled.p`
  font-size: 1rem;
  color: #64748b;
  line-height: 1.7;
  white-space: pre-line;
  padding: 20px;
  background: rgba(248, 250, 252, 0.8);
  border-radius: 16px;
  border-left: 4px solid #667eea;
`;

const ModalLinks = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 25px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LinkButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #64748b;
  font-size: 1.5rem;
  font-weight: bold;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

  &:hover {
    background: rgba(255, 255, 255, 1);
    color: #334155;
    transform: scale(1.1);
  }
`;

interface Project {
  id: number | string;
  title: string;
  period: string;
  role: string;
  skills: string[];
  description: string;
  serviceUrl?: string;
  githubUrl?: string;
  image: string;
  isTeamProject: boolean;
}

interface ProjectSectionProps {
  projects: Project[];
}

const ProjectSection: React.FC<ProjectSectionProps> = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'team' | 'single'>('all');

  const teamProjects = projects.filter(project => project.isTeamProject);
  const singleProjects = projects.filter(project => !project.isTeamProject);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  const renderProjectCard = (project: Project) => (
    <ProjectCard 
      key={project.id}
      onClick={() => handleProjectClick(project)}
    >
      <ProjectInfo>
        <ProjectTitle>{project.title}</ProjectTitle>
        <ProjectPeriod>{project.period}</ProjectPeriod>
        <ProjectRole>
          <span className="role-label">Part</span>
          {project.role}
        </ProjectRole>
        <TagContainer>
          {project.skills.slice(0, 3).map((skill, index) => (
            <Tag key={index}>{skill}</Tag>
          ))}
          {project.skills.length > 3 && (
            <Tag>+{project.skills.length - 3}</Tag>
          )}
        </TagContainer>
      </ProjectInfo>
    </ProjectCard>
  );

  const renderProjects = () => {
    switch (activeTab) {
      case 'team':
        return teamProjects.map(renderProjectCard);
      case 'single':
        return singleProjects.map(renderProjectCard);
      default:
        return projects.map(renderProjectCard);
    }
  };

  return (
    <ContentArea>
      <ProjectContentContainer>
        <SectionTitle>프로젝트</SectionTitle>
        
        <ProjectTabs>
          <ProjectTab 
            isActive={activeTab === 'all'} 
            onClick={() => setActiveTab('all')}
          >
            전체 ({projects.length})
          </ProjectTab>
          <ProjectTab 
            isActive={activeTab === 'team'} 
            onClick={() => setActiveTab('team')}
          >
            팀 프로젝트 ({teamProjects.length})
          </ProjectTab>
          <ProjectTab 
            isActive={activeTab === 'single'} 
            onClick={() => setActiveTab('single')}
          >
            개인 프로젝트 ({singleProjects.length})
          </ProjectTab>
        </ProjectTabs>

        <ProjectGrid>
          {renderProjects()}
        </ProjectGrid>
      </ProjectContentContainer>

      {selectedProject && (
        <ModalOverlay onClick={handleCloseModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={handleCloseModal}>×</CloseButton>
            <ModalImage>
              {selectedProject.image ? (
                <img src={selectedProject.image} alt={selectedProject.title} />
              ) : (
                <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 16L8.58579 11.4142C9.36683 10.6332 10.6332 10.6332 11.4142 11.4142L16 16M14 14L15.5858 12.4142C16.3668 11.6332 17.6332 11.6332 18.4142 12.4142L20 14M14 8H14.01M6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20Z" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </ModalImage>
            <ModalTitle>{selectedProject.title}</ModalTitle>
            
            <ModalInfo>
              <InfoRow>
                <InfoLabel>프로젝트 기간</InfoLabel>
                <InfoContent>{selectedProject.period}</InfoContent>
              </InfoRow>
              <InfoRow>
                <InfoLabel>담당 역할</InfoLabel>
                <InfoContent>{selectedProject.role}</InfoContent>
              </InfoRow>
              <InfoRow>
                <InfoLabel>프로젝트 유형</InfoLabel>
                <InfoContent>{selectedProject.isTeamProject ? '팀 프로젝트' : '개인 프로젝트'}</InfoContent>
              </InfoRow>
              <InfoRow>
                <InfoLabel>사용 기술</InfoLabel>
                <InfoContent>
                  <TagContainer>
                    {selectedProject.skills.map((skill, index) => (
                      <Tag key={index}>{skill}</Tag>
                    ))}
                  </TagContainer>
                </InfoContent>
              </InfoRow>
            </ModalInfo>

            <ModalDescription>
              <DescriptionTitle>프로젝트 소개</DescriptionTitle>
              <DescriptionContent>{selectedProject.description}</DescriptionContent>
            </ModalDescription>

            {(selectedProject.serviceUrl || selectedProject.githubUrl) && (
              <ModalLinks>
                {selectedProject.serviceUrl && (
                  <LinkButton href={selectedProject.serviceUrl} target="_blank" rel="noopener noreferrer">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    서비스 보기
                  </LinkButton>
                )}
                {selectedProject.githubUrl && (
                  <LinkButton href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                  </LinkButton>
                )}
              </ModalLinks>
            )}
          </ModalContent>
        </ModalOverlay>
      )}
    </ContentArea>
  );
};

export default ProjectSection;