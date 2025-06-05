import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PortfolioCard from "./PortfolioCard";
import Pagination from "./Pagination";

// 전체 포트폴리오 컨테이너
const AllPortfolioContainer = styled.div`
  height: 100%;
  width: 100%;
  max-width: 100vw; /* 뷰포트 너비 초과 방지 */
  background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
  padding: 20px; /* 40px에서 20px로 줄임 */
  position: relative;
  overflow: hidden;
  box-sizing: border-box; /* 패딩 포함한 박스 사이징 */
  
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
`;

// 메인 콘텐츠 카드
const MainContentCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(15px);
  border-radius: 24px;
  padding: 30px; /* 40px에서 30px로 줄임 */
  height: calc(100% - 40px); /* 패딩 고려 */
  width: 100%;
  max-width: 100%; /* 너비 제한 */
  position: relative;
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.3);
  display: flex;
  flex-direction: column;
  box-sizing: border-box; /* 패딩 포함한 박스 사이징 */
  
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #764ba2, #667eea, #f093fb, #f5576c);
    border-radius: 24px 24px 0 0;
  }
`;

// 헤더 영역
const HeaderSection = styled.div`
  margin-bottom: 30px;
`;

// 섹션 제목 스타일
const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 15px;
`;

// 제목 아이콘
const TitleIcon = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #764ba2, #667eea);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(118, 75, 162, 0.3);
  
  svg {
    width: 20px;
    height: 20px;
    color: white;
  }
`;

// 부제목
const SubTitle = styled.p`
  font-size: 1.2rem;
  color: #64748b;
  font-weight: 500;
  margin-left: 55px;
`;

// 그리드 컨테이너
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 15px;
  height: 530px; /* 640px에서 530px로 조정 (250px 카드 x 2 + gap) */
  padding: 15px;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: 16px;
  border: 1px solid rgba(148, 163, 184, 0.2);
  box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 15px;
  overflow: hidden;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;

  /* 미디어 쿼리로 반응형 제어 */
  @media (max-width: 1400px) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 1fr);
    height: 795px; /* 4x3 그리드에 맞게 조정 */
  }

  @media (max-width: 1100px) {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(4, 1fr);
    height: 1060px; /* 3x4 그리드에 맞게 조정 */
    gap: 12px;
  }

  @media (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(5, 1fr);
    height: 1325px; /* 2x5 그리드에 맞게 조정 */
    gap: 10px;
    padding: 12px;
  }

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(10, 1fr);
    height: auto;
    max-height: 80vh;
    overflow-y: auto;
    gap: 8px;
    padding: 10px;
    
    /* 모바일 스크롤바 */
    &::-webkit-scrollbar {
      width: 4px;
    }
    
    &::-webkit-scrollbar-track {
      background: rgba(148, 163, 184, 0.1);
      border-radius: 2px;
    }
    
    &::-webkit-scrollbar-thumb {
      background: linear-gradient(135deg, #764ba2, #667eea);
      border-radius: 2px;
    }
  }
`;

// 카드 래퍼 - 새로운 스타일
const CardWrapper = styled.div`
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

// 빈 상태 컨테이너
const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
  color: #64748b;
  text-align: center;
  gap: 20px;
`;

// 빈 상태 아이콘
const EmptyIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, rgba(118, 75, 162, 0.1), rgba(102, 126, 234, 0.1));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  
  svg {
    width: 40px;
    height: 40px;
    color: #94a3b8;
  }
`;

// 빈 상태 메시지
const EmptyMessage = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #475569;
  margin-bottom: 8px;
`;

// 빈 상태 부메시지
const EmptySubMessage = styled.p`
  font-size: 1rem;
  color: #64748b;
  line-height: 1.5;
`;

// 로그인 유도 컴포넌트
const LoginPromptContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
  text-align: center;
  gap: 25px;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  border-radius: 20px;
  padding: 40px;
  border: 2px dashed rgba(102, 126, 234, 0.3);
`;

const LoginPromptIcon = styled.div`
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
  animation: float 3s ease-in-out infinite;
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  
  svg {
    width: 50px;
    height: 50px;
    color: white;
  }
`;

const LoginPromptTitle = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 10px;
`;

const LoginPromptMessage = styled.p`
  font-size: 1.1rem;
  color: #64748b;
  line-height: 1.6;
  max-width: 400px;
`;

