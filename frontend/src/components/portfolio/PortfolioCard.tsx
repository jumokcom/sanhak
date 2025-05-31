import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { generatePortfolioPDF } from "../../utils/pdfGenerator";

// 포트폴리오 카드 스타일 - 좌우 분할 레이아웃
const CardContainer = styled.div`
  height: 250px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 14px;
  box-shadow: 
    0 8px 25px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.3);
  position: relative;
  overflow: hidden;
  cursor: pointer;
  box-sizing: border-box;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #764ba2, #667eea, #f093fb, #f5576c);
    border-radius: 16px 16px 0 0;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 
      0 12px 35px rgba(0, 0, 0, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.8);
    background: rgba(255, 255, 255, 0.95);
  }

  &:hover .view-indicator {
    opacity: 1;
    transform: translateX(0);
  }

  &:active {
    transform: translateY(-1px);
    box-shadow: 
      0 6px 20px rgba(0, 0, 0, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.7);
  }
`;

// 카드 콘텐츠 영역 - 좌우 분할 레이아웃
const CardContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  gap: 14px;
  min-height: 0;
`;

// 프로필 이미지 컨테이너 - 좌측 대형 이미지
const ProfileImageContainer = styled.div`
  width: 150px; /* 110px에서 150px로 증가 */
  height: 100%;
  border-radius: 12px;
  overflow: hidden;
  flex-shrink: 0;
  border: 2px solid rgba(118, 75, 162, 0.2);
  position: relative;
  
  &:before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 10px;
    padding: 1px;
    background: linear-gradient(45deg, #764ba2, #667eea);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: subtract;
  }
`;

// 프로필 이미지
const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// 기본 아바타 아이콘 - 대형 이미지에 맞게 조정
const DefaultAvatar = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
  
  svg {
    width: 48px;
    height: 48px;
    opacity: 0.7;
  }
`;

// 텍스트 영역 - 우측 중앙 정렬
const TextSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center; /* space-between에서 center로 변경 */
  align-items: center; /* 중앙 정렬 추가 */
  min-width: 0;
  text-align: center; /* 텍스트도 중앙 정렬 */
`;

// 카드 제목 - 중앙 정렬
const CardTitle = styled.h3`
  font-size: 0.95rem;
  margin-bottom: 12px; /* 6px에서 12px로 증가 */
  font-weight: 600;
  color: #1a202c;
  padding-bottom: 8px; /* 5px에서 8px로 증가 */
  border-bottom: 1px solid rgba(118, 75, 162, 0.1);
  line-height: 1.3;
  width: 100%; /* 전체 너비 사용 */
  
  /* 텍스트 오버플로우 처리 */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

// 카드 설명 - 중앙 정렬로 조정
const CardDescription = styled.p`
  color: #64748b;
  font-size: 0.85rem; /* 0.8rem에서 0.85rem로 다시 증가 */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4; /* 6줄에서 4줄로 축소 (중앙 정렬이므로) */
  -webkit-box-orient: vertical;
  line-height: 1.4; /* 1.35에서 1.4로 다시 증가 */
  margin: 0;
  width: 100%; /* 전체 너비 사용 */
  max-width: 100%; /* 최대 너비 제한 */
`;

// 옵션 버튼 스타일
const OptionsButton = styled.button`
  position: absolute;
  top: 6px;
  right: 6px;
  width: 24px;
  height: 24px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(5px);
  border-radius: 50%;
  border: 1px solid rgba(118, 75, 162, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 10;
  transition: all 0.2s ease;
  padding: 0;

  &:hover {
    background: rgba(255, 255, 255, 1);
    transform: scale(1.05);
    border-color: rgba(118, 75, 162, 0.4);
    box-shadow: 0 2px 8px rgba(118, 75, 162, 0.2);
  }

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

// 드롭다운 메뉴 스타일
const DropdownMenu = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 30px;
  right: 6px;
  width: 120px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(15px);
  border-radius: 12px;
  box-shadow: 
    0 8px 25px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  z-index: 20;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.2s ease-in-out;
  transform-origin: top right;
  transform: ${({ isOpen }) => isOpen ? "scale(1)" : "scale(0.95)"};
  opacity: ${({ isOpen }) => isOpen ? "1" : "0"};
  
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, #764ba2, #667eea, #f093fb);
    border-radius: 12px 12px 0 0;
  }
`;

// 드롭다운 아이템 스타일
const DropdownItem = styled.div`
  padding: 8px 12px;
  font-size: 0.8rem;
  color: #475569;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  font-weight: 500;
  letter-spacing: 0.3px;
  position: relative;
  overflow: hidden;

  &:hover {
    background: linear-gradient(135deg, rgba(118, 75, 162, 0.1), rgba(102, 126, 234, 0.1));
    color: #667eea;
    padding-left: 16px;
  }

  &:active {
    background: linear-gradient(135deg, rgba(118, 75, 162, 0.2), rgba(102, 126, 234, 0.2));
    transform: scale(0.98);
  }

  & + & {
    border-top: 1px solid rgba(148, 163, 184, 0.1);
  }

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, rgba(118, 75, 162, 0.1), transparent);
    transition: transform 0.5s ease;
  }

  &:hover:before {
    transform: translateX(100%);
  }
`;

