import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PortfolioCard from "./PortfolioCard";
import CreatePortfolioCard from "./CreatePortfolioCard";
import { useNavigate } from "react-router-dom";
import { portfolioApi } from "../../utils/api";
import { generatePortfolioPDF } from "../../utils/pdfGenerator";

// 전체 페이지 컨테이너
const FullPageContainer = styled.div`
  height: 100%;
  width: 100%;
  max-width: 100vw; /* 뷰포트 너비 초과 방지 */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px; /* 40px에서 20px로 줄임 */
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
      radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
    pointer-events: none;
  }
`;

// 메인 포트폴리오 카드 - 강화된 그림자로 헤더와 구분
const MainPortfolioCard = styled.div`
  width: 90%;
  max-width: 1000px;
  height: 70%;
  max-height: 80vh; /* 최대 높이 제한 */
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: 30px; /* 50px에서 30px로 줄임 */
  box-shadow: 
    0 35px 70px rgba(0, 0, 0, 0.25), /* 그림자 대폭 강화 */
    0 15px 35px rgba(0, 0, 0, 0.15), /* 중간 그림자 추가 */
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  gap: 40px; /* 60px에서 40px로 줄임 */
  position: relative;
  transition: all 0.4s ease;
  border: 1px solid rgba(255, 255, 255, 0.3);
  cursor: pointer;
  box-sizing: border-box; /* 패딩 포함한 박스 사이징 */
  
  /* 반응형 디자인 */
  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 25px;
    padding: 25px;
    height: auto;
    max-height: none;
  }
  
  @media (max-width: 768px) {
    width: 95%;
    padding: 20px;
    gap: 20px;
  }
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 
      0 45px 90px rgba(0, 0, 0, 0.3), /* 호버 시 더욱 강한 그림자 */
      0 20px 45px rgba(0, 0, 0, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.9);
  }
  
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #667eea, #764ba2, #f093fb, #f5576c);
    border-radius: 24px 24px 0 0;
  }
`;

// 프로필 섹션
const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 0 0 350px;
`;

// 큰 프로필 이미지 컨테이너
const LargeProfileContainer = styled.div`
  width: 280px;
  height: 350px;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  box-shadow: 
    0 15px 35px rgba(0, 0, 0, 0.1),
    0 3px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.03);
    box-shadow: 
      0 20px 45px rgba(0, 0, 0, 0.15),
      0 5px 15px rgba(0, 0, 0, 0.1);
  }
  
  &:before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 20px;
    padding: 3px;
    background: linear-gradient(45deg, #667eea, #764ba2);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: subtract;
  }
`;

// 프로필 이미지
const LargeProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// 기본 아바타
const LargeDefaultAvatar = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  
  svg {
    width: 120px;
    height: 120px;
    opacity: 0.7;
  }
`;

// 콘텐츠 섹션
const ContentSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

// 제목 영역
const TitleArea = styled.div`
  margin-bottom: 10px;
`;

// 메인 제목
const MainTitle = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 15px;
  line-height: 1.2;
`;

// 부제목
const SubTitle = styled.div`
  font-size: 1.3rem;
  color: #64748b;
  font-weight: 500;
  margin-bottom: 25px;
`;

// 설명 텍스트
const Description = styled.p`
  font-size: 1.1rem;
  color: #475569;
  line-height: 1.7;
  margin-bottom: 35px;
  max-height: 150px;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 2px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 2px;
  }
`;

// 액션 버튼 영역
const ActionButtons = styled.div`
  display: flex;
  gap: 15px;
  margin-top: auto;
`;

// 액션 버튼
const ActionButton = styled.button<{ variant?: 'primary' | 'secondary' | 'danger' }>`
  padding: 12px 24px;
  border-radius: 12px;
  border: none;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  
  ${({ variant = 'primary' }) => {
    switch (variant) {
      case 'primary':
        return `
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
          
          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
          }
        `;
      case 'secondary':
        return `
          background: rgba(100, 116, 139, 0.1);
          color: #475569;
          border: 1px solid rgba(100, 116, 139, 0.2);
          
          &:hover {
            background: rgba(100, 116, 139, 0.15);
            transform: translateY(-1px);
          }
        `;
      case 'danger':
        return `
          background: rgba(239, 68, 68, 0.1);
          color: #dc2626;
          border: 1px solid rgba(239, 68, 68, 0.2);
          
          &:hover {
            background: rgba(239, 68, 68, 0.15);
            transform: translateY(-1px);
          }
        `;
    }
  }}
  
  &:active {
    transform: translateY(0);
  }
`;

// 로그인 프롬프트 컨테이너
const LoginPromptContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
  text-align: center;
`;

// 로그인 메시지
const LoginMessage = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  margin-bottom: 15px;
`;

// 로그인 부메시지
const LoginSubMessage = styled.p`
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.8);
  text-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
`;

// 포트폴리오 생성 프롬프트
const CreatePromptContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
  text-align: center;
`;

// 생성 아이콘
const CreateIcon = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.2));
  }
  
  svg {
    width: 60px;
    height: 60px;
    color: white;
  }
`;

// 생성 메시지
const CreateMessage = styled.h2`
  font-size: 2.2rem;
  font-weight: 700;
  color: white;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  margin-bottom: 10px;