// 페이지네이션 컨테이너
const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: auto;
  padding-top: 15px; /* 20px에서 15px로 줄임 */
  width: 100%;
  max-width: 100%;
  overflow-x: auto; /* 필요시 가로 스크롤 허용하되 숨김 */
  overflow-y: hidden;
  
  /* 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    display: none;
  }
  
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

// 포트폴리오 타입 정의
interface Portfolio {
  id: string;
  title: string;
  description: string;
  profileImage?: string;
}

interface AllPortfolioProps {
  portfolios: Portfolio[];
  itemsPerPage?: number;
  isLoggedIn?: boolean; // 로그인 상태 prop 추가
}

const AllPortfolio: React.FC<AllPortfolioProps> = ({
  portfolios,
  itemsPerPage = 10, // 기본 5x2 = 10개
  isLoggedIn = false, // 기본값 false
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [portfolioList, setPortfolioList] = useState<Portfolio[]>(portfolios);
  const [currentItems, setCurrentItems] = useState<Portfolio[]>([]);
  
  // 반응형에 따른 페이지당 아이템 수 조정
  const [itemsPerPageResponsive, setItemsPerPageResponsive] = useState(itemsPerPage);
  
  // 화면 크기에 따른 아이템 수 조정
  React.useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;
      if (width <= 500) {
        setItemsPerPageResponsive(10); // 1x10
      } else if (width <= 800) {
        setItemsPerPageResponsive(10); // 2x5
      } else if (width <= 1100) {
        setItemsPerPageResponsive(12); // 3x4
      } else if (width <= 1400) {
        setItemsPerPageResponsive(12); // 4x3
      } else {
        setItemsPerPageResponsive(10); // 5x2
      }
    };
    
    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);
  
  const totalPages = Math.ceil(portfolioList.length / itemsPerPageResponsive);

  useEffect(() => {
    setPortfolioList(portfolios);
  }, [portfolios]);

  useEffect(() => {
    // 현재 페이지에 표시할 포트폴리오 항목 계산
    const indexOfLastItem = currentPage * itemsPerPageResponsive;
    const indexOfFirstItem = indexOfLastItem - itemsPerPageResponsive;
    setCurrentItems(portfolioList.slice(indexOfFirstItem, indexOfLastItem));
  }, [currentPage, portfolioList, itemsPerPageResponsive]);

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 포트폴리오 삭제 처리
  const handleDeletePortfolio = (id: string) => {
    setPortfolioList((prevList) => prevList.filter((portfolio) => portfolio.id !== id));
    
    // 포트폴리오 삭제 후 페이지 조정
    if (currentItems.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <AllPortfolioContainer>
      <MainContentCard>
        <HeaderSection>
          <SectionTitle>
            <TitleIcon>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="3" y="3" width="7" height="7" strokeWidth="2" rx="1"/>
                <rect x="14" y="3" width="7" height="7" strokeWidth="2" rx="1"/>
                <rect x="14" y="14" width="7" height="7" strokeWidth="2" rx="1"/>
                <rect x="3" y="14" width="7" height="7" strokeWidth="2" rx="1"/>
              </svg>
            </TitleIcon>
            전체 포트폴리오
          </SectionTitle>
          <SubTitle>
            {portfolioList.length}개의 포트폴리오가 있습니다
          </SubTitle>
        </HeaderSection>
        
        {/* 로그인하지 않은 사용자에게 로그인 유도 메시지 표시 */}
        {!isLoggedIn ? (
          <LoginPromptContainer>
            <div>
              <LoginPromptTitle>로그인이 필요합니다</LoginPromptTitle>
              <LoginPromptMessage>
                전체 포트폴리오를 살펴보려면 로그인이 필요합니다.<br/>
                카카오 로그인으로 간편하게 시작해보세요!
              </LoginPromptMessage>
            </div>
          </LoginPromptContainer>
        ) : portfolioList.length === 0 ? (
          <GridContainer>
            <EmptyStateContainer>
              <EmptyIcon>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="3" strokeWidth="2"/>
                  <path d="M12 1v6m0 6v6" strokeWidth="2"/>
                  <path d="M1 12h6m6 0h6" strokeWidth="2"/>
                </svg>
              </EmptyIcon>
              <div>
                <EmptyMessage>아직 포트폴리오가 없습니다</EmptyMessage>
                <EmptySubMessage>
                  첫 번째 포트폴리오를 만들어보세요!<br/>
                  다른 사람들과 여러분의 작품을 공유할 수 있습니다.
                </EmptySubMessage>
              </div>
            </EmptyStateContainer>
          </GridContainer>
        ) : (
          <GridContainer>
            {currentItems.map((portfolio) => (
              <CardWrapper key={portfolio.id}>
                <PortfolioCard
                  id={portfolio.id}
                  title={portfolio.title}
                  description={portfolio.description}
                  profileImage={portfolio.profileImage}
                />
              </CardWrapper>
            ))}
          </GridContainer>
        )}

        {totalPages > 1 && isLoggedIn && (
          <PaginationContainer>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </PaginationContainer>
        )}
      </MainContentCard>
    </AllPortfolioContainer>
  );
};

export default AllPortfolio;
