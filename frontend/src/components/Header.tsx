import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import KakaoLogin from "react-kakao-login";
import { useNavigate, useLocation } from "react-router-dom";

// 스타일 컴포넌트들 - 강화된 그림자로 포트폴리오 섹션과 구분
const HeaderContainer = styled.header`
  height: 140px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 70px;
  position: relative;
  z-index: 10;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2),
    /* 메인 그림자 강화 */ 0 4px 16px rgba(0, 0, 0, 0.15),
    /* 중간 그림자 */ 0 2px 8px rgba(0, 0, 0, 0.1); /* 미세 그림자 */

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
        circle at 20% 80%,
        rgba(255, 255, 255, 0.1) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 80% 20%,
        rgba(255, 255, 255, 0.1) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 40% 40%,
        rgba(255, 255, 255, 0.05) 0%,
        transparent 50%
      );
    pointer-events: none;
  }

  /* 하단 강조 오버레이로 경계 명확화 */
  &:after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(0, 0, 0, 0.1) 20%,
      rgba(0, 0, 0, 0.15) 50%,
      rgba(0, 0, 0, 0.1) 80%,
      transparent 100%
    );
    filter: blur(2px);
  }
`;

const BackButton = styled.button`
  position: absolute;
  top: 50%;
  left: 70px;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #667eea;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
  z-index: 100; /* z-index 높게 설정 */
  pointer-events: auto; /* 명시적으로 클릭 가능하게 */

  &:hover {
    transform: translateY(-50%) scale(1.1) translateY(-2px);
    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.9);
    background: rgba(255, 255, 255, 1);
  }

  &:active {
    transform: translateY(-50%) scale(1.05);
  }

  /* 터치 디바이스를 위한 추가 스타일 */
  @media (hover: none) and (pointer: coarse) {
    width: 50px;
    height: 50px;
  }
`;

const TitleContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  position: relative;
`;

const Title = styled.h1`
  color: white;
  font-size: 2.5rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.3s ease;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  z-index: 2;
  position: relative;

  &:hover {
    transform: scale(1.03) translateY(-2px);
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3),
      0 0 20px rgba(255, 255, 255, 0.3);
    filter: brightness(1.1);
  }

  &:active {
    transform: scale(1.01);
  }
`;

const RightContainer = styled.div`
  display: flex;
  gap: 40px;
  align-items: center;
  z-index: 2;
  position: relative;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 15px 20px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

const ProfileImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2px solid white;
  object-fit: cover;
`;

const UserName = styled.div`
  color: white;
  font-size: 16px;
  font-weight: 600;
  text-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);
  text-align: center;
`;

const Button = styled.button<{ isKakao?: boolean }>`
  background: ${(props) =>
    props.isKakao
      ? "linear-gradient(135deg, #fee500 0%, #ffde00 100%)"
      : "rgba(255, 255, 255, 0.95)"};
  backdrop-filter: blur(10px);
  color: ${(props) => (props.isKakao ? "#000000" : "#667eea")};
  border: ${(props) =>
    props.isKakao
      ? "1px solid rgba(254, 229, 0, 0.3)"
      : "1px solid rgba(255, 255, 255, 0.3)"};
  border-radius: 12px;
  height: 44px;
  padding: 0 20px;
  cursor: pointer;
  font-weight: ${(props) => (props.isKakao ? "700" : "600")};
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${(props) => (props.isKakao ? "8px" : "0")};
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px
      ${(props) =>
        props.isKakao ? "rgba(254, 229, 0, 0.3)" : "rgba(0, 0, 0, 0.1)"},
    inset 0 1px 0 rgba(255, 255, 255, 0.6);

  &:hover {
    transform: translateY(-2px);
    background: ${(props) =>
      props.isKakao
        ? "linear-gradient(135deg, #ffde00 0%, #ffd700 100%)"
        : "rgba(255, 255, 255, 1)"};
    box-shadow: 0 6px 20px
        ${(props) =>
          props.isKakao ? "rgba(254, 229, 0, 0.4)" : "rgba(0, 0, 0, 0.15)"},
      inset 0 1px 0 rgba(255, 255, 255, 0.8);
  }

  &:active {
    transform: translateY(-1px);
  }
