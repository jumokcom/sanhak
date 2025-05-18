import React from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  padding: 30px;
  margin: 20px 0;
  border: 3px solid #3182ce;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 30px;
  color: #2d3748;
  position: relative;
  display: inline-block;
  padding-bottom: 8px;
  
  &:after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 3px;
    background-color: #3182ce;
    border-radius: 2px;
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  background-color: #f7fafc;
  border-radius: 8px;
  border: 2px dashed #cbd5e0;
`;

const EmptyStateText = styled.p`
  font-size: 1.1rem;
  color: #718096;
  margin-bottom: 20px;
  text-align: center;
`;

const AddButton = styled.button`
  padding: 12px 16px;
  background-color: #4299e1;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    background-color: #3182ce;
  }
  
  svg {
    width: 18px;
    height: 18px;
  }
`;

// 인터페이스
interface ProjectEditSectionProps {
  // 여기에 필요한 props 정의
}

const ProjectEditSection: React.FC<ProjectEditSectionProps> = () => {
  return (
    <Container>
      <Title>프로젝트</Title>
      
      <EmptyState>
        <EmptyStateText>등록된 프로젝트가 없습니다. 추가 버튼을 클릭하여 프로젝트를 등록해보세요.</EmptyStateText>
        <AddButton>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          프로젝트 추가
        </AddButton>
      </EmptyState>
    </Container>
  );
};

export default ProjectEditSection;