// 아이콘 컨테이너
const IconContainer = styled.div`
  margin-right: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// 편집 아이콘
const EditIcon = styled.div`
  width: 12px;
  height: 12px;
  position: relative;
  
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 2px;
    width: 7px;
    height: 7px;
    border: 1.5px solid currentColor;
    border-radius: 1px;
    transform: rotate(45deg);
  }
  
  &:after {
    content: "";
    position: absolute;
    bottom: 1px;
    left: 1px;
    width: 5px;
    height: 2px;
    background-color: currentColor;
    transform: rotate(45deg);
  }
`;

// PDF 아이콘
const PdfIcon = styled.div`
  width: 12px;
  height: 12px;
  position: relative;
  
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 9px;
    height: 12px;
    border: 1.5px solid currentColor;
    border-radius: 1px;
  }
  
  &:after {
    content: "PDF";
    position: absolute;
    top: 2px;
    left: 1px;
    font-size: 4px;
    font-weight: bold;
    line-height: 1;
  }
`;

// 삭제 아이콘
const DeleteIcon = styled.div`
  width: 12px;
  height: 12px;
  position: relative;
  
  &:before, &:after {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    width: 12px;
    height: 2px;
    background-color: currentColor;
  }
  
  &:before {
    transform: rotate(45deg);
  }
  
  &:after {
    transform: rotate(-45deg);
  }
`;

// 수직 점 3개 아이콘
const DotsContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  gap: 1px;
  height: 12px;
`;

const Dot = styled.div`
  width: 3px;
  height: 3px;
  background-color: #667eea;
  border-radius: 50%;
`;

// 지시자 아이콘 (오른쪽 화살표)
const ViewIndicator = styled.div`
  position: absolute;
  bottom: 6px;
  right: 8px;
  width: 16px;
  height: 16px;
  opacity: 0;
  transition: all 0.3s ease;
  transform: translateX(-3px);
  display: flex;
  align-items: center;
  
  &:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    width: 10px;
    height: 1.5px;
    background-color: #667eea;
    transform: translateY(-50%);
  }
  
  &:after {
    content: "";
    position: absolute;
    top: 50%;
    right: 0;
    width: 5px;
    height: 5px;
    border-top: 1.5px solid #667eea;
    border-right: 1.5px solid #667eea;
    transform: translateY(-50%) rotate(45deg);
  }
`;

interface PortfolioCardProps {
  id: string;
  title: string;
  description: string;
  profileImage?: string;
  onDelete?: (id: string) => void;
  editable?: boolean;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({
  id,
  title,
  description,
  profileImage,
  onDelete,
  editable = false,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // 드롭다운 메뉴 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 카드 클릭 처리
  const handleCardClick = () => {
    navigate(`/view/${id}`);
  };

  // 옵션 버튼 클릭 처리
  const handleOptionsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  // 편집 기능 처리
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDropdownOpen(false);
    navigate(`/edit/${id}`);
  };

  // 삭제 기능 처리
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDropdownOpen(false);
    if (onDelete) {
      if (window.confirm("정말로 이 포트폴리오를 삭제하시겠습니까?")) {
        onDelete(id);
      }
    }
  };

  // PDF 저장 기능 처리
  const handleDownloadPdf = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDropdownOpen(false);
    
    try {
      console.log('PDF 다운로드 시작:', id);
      await generatePortfolioPDF(id);
    } catch (error) {
      console.error('PDF 다운로드 실패:', error);
      alert('PDF 다운로드에 실패했습니다.');
    }
  };

  return (
    <CardContainer onClick={handleCardClick}>
      {editable && (
        <>
          <OptionsButton onClick={handleOptionsClick} aria-label="포트폴리오 옵션">
            <DotsContainer>
              <Dot />
              <Dot />
              <Dot />
            </DotsContainer>
          </OptionsButton>
          
          <DropdownMenu isOpen={isDropdownOpen} ref={dropdownRef}>
            <DropdownItem onClick={handleEdit}>
              <IconContainer>
                <EditIcon />
              </IconContainer>
              수정
            </DropdownItem>
            <DropdownItem onClick={handleDownloadPdf}>
              <IconContainer>
                <PdfIcon />
              </IconContainer>
              PDF 저장
            </DropdownItem>
            <DropdownItem onClick={handleDelete}>
              <IconContainer>
                <DeleteIcon />
              </IconContainer>
              삭제
            </DropdownItem>
          </DropdownMenu>
        </>
      )}
      
      <CardContent>
        {/* 좌측: 프로필 이미지 */}
        <ProfileImageContainer>
          {profileImage ? (
            <ProfileImage src={profileImage} alt="프로필 이미지" />
          ) : (
            <DefaultAvatar>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2"/>
                <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </DefaultAvatar>
          )}
        </ProfileImageContainer>
        
        {/* 우측: 텍스트 영역 */}
        <TextSection>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </TextSection>
      </CardContent>
      
      <ViewIndicator className="view-indicator" />
    </CardContainer>
  );
};

export default PortfolioCard;