`;

// 카카오 로고 컴포넌트
const KakaoLogo = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9 0.5C4.02944 0.5 0 3.69924 0 7.68568C0 10.1948 1.55893 12.4069 3.93304 13.71C3.7125 14.2793 3.26339 15.5475 3.1425 16.0186C3.00089 16.6134 3.35304 16.614 3.64768 16.4234C3.89464 16.2673 5.47411 15.1888 6.33482 14.5856C7.19554 14.6871 8.0866 14.8712 9 14.8712C13.9706 14.8712 18 11.6721 18 7.68568C18 3.69924 13.9706 0.5 9 0.5Z"
      fill="#000000"
    />
  </svg>
);

// API 엔드포인트
const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_API_URL || "https://sanhak-backend.onrender.com/api"
    : "http://localhost:3001/api";

console.log("헤더 API_BASE_URL:", API_BASE_URL);

// 백엔드 API 함수들
const api = {
  // 카카오 액세스 토큰으로 로그인/회원가입
  kakaoLogin: async (accessToken: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/kakao/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accessToken }),
      });

      if (!response.ok) {
        throw new Error("카카오 로그인 처리 실패");
      }

      return await response.json();
    } catch (error) {
      console.error("API 오류:", error);
      throw error;
    }
  },

  // 사용자 프로필 조회
  getUserProfile: async () => {
    try {
      const token = localStorage.getItem("jwt_token");

      if (!token) {
        throw new Error("인증 토큰이 없습니다");
      }

      const response = await fetch(`${API_BASE_URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("프로필 조회 실패");
      }

      return await response.json();
    } catch (error) {
      console.error("API 오류:", error);
      throw error;
    }
  },
};

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 현재 페이지가 메인 페이지가 아닐 때만 뒤로가기 버튼 표시
  const showBackButton = location.pathname !== "/";
  // 뒤로가기 버튼 클릭 핸들러
  const handleBackClick = () => {
    navigate("/");
  };

  // 타이틀 클릭 시 메인 페이지로 이동
  const handleTitleClick = () => {
    navigate("/");
  };
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string>("");

  // 카카오 JavaScript SDK 키
  const KAKAO_JS_KEY = "bb160f901f05e41f7d00545da89d8b06";

  // 백엔드 서버로 로그인 처리 및 JWT 토큰 저장
  const loginWithBackend = useCallback(async (accessToken: string) => {
    try {
      // 백엔드 서버로 카카오 액세스 토큰 전송
      const authData = await api.kakaoLogin(accessToken);

      // JWT 토큰 저장
      localStorage.setItem("jwt_token", authData.access_token);

      // 사용자 정보 설정 (선택적으로 백엔드에서 받아와도 됨)
      fetchUserInfo();

      return true;
    } catch (error) {
      console.error("백엔드 로그인 처리 실패:", error);
      return false;
    }
  }, []);

  // 사용자 정보 요청 함수
  const fetchUserInfo = useCallback(async () => {
    // 1. 먼저 백엔드 서버에서 사용자 정보 조회 시도
    try {
      const jwtToken = localStorage.getItem("jwt_token");

      if (jwtToken) {
        // 백엔드에서 사용자 정보 가져오기
        const userProfile = await api.getUserProfile();

        setUserName(userProfile.name || "사용자");
        setProfileImage(userProfile.profileImage || "");
        setIsLogin(true);
        return;
      }
    } catch (error) {
      console.error("백엔드 사용자 정보 조회 실패:", error);
      // 백엔드 조회 실패 시 카카오 API로 대체
    }

    // 2. 백엔드 조회 실패 또는 토큰이 없는 경우 카카오 API 사용
    if (!window.Kakao?.API) return;

    window.Kakao.API.request({
      url: "/v2/user/me",
      success: async (res: any) => {
        console.log("카카오 사용자 정보:", res);

        // 닉네임 설정 (여러 경로에서 찾기)
        const nickname =
          res.properties?.nickname ||
          res.kakao_account?.profile?.nickname ||
          "카카오 사용자";

        // 프로필 이미지 설정
        const profileImg =
          res.properties?.profile_image ||
          res.kakao_account?.profile?.profile_image_url ||
          "";

        setUserName(nickname);
        setProfileImage(profileImg);
        setIsLogin(true);

        // 카카오 토큰이 있지만 백엔드 토큰이 없는 경우,
        // 백엔드 로그인 처리 시도
        if (!localStorage.getItem("jwt_token")) {
          const token = window.Kakao.Auth.getAccessToken();
          if (token) {
            await loginWithBackend(token);
          }
        }
      },
      fail: (error: any) => {
        console.error("사용자 정보 요청 실패:", error);
        setUserName("사용자");
        setIsLogin(true);
      },
    });
  }, [loginWithBackend]);

  // 카카오 로그인 성공 시 처리
  const handleKakaoSuccess = async (data: any) => {
    console.log("카카오 로그인 성공");

    try {
      // 액세스 토큰 설정
      if (data.response?.access_token) {
        // 카카오 SDK에 토큰 설정
        window.Kakao.Auth.setAccessToken(data.response.access_token);

        // 백엔드 서버로 로그인 요청
        const success = await loginWithBackend(data.response.access_token);

        if (success) {
          console.log("백엔드 로그인 성공");
          fetchUserInfo(); // 사용자 정보 가져오기
          
          // 로그인 성공 후 1초 뒤에 페이지 새로고침
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          // 백엔드 로그인 실패 시 카카오 정보만 사용
          fetchUserInfo();
          
          // 카카오 정보만으로도 로그인 처리된 경우 1초 뒤 새로고침
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      }
    } catch (error) {
      console.error("로그인 처리 중 오류:", error);
      setUserName("사용자");
      setIsLogin(true);
      
      // 오류가 있어도 로그인 상태가 변경되었으면 1초 뒤 새로고침
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  // 카카오 로그인 실패 시 처리
  const handleKakaoFail = (error: any) => {
    console.error("카카오 로그인 실패:", error);
  };

  // 로그아웃 처리
  const handleLogout = () => {
    try {
      // 백엔드 JWT 토큰 제거
      localStorage.removeItem("jwt_token");

      // 카카오 로그아웃
      if (window.Kakao?.Auth?.getAccessToken()) {
        window.Kakao.Auth.logout(() => {
          console.log("카카오 로그아웃 완료");
          resetUserState();
        });
      } else {
        resetUserState();
      }
    } catch (error) {
      console.error("로그아웃 처리 중 오류:", error);
      resetUserState();
    }
  };

  // 사용자 상태 초기화
  const resetUserState = () => {
    setIsLogin(false);
    setUserName("");
    setProfileImage("");
  };

  // 카카오 SDK 초기화 및 로그인 상태 확인
  useEffect(() => {
    let isComponentMounted = true;

    // SDK 초기화
    try {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init(KAKAO_JS_KEY);
        console.log("카카오 SDK 초기화 완료");
      }

      // 로그인 상태 확인
      const checkLoginStatus = async () => {
        // JWT 토큰 체크
        const jwtToken = localStorage.getItem("jwt_token");

        if (jwtToken && isComponentMounted) {
          setIsLogin(true);
          fetchUserInfo();
        }
        // JWT 토큰이 없을 때 카카오 토큰 체크
        else if (window.Kakao?.Auth?.getAccessToken() && isComponentMounted) {
          setIsLogin(true);
          fetchUserInfo();
        }
      };

      checkLoginStatus();
    } catch (error) {
      console.error("SDK 초기화 중 오류:", error);
    }

    // 컴포넌트 언마운트 시 정리
    return () => {
      isComponentMounted = false;
    };
  }, [fetchUserInfo]);

  return (
    <HeaderContainer>
      {showBackButton && (
        <BackButton onClick={handleBackClick}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 12H5"
              stroke="#667eea"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 19L5 12L12 5"
              stroke="#667eea"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </BackButton>
      )}
      <TitleContainer>
        <Title onClick={handleTitleClick}>Purange Portfolio</Title>
      </TitleContainer>
      <RightContainer>
        {isLogin ? (
          <>
            <ProfileContainer>
              {profileImage && (
                <ProfileImage src={profileImage} alt="프로필 이미지" />
              )}
              <UserName>{userName}</UserName>
            </ProfileContainer>
            <Button onClick={handleLogout}>로그아웃</Button>
          </>
        ) : (
          <KakaoLogin
            token={KAKAO_JS_KEY}
            onSuccess={handleKakaoSuccess}
            onFail={handleKakaoFail}
            render={({ onClick }) => (
              <Button isKakao onClick={onClick}>
                <KakaoLogo />
                카카오로 로그인
              </Button>
            )}
          />
        )}
      </RightContainer>
    </HeaderContainer>
  );
};

export default Header;
