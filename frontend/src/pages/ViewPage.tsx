import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageLayout from "../components/PageLayout";

// 스크롤 컨테이너 스타일
const ScrollContainer = styled.div`
  height: 100vh;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
`;

// 섹션 컨테이너 스타일
const Section = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  scroll-snap-align: start;
  position: relative;
`;

// 섹션 컨텐츠 영역 스타일 (기본)
const ContentArea = styled.div`
  flex: 1;
  padding: 20px 70px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

// 컨텐츠 공통 컨테이너
const ContentContainer = styled.div`
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  padding: 30px;
  margin: 20px 0;
  flex: 1;
  overflow-y: auto;
`;

// 프로필 섹션 스타일 (첫 번째 섹션)
const ProfileSection = styled(ContentArea)`
  justify-content: center;
`;

// 프로필 컨테이너
const ProfileContainer = styled.div`
  display: flex;
  gap: 50px;
  align-items: center;
  max-width: 1000px;
  margin: 0 auto;
`;

// 프로필 이미지
const ProfileImage = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: #e2e8f0;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border: 3px solid #3182ce;
`;

// 프로필 이미지 (실제 이미지)
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// 프로필 정보
const ProfileInfo = styled.div`
  flex: 1;
`;

// 이름
const Name = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 15px;
  color: #2d3748;
`;

// 소속 정보
const Affiliation = styled.p`
  font-size: 1.2rem;
  color: #4a5568;
  margin-bottom: 10px;
`;

// 연락처 정보
const ContactInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 20px;
`;

// 연락처 항목
const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #edf2f7;
  padding: 8px 15px;
  border-radius: 20px;
  font-size: 1rem;
`;

// 섹션 제목
const SectionTitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 20px;
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

// 타임라인 컨테이너
const TimelineContainer = styled.div`
  padding: 20px 0;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    left: 20px;
    top: 0;
    bottom: 0;
    width: 3px;
    background-color: #3182ce;
  }
`;

// 타임라인 항목
const TimelineItem = styled.div`
  margin-bottom: 30px;
  padding-left: 60px;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    left: 12px;
    top: 5px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: #3182ce;
    border: 3px solid white;
    box-shadow: 0 0 0 3px #3182ce;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

// 기간
const Period = styled.div`
  font-size: 1rem;
  font-weight: bold;
  color: #3182ce;
  margin-bottom: 5px;
`;

// 기관/회사명
const Organization = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 5px;
`;

// 설명
const Description = styled.div`
  font-size: 1rem;
  color: #4a5568;
  line-height: 1.5;
`;

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

// 자기소개 스타일
const AboutMeContent = styled.div`
  font-size: 1.1rem;
  line-height: 1.7;
  color: #4a5568;
  white-space: pre-line;
`;

// 네비게이션 도트
const DotNavigation = styled.div`
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 15px;
  z-index: 100;
`;

const Dot = styled.div<{ active: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${(props) => (props.active ? "#3182ce" : "#cbd5e0")};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.active ? "#3182ce" : "#a0aec0")};
    transform: scale(1.2);
  }
