import React from "react";
import styled from "styled-components";

// 스크롤 컨테이너 스타일
export const ScrollContainer = styled.div`
  height: 100vh;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
`;

// 섹션 컨테이너 스타일
export const Section = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  scroll-snap-align: start;
  position: relative;
`;

// 섹션 컨텐츠 영역 스타일 (기본) - 프로필과 동일한 그라디언트 배경
export const ContentArea = styled.div`
  flex: 1;
  padding: 20px 70px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
    pointer-events: none;
  }
`;

// 컨텐츠 공통 컨테이너
export const ContentContainer = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(15px);
  border-radius: 24px;
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.1),
    0 10px 20px rgba(0, 0, 0, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  padding: 40px;
  margin: 20px 0;
  flex: 1;
  overflow-y: auto;
  border: 1px solid rgba(255, 255, 255, 0.3);
  position: relative;
  z-index: 1;
  
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
  
  &:hover {
    box-shadow: 
      0 30px 60px rgba(0, 0, 0, 0.12),
      0 15px 25px rgba(0, 0, 0, 0.08),
      inset 0 1px 0 rgba(255, 255, 255, 0.9);
  }
`;

// 네비게이션 도트
export const DotNavigation = styled.div`
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 100;
`;

export const Dot = styled.div<{ active: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${(props) => 
    props.active 
      ? "linear-gradient(135deg, #667eea, #764ba2)" 
      : "rgba(148, 163, 184, 0.6)"
  };
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${(props) => 
    props.active 
      ? "0 4px 15px rgba(102, 126, 234, 0.3)" 
      : "0 2px 8px rgba(0, 0, 0, 0.1)"
  };

  &:hover {
    background: ${(props) => 
      props.active 
        ? "linear-gradient(135deg, #667eea, #764ba2)" 
        : "linear-gradient(135deg, #94a3b8, #667eea)"
    };
    transform: scale(1.3);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
  }
`;

// 뒤로가기 버튼
export const BackButton = styled.button`
  position: absolute;
  top: 50px;
  left: 70px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #667eea;
  box-shadow: 
    0 8px 25px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  z-index: 10;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1) translateY(-2px);
    box-shadow: 
      0 12px 35px rgba(0, 0, 0, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.9);
    background: rgba(255, 255, 255, 1);
  }

  svg {
    transition: transform 0.3s ease;
    width: 24px;
    height: 24px;
  }

  &:hover svg {
    transform: translateX(-3px);
  }
`;

// 섹션 제목
export const SectionTitle = styled.h3`
  font-size: 2.2rem;
  font-weight: 800;
  margin-bottom: 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
  display: inline-block;
  padding-bottom: 15px;
  
  &:after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 60px;
    height: 4px;
    background: linear-gradient(90deg, #667eea, #764ba2);
    border-radius: 2px;
  }
`;
