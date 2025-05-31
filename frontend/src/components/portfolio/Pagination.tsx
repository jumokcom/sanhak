import React from "react";
import styled from "styled-components";

// 페이지네이션 컨테이너
const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 6px; /* 8px에서 6px로 줄임 */
  padding: 15px; /* 20px에서 15px로 줄임 */
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  box-shadow: 
    0 8px 25px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.3);
  max-width: fit-content;
  margin: 0 auto;
  overflow-x: auto;
  overflow-y: hidden;
  box-sizing: border-box;
  
  /* 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    display: none;
  }
  
  scrollbar-width: none;
  -ms-overflow-style: none;
  
  /* 모바일에서 버튼 크기 조정 */
  @media (max-width: 480px) {
    gap: 4px;
    padding: 12px;
  }
`;

// 페이지 버튼 스타일
const PageButton = styled.button<{ active?: boolean }>`
  width: 36px; /* 40px에서 36px로 줄임 */
  height: 36px; /* 40px에서 36px로 줄임 */
  border-radius: 10px;
  background: ${props => props.active 
    ? 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)' 
    : 'rgba(255, 255, 255, 0.8)'
  };
  color: ${props => props.active ? 'white' : '#475569'};
  border: 1px solid ${props => props.active 
    ? 'transparent' 
    : 'rgba(148, 163, 184, 0.3)'
  };
  cursor: pointer;
  font-weight: ${props => props.active ? '700' : '500'};
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem; /* 0.9rem에서 0.85rem로 줄임 */
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  
  /* 모바일에서 더 작게 */
  @media (max-width: 480px) {
    width: 32px;
    height: 32px;
    font-size: 0.8rem;
  }
  
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.5s ease;
  }
  
  &:hover {
    background: ${props => props.active 
      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
      : 'rgba(255, 255, 255, 0.95)'
    };
    border-color: ${props => props.active 
      ? 'transparent' 
      : 'rgba(118, 75, 162, 0.3)'
    };
    transform: translateY(-2px);
    box-shadow: 
      0 6px 15px rgba(0, 0, 0, 0.1), /* 사이즈 줄임 */
      ${props => props.active 
        ? '0 3px 10px rgba(118, 75, 162, 0.3)' 
        : '0 3px 10px rgba(0, 0, 0, 0.08)'
      };
  }
  
  &:hover:before {
    left: 100%;
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 
      0 2px 6px rgba(0, 0, 0, 0.08),
      ${props => props.active 
        ? '0 1px 4px rgba(118, 75, 162, 0.2)' 
        : '0 1px 4px rgba(0, 0, 0, 0.04)'
      };
  }
  
  &:focus {
    outline: none;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
`;

// 네비게이션 버튼 (이전/다음)
const NavButton = styled(PageButton)`
  width: 40px; /* 44px에서 40px로 줄임 */
  font-size: 0.9rem; /* 1rem에서 0.9rem로 줄임 */
  font-weight: 600;
  
  @media (max-width: 480px) {
    width: 32px;
    font-size: 0.8rem;
  }
  
  svg {
    width: 14px; /* 16px에서 14px로 줄임 */
    height: 14px;
    transition: transform 0.3s ease;
  }
  
  &:hover svg {
    transform: ${props => props.children?.toString().includes('‹') ? 'translateX(-2px)' : 'translateX(2px)'};
  }
`;

// 생략 인디케이터
const EllipsisIndicator = styled.div`
  width: 36px; /* 40px에서 36px로 줄임 */
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  font-weight: 600;
  font-size: 1rem; /* 1.1rem에서 1rem로 줄임 */
  
  @media (max-width: 480px) {
    width: 32px;
    height: 32px;
    font-size: 0.9rem;
  }
`;

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  // 표시할 페이지 버튼 수 설정
  const maxPageButtons = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
  let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);
  
  // startPage 조정
  if (endPage - startPage + 1 < maxPageButtons) {
    startPage = Math.max(1, endPage - maxPageButtons + 1);
  }
  
  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  // 첫 페이지와 마지막 페이지 생략 여부 확인
  const showStartEllipsis = startPage > 2;
  const showEndEllipsis = endPage < totalPages - 1;

  return (
    <PaginationContainer>
      {/* 이전 페이지 버튼 */}
      <NavButton 
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <polyline points="15,18 9,12 15,6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </NavButton>
      
      {/* 첫 페이지 */}
      {startPage > 1 && (
        <PageButton
          active={1 === currentPage}
          onClick={() => onPageChange(1)}
        >
          1
        </PageButton>
      )}
      
      {/* 시작 생략 */}
      {showStartEllipsis && <EllipsisIndicator>⋯</EllipsisIndicator>}
      
      {/* 페이지 번호 버튼 */}
      {pageNumbers.map(page => (
        <PageButton
          key={page}
          active={page === currentPage}
          onClick={() => onPageChange(page)}
        >
          {page}
        </PageButton>
      ))}
      
      {/* 끝 생략 */}
      {showEndEllipsis && <EllipsisIndicator>⋯</EllipsisIndicator>}
      
      {/* 마지막 페이지 */}
      {endPage < totalPages && (
        <PageButton
          active={totalPages === currentPage}
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </PageButton>
      )}
      
      {/* 다음 페이지 버튼 */}
      <NavButton 
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <polyline points="9,18 15,12 9,6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </NavButton>
    </PaginationContainer>
  );
};

export default Pagination;