`;

// 더미 데이터
const dummyProfile = {
  name: "홍길동",
  affiliation: "한국대학교 컴퓨터공학과",
  position: "프론트엔드 개발자",
  email: "hong@example.com",
  phone: "010-1234-5678",
  github: "github.com/honggildong",
  image: "", // 프로필 이미지 URL
};

const dummyExperiences = [
  {
    id: 1,
    period: "2022.03 - 현재",
    organization: "ABC 기업",
    role: "프론트엔드 개발자",
    description: "React, TypeScript를 활용한 웹 애플리케이션 개발",
  },
  {
    id: 2,
    period: "2018.03 - 2022.02",
    organization: "한국대학교",
    role: "컴퓨터공학과",
    description: "학사 학위 취득",
  },
  {
    id: 3,
    period: "2017.06 - 2017.12",
    organization: "XYZ 스타트업",
    role: "인턴 개발자",
    description: "웹 프론트엔드 개발 및 유지보수 담당",
  },
];

const dummyProjects = [
  {
    id: 1,
    title: "포트폴리오 관리 시스템",
    period: "2023.01 - 2023.03",
    description:
      "React와 TypeScript를 활용한 포트폴리오 관리 시스템 개발. 사용자 경험 향상을 위한 UI/UX 디자인 적용.",
    image: "",
    tags: ["React", "TypeScript", "Styled Components"],
  },
  {
    id: 2,
    title: "쇼핑몰 웹사이트",
    period: "2022.08 - 2022.12",
    description:
      "온라인 쇼핑몰 프론트엔드 개발. 사용자 인증, 상품 목록, 장바구니 기능 구현.",
    image: "",
    tags: ["React", "Redux", "Bootstrap"],
  },
  {
    id: 3,
    title: "일정 관리 앱",
    period: "2022.03 - 2022.06",
    description:
      "할 일 및 일정을 관리할 수 있는 모바일 웹앱 개발. 사용자별 데이터 관리 및 알림 기능 구현.",
    image: "",
    tags: ["React Native", "Firebase", "Redux"],
  },
  {
    id: 4,
    title: "날씨 정보 대시보드",
    period: "2021.10 - 2021.12",
    description:
      "위치 기반 날씨 정보를 제공하는 대시보드 개발. 실시간 데이터 업데이트 및 그래프 시각화 구현.",
    image: "",
    tags: ["JavaScript", "Chart.js", "OpenWeatherMap API"],
  },
];

const dummyAbout = `안녕하세요, 프론트엔드 개발자 홍길동입니다.

사용자 중심의 웹 경험을 만들기 위해 노력하는 개발자로, React와 TypeScript를 주로 사용하여 웹 애플리케이션을 개발합니다. 새로운 기술을 배우고 적용하는 것을 즐기며, 문제 해결을 위한 창의적인 접근 방식을 선호합니다.

팀 프로젝트에서는 소통과 협업을 중요시하며, 함께 성장하는 개발 문화를 만들기 위해 노력합니다. 사용자의 니즈를 이해하고 이를 기술적으로 구현하는 과정에서 큰 보람을 느낍니다.