`;

// 생성 부메시지
const CreateSubMessage = styled.p`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  text-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  margin-bottom: 30px;
`;

// 생성 버튼
const CreateButton = styled(ActionButton)`
  font-size: 1.1rem;
  padding: 15px 30px;
  background: rgba(255, 255, 255, 0.9);
  color: #667eea;
  border: none;
  
  &:hover {
    background: white;
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;



// 내 포트폴리오 타입 정의
interface Portfolio {
  id: string;
  title: string;
  description: string;
  profileImage?: string;
}

interface MyPortfolioProps {
  portfolios: Portfolio[];
}

// 내 포트폴리오 컴포넌트 - 풀스크린 버전
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
      
      const loggedIn = !!(jwtToken || kakaoToken);
      setIsLoggedIn(loggedIn);
    };
    
    checkLoginStatus();
    const interval = setInterval(checkLoginStatus, 1000);
    return () => clearInterval(interval);
  }, [portfolios]);

  // 포트폴리오 클릭 핸들러
  const handlePortfolioClick = () => {
    if (myPortfolio) {
      navigate(`/view/${myPortfolio.id}`);
    }
  };

  // 편집 핸들러
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (myPortfolio) {
      navigate(`/edit/${myPortfolio.id}`);
    }
  };

  // PDF 다운로드 핸들러
  const handleDownloadPdf = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (myPortfolio) {
      try {
        await generatePortfolioPDF(myPortfolio.id);
      } catch (error) {
        console.error('PDF 다운로드 실패:', error);
        alert('PDF 다운로드에 실패했습니다.');
      }
    }
  };

  // 삭제 핸들러
  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (myPortfolio && window.confirm('정말로 삭제하시겠습니까?')) {
      try {
        await portfolioApi.deletePortfolio(+myPortfolio.id);
        window.location.reload();
      } catch (error) {
        console.error('포트폴리오 삭제 실패:', error);
        const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다';
        alert(`삭제에 실패했습니다: ${errorMessage}`);
      }
    }
  };

  // 포트폴리오 생성 핸들러
  const handleCreatePortfolio = () => {
    navigate('/edit');
  };

  return (
    <FullPageContainer>
      {!isLoggedIn ? (
        // 로그인하지 않은 경우
        <LoginPromptContainer>
          <LoginMessage>내 포트폴리오</LoginMessage>
          <LoginSubMessage>포트폴리오를 관리하려면 로그인을 해주세요</LoginSubMessage>
        </LoginPromptContainer>
      ) : portfolios.length === 0 ? (
        // 로그인했지만 포트폴리오가 없는 경우
        <CreatePromptContainer>
          <CreateIcon onClick={handleCreatePortfolio}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 5v14" strokeWidth="2" strokeLinecap="round"/>
              <path d="M5 12h14" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </CreateIcon>
          <div>
            <CreateMessage>첫 번째 포트폴리오 만들기</CreateMessage>
            <CreateSubMessage>나만의 포트폴리오를 만들어 세상에 선보이세요</CreateSubMessage>
          </div>
          <CreateButton onClick={handleCreatePortfolio}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 5v14" strokeWidth="2" strokeLinecap="round"/>
              <path d="M5 12h14" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            포트폴리오 만들기
          </CreateButton>
        </CreatePromptContainer>
      ) : myPortfolio ? (
        // 포트폴리오가 있는 경우
        <MainPortfolioCard onClick={handlePortfolioClick}>
          <ProfileSection>
            <LargeProfileContainer>
              {myPortfolio.profileImage ? (
                <LargeProfileImage 
                  src={myPortfolio.profileImage} 
                  alt="프로필 이미지" 
                />
              ) : (
                <LargeDefaultAvatar>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="8" r="4" strokeWidth="2"/>
                    <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" strokeWidth="2"/>
                  </svg>
                </LargeDefaultAvatar>
              )}
            </LargeProfileContainer>
          </ProfileSection>
          
          <ContentSection>
            <TitleArea>
              <MainTitle>{myPortfolio.title}</MainTitle>
              <SubTitle>내 포트폴리오</SubTitle>
            </TitleArea>
            
            <Description>
              {myPortfolio.description || '자기소개를 추가해보세요.'}
            </Description>
            
            <ActionButtons>
              <ActionButton variant="primary" onClick={handleEdit}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" strokeWidth="2"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" strokeWidth="2"/>
                </svg>
                편집하기
              </ActionButton>
              
              <ActionButton variant="secondary" onClick={handleDownloadPdf}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeWidth="2"/>
                  <polyline points="14,2 14,8 20,8" strokeWidth="2"/>
                  <line x1="16" y1="13" x2="8" y2="13" strokeWidth="2"/>
                  <line x1="16" y1="17" x2="8" y2="17" strokeWidth="2"/>
                  <polyline points="10,9 9,9 8,9" strokeWidth="2"/>
                </svg>
                PDF 저장
              </ActionButton>
              
              <ActionButton variant="danger" onClick={handleDelete}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polyline points="3,6 5,6 21,6" strokeWidth="2"/>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" strokeWidth="2"/>
                </svg>
                삭제하기
              </ActionButton>
            </ActionButtons>
          </ContentSection>
        </MainPortfolioCard>
      ) : (
        // 예외 상황
        <CreatePromptContainer>
          <CreateMessage>포트폴리오 만들기</CreateMessage>
          <CreateButton onClick={handleCreatePortfolio}>
            포트폴리오 만들기
          </CreateButton>
        </CreatePromptContainer>
      )}
    </FullPageContainer>
  );
};

export default MyPortfolio;
