import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PortfolioCard from "./PortfolioCard";
import CreatePortfolioCard from "./CreatePortfolioCard";
import { useNavigate } from "react-router-dom";
import { portfolioApi } from "../../utils/api";

// 섹션 컨테이너 스타일
const SectionContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  max-width: 95%; /* 90%에서 95%로 증가 */
  margin: 0 auto;
  overflow: hidden;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  z-index: 1;
  margin-top: 20px;
`;

// 제목 래퍼
const TitleWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 0 10px;
`;

// 제목 스타일
const SectionTitle = styled.h2`
  font-size: 1.5rem;
  position: relative;
  display: inline-block;
`;

// 강조할 부분 (내)
const TitleHighlight = styled.span`
  position: relative;
  
  &:after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -5px;
    width: 100%;
    height: 3px;
    background-color: #1a202c;
    border-radius: 2px;
  }
`;

// 단순한 컨테이너 (슬라이더 없음)
const SimpleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 40px;
  min-height: 300px;
`;

// 수정 버튼
const EditButton = styled.button`
  background-color: #3182ce;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-bottom: 20px;

  &:hover {
    background-color: #2c5282;
  }
`;

// 포트폴리오 카드 레이아웃
const PortfolioLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

// 카드 래퍼 (크기 조정)
const CardWrapper = styled.div`
  width: 300px;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

// 로그인 안내 컨테이너
const LoginPromptContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: #666;
  font-size: 1.2rem;
  gap: 20px;
`;

// 로그인 안내 메시지
const LoginMessage = styled.div`
  font-weight: 500;
`;



// 내 포트폴리오 타입 정의
interface Portfolio {
  id: string;
  title: string;
  description: string;
}

interface MyPortfolioProps {
  portfolios: Portfolio[];
}

// 내 포트폴리오 컴포넌트 - 단순화된 버전
const MyPortfolio: React.FC<MyPortfolioProps> = ({ portfolios }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  
  // 첫 번째 포트폴리오만 사용 (하나만 허용)
  const myPortfolio = portfolios.length > 0 ? portfolios[0] : null;

  // 로그인 상태 확인
  useEffect(() => {
    const checkLoginStatus = () => {
      const jwtToken = localStorage.getItem('jwt_token');
      const kakaoToken = window.Kakao?.Auth?.getAccessToken();
      setIsLoggedIn(!!(jwtToken || kakaoToken));
    };
    
    checkLoginStatus();
    
    // 로그인 상태 변화를 감지하기 위한 interval
    const interval = setInterval(checkLoginStatus, 1000);
    
    return () => clearInterval(interval);
  }, []);

  // 포트폴리오 생성 버튼 클릭
  const handleCreatePortfolio = () => {
    navigate('/edit');
  };

  // 포트폴리오 수정 버튼 클릭
  const handleEditPortfolio = () => {
    if (myPortfolio) {
      navigate(`/edit/${myPortfolio.id}`);
    }
  };

  // 포트폴리오 삭제 처리
  const handleDeletePortfolio = async (id: string) => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      try {
        console.log('포트폴리오 삭제 시작:', id);
        
        // API 호출로 삭제
        await portfolioApi.deletePortfolio(+id);
        
        console.log('포트폴리오 삭제 성공');
        
        // 성공 후 메인 페이지 새로고침 (데이터 업데이트)
        window.location.reload();
        
      } catch (error) {
        console.error('포트폴리오 삭제 실패:', error);
        
        // 에러 메시지 표시
        const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다';
        alert(`삭제에 실패했습니다: ${errorMessage}`);
      }
    }
  };



  return (
    <SectionContainer>
      <TitleWrapper>
        <SectionTitle>
          <TitleHighlight>내</TitleHighlight> 포트폴리오
        </SectionTitle>
      </TitleWrapper>

      {/* 로그인 상태에 따른 조건부 렌더링 */}
      {!isLoggedIn ? (
        <LoginPromptContainer>
          <LoginMessage>내 포트폴리오를 관리하려면 로그인을 해주세요</LoginMessage>
        </LoginPromptContainer>
      ) : (
        <SimpleContainer>
          {myPortfolio ? (
            // 포트폴리오가 있을 때: 수정 버튼 + 포트폴리오 카드
            <PortfolioLayout>
              <EditButton onClick={handleEditPortfolio}>
                포트폴리오 수정
              </EditButton>
              <CardWrapper>
                <PortfolioCard
                  id={myPortfolio.id}
                  title={myPortfolio.title}
                  description={myPortfolio.description}
                  onDelete={handleDeletePortfolio}
                  editable={true}
                />
              </CardWrapper>
            </PortfolioLayout>
          ) : (
            // 포트폴리오가 없을 때: 생성 버튼만
            <CardWrapper>
              <CreatePortfolioCard />
            </CardWrapper>
          )}
        </SimpleContainer>
      )}
    </SectionContainer>
  );
};

export default MyPortfolio;