앞으로도 지속적인 학습과 도전을 통해 더 나은 개발자로 성장하고 싶습니다.`;

const ViewPage = () => {
  const { id } = useParams<{ id: string }>();
  const [activeSection, setActiveSection] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  // 포트폴리오 데이터 로드 (현재는 더미 데이터 사용)
  const profile = dummyProfile;
  const experiences = dummyExperiences;
  const projects = dummyProjects;
  const about = dummyAbout;

  // 휠 이벤트 처리
  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      // 이벤트 전파 방지
      event.preventDefault();

      // 휠 방향 감지
      const isScrollingDown = event.deltaY > 0;

      if (isScrollingDown && activeSection < sectionRefs.length - 1) {
        // 다음 섹션으로 이동
        setActiveSection(activeSection + 1);
        sectionRefs[activeSection + 1].current?.scrollIntoView({
          behavior: "smooth",
        });
      } else if (!isScrollingDown && activeSection > 0) {
        // 이전 섹션으로 이동
        setActiveSection(activeSection - 1);
        sectionRefs[activeSection - 1].current?.scrollIntoView({
          behavior: "smooth",
        });
      }
    };

    // 스크롤 이벤트 리스너 추가
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
    }

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
  }, [activeSection]);

  // 섹션 네비게이션
  const navigateToSection = (index: number) => {
    setActiveSection(index);
    sectionRefs[index].current?.scrollIntoView({ behavior: "smooth" });
  };

  // 스크롤 이벤트 감지
  useEffect(() => {
    const handleScroll = () => {
      const container = scrollContainerRef.current;
      if (!container) return;

      // 현재 스크롤 위치 감지
      const currentScrollPos = container.scrollTop;

      // 각 섹션의 위치를 확인하고 가장 가까운 섹션을 활성화
      sectionRefs.forEach((ref, index) => {
        if (!ref.current) return;

        const sectionTop = ref.current.offsetTop;
        const sectionHeight = ref.current.offsetHeight;

        if (
          currentScrollPos >= sectionTop - sectionHeight / 3 &&
          currentScrollPos < sectionTop + (sectionHeight * 2) / 3
        ) {
          setActiveSection(index);
        }
      });
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <PageLayout>
      <ScrollContainer ref={scrollContainerRef}>
        {/* 섹션 1: 헤더 + 개인정보 */}
        <Section ref={sectionRefs[0]}>
          <Header />
          <ProfileSection>
            <ContentContainer>
              <ProfileContainer>
                <ProfileImage>
                  {profile.image ? (
                    <Image src={profile.image} alt={profile.name} />
                  ) : (
                    <svg
                      width="80"
                      height="80"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                        fill="#A0AEC0"
                      />
                      <path
                        d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z"
                        fill="#A0AEC0"
                      />
                    </svg>
                  )}
                </ProfileImage>
                <ProfileInfo>
                  <Name>{profile.name}</Name>
                  <Affiliation>{profile.affiliation}</Affiliation>
                  <Affiliation>{profile.position}</Affiliation>
                  <ContactInfo>
                    <ContactItem>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3 8L10.8906 13.2604C11.5624 13.7083 12.4376 13.7083 13.1094 13.2604L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z"
                          stroke="#4A5568"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {profile.email}
                    </ContactItem>
                    <ContactItem>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3 5C3 3.89543 3.89543 3 5 3H8.27924C8.70967 3 9.09181 3.27543 9.22792 3.68377L10.7257 8.17721C10.8831 8.64932 10.6694 9.16531 10.2243 9.38787L7.96701 10.5165C9.06925 12.9612 11.0388 14.9308 13.4835 16.033L14.6121 13.7757C14.8347 13.3306 15.3507 13.1169 15.8228 13.2743L20.3162 14.7721C20.7246 14.9082 21 15.2903 21 15.7208V19C21 20.1046 20.1046 21 19 21H18C9.71573 21 3 14.2843 3 6V5Z"
                          stroke="#4A5568"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {profile.phone}
                    </ContactItem>
                    <ContactItem>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5229 6.47715 22 12 22C17.5229 22 22 17.5229 22 12C22 6.47715 17.5229 2 12 2Z"
                          stroke="#4A5568"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8 12L11 15L16 10"
                          stroke="#4A5568"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {profile.github}
                    </ContactItem>
                  </ContactInfo>
                </ProfileInfo>
              </ProfileContainer>
            </ContentContainer>
          </ProfileSection>
        </Section>

        {/* 섹션 2: 이력 */}
        <Section ref={sectionRefs[1]}>
          <ContentArea>
            <ContentContainer>
              <SectionTitle>이력</SectionTitle>
              <TimelineContainer>
                {experiences.map((exp) => (
                  <TimelineItem key={exp.id}>
                    <Period>{exp.period}</Period>
                    <Organization>{exp.organization}</Organization>
                    <Description>{exp.role}</Description>
                    <Description>{exp.description}</Description>
                  </TimelineItem>
                ))}
              </TimelineContainer>
            </ContentContainer>
          </ContentArea>
        </Section>

        {/* 섹션 3: 프로젝트 */}
        <Section ref={sectionRefs[2]}>
          <ContentArea>
            <ContentContainer>
              <SectionTitle>프로젝트</SectionTitle>
              <ProjectGrid>
                {projects.map((project) => (
                  <ProjectCard key={project.id}>
                    <ProjectImage>
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <svg
                          width="80"
                          height="80"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4 16L8.58579 11.4142C9.36683 10.6332 10.6332 10.6332 11.4142 11.4142L16 16M14 14L15.5858 12.4142C16.3668 11.6332 17.6332 11.6332 18.4142 12.4142L20 14M14 8H14.01M6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20Z"
                            stroke="#A0AEC0"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </ProjectImage>
                    <ProjectInfo>
                      <ProjectTitle>{project.title}</ProjectTitle>
                      <ProjectPeriod>{project.period}</ProjectPeriod>
                      <ProjectDescription>
                        {project.description}
                      </ProjectDescription>
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
        </Section>

        {/* 섹션 4: 자기소개 + 푸터 */}
        <Section ref={sectionRefs[3]}>
          <ContentArea>
            <ContentContainer>
              <SectionTitle>자기소개</SectionTitle>
              <AboutMeContent>{about}</AboutMeContent>
            </ContentContainer>
          </ContentArea>
          <Footer />
        </Section>
      </ScrollContainer>

      {/* 네비게이션 도트 */}
      <DotNavigation>
        {sectionRefs.map((_, index) => (
          <Dot
            key={index}
            active={activeSection === index}
            onClick={() => navigateToSection(index)}
          />
        ))}
      </DotNavigation>
    </PageLayout>
  );
};

export default ViewPage;
