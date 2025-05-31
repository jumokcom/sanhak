import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageLayout from "../components/PageLayout";
import { portfolioApi } from "../utils/api";
import {
  ProfileSection,
  ExperienceSection,
  ProjectSection,
  AboutMeSection,
  ScrollContainer,
  Section,
  DotNavigation,
  Dot,
} from "../components/portfolio/view";

// 더미 데이터
const dummyProfile = {
  name: "고재우",
  age: 25,
  gender: "남성",
  email: "jumokcom2001@gmail.com",
  phone: "010-9352-1321",
  introduction: "안녕하세요 풀스택 개발자 고재우입니다.",
  image: "", // 프로필 이미지 URL
  sns: [
    { type: "github" as const, url: "https://github.com/honggildong" },
    { type: "instagram" as const, url: "https://instagram.com/honggildong" },
  ],
};

const dummyExperiences = [
  {
    id: 1,
    period: "2022.03 - 현재",
    organization: "ABC 기업",
    role: "경력",
    description: "React, TypeScript를 활용한 웹 애플리케이션 개발",
  },
  {
    id: 2,
    period: "2018.03 - 2022.02",
    organization: "한국대학교",
    role: "학력",
    description: "컴퓨터공학과 학사 학위 취득",
  },
  {
    id: 3,
    period: "2017.06 - 2017.12",
    organization: "XYZ 스타트업",
    role: "경력",
    description: "웹 프론트엔드 개발 및 유지보수 담당",
  },
];

const dummyCertificates = [
  {
    id: 1,
    name: "정보처리기사",
    issuer: "한국산업인력공단",
    date: "2023.06",
  },
  {
    id: 2,
    name: "SQLD",
    issuer: "한국데이터산업진흥원",
    date: "2023.03",
  },
];

const dummyLanguages = [
  {
    id: 1,
    name: "영어",
    level: "TOEIC",
    score: "900",
  },
  {
    id: 2,
    name: "일본어",
    level: "JLPT",
    score: "N2",
  },
];

const dummyAwards = [
  {
    id: 1,
    name: "우수 프로젝트상",
    issuer: "한국대학교",
    date: "2022.12",
  },
  {
    id: 2,
    name: "해커톤 대상",
    issuer: "ABC 기업",
    date: "2023.03",
  },
];

const dummyProjects = [
  {
    id: 1,
    title: "포트폴리오 관리 시스템",
    period: "2023.01 - 2023.03",
    role: "프론트엔드 개발",
    skills: ["React", "TypeScript", "Styled Components", "Redux"],
    description:
      "개발자들의 포트폴리오를 효과적으로 관리하고 공유할 수 있는 웹 애플리케이션입니다.\n\n주요 기능:\n- 포트폴리오 템플릿 제공\n- 프로젝트 및 경력 관리\n- 반응형 디자인 구현\n- 실시간 미리보기\n\n프로젝트 기여도: 100%",
    serviceUrl: "https://portfolio-system.example.com",
    githubUrl: "https://github.com/username/portfolio-system",
    image: "",
    isTeamProject: false,
  },
  {
    id: 2,
    title: "쇼핑몰 웹사이트",
    period: "2022.08 - 2022.12",
    role: "프론트엔드 개발 (팀장)",
    skills: ["React", "Redux", "Bootstrap", "Node.js", "MongoDB"],
    description:
      "온라인 쇼핑몰의 프론트엔드 개발을 담당했습니다.\n\n주요 기능:\n- 사용자 인증 및 권한 관리\n- 상품 목록 및 상세 페이지\n- 장바구니 및 결제 시스템\n- 실시간 재고 관리\n\n프로젝트 기여도: 60%",
    serviceUrl: "https://shopping-mall.example.com",
    githubUrl: "https://github.com/username/shopping-mall",
    image: "",
    isTeamProject: true,
  },
  {
    id: 3,
    title: "일정 관리 앱",
    period: "2022.03 - 2022.06",
    role: "풀스택 개발",
    skills: ["React Native", "Firebase", "Redux", "Node.js"],
    description:
      "모바일 기반 일정 관리 애플리케이션을 개발했습니다.\n\n주요 기능:\n- 캘린더 및 일정 관리\n- 알림 시스템\n- 데이터 동기화\n- 오프라인 지원\n\n프로젝트 기여도: 100%",
    serviceUrl: "https://schedule-app.example.com",
    githubUrl: "https://github.com/username/schedule-app",
    image: "",
    isTeamProject: false,
  },
  {
    id: 4,
    title: "날씨 정보 대시보드",
    period: "2021.10 - 2021.12",
    role: "프론트엔드 개발",
    skills: ["JavaScript", "Chart.js", "OpenWeatherMap API", "CSS3"],
    description:
      "위치 기반 날씨 정보를 제공하는 대시보드를 개발했습니다.\n\n주요 기능:\n- 실시간 날씨 정보 표시\n- 5일 예보 제공\n- 날씨 데이터 시각화\n- 위치 기반 서비스\n\n프로젝트 기여도: 80%",
    serviceUrl: "https://weather-dashboard.example.com",
    githubUrl: "https://github.com/username/weather-dashboard",
    image: "",
    isTeamProject: false,
  },
];

const about = {
  growth: `어릴 적부터 저는 스스로 무언가를 해보는 것을 좋아했습니다. 장난감을 단순히 가지고 노는 것을 넘어서 분해하고 다시 조립하는 데 흥미를 느꼈고, 그 과정에서 구조나 원리에 대해 자연스럽게 관심을 갖게 되었습니다. 초등학교 시절부터는 책 읽는 것을 좋아해 다양한 분야의 책을 접하면서 사고의 폭을 넓혀갔습니다. 중학교에 진학한 이후에는 친구들과의 협업을 통해 공동의 목표를 이루는 즐거움을 알게 되었고, 책임감 있게 역할을 수행하는 자세를 배울 수 있었습니다. 고등학교에서는 진로에 대한 고민을 시작하며 다양한 활동에 참여했고, 실수를 두려워하지 않고 도전하는 법을 배웠습니다. 저는 이처럼 성장 과정 속에서 형성된 호기심, 주도성, 협업 능력, 성실함을 바탕으로 앞으로도 계속 발전해 나가고자 합니다.대학교에 입학한 이후에는 더 넓은 세상 속에서 다양한 사람들과의 관계를 경험하면서 나 자신을 객관적으로 바라보는 힘도 기르게 되었습니다. 이상으로 자기소개를 마치겠습니다. 감사합니다.`,
  personality: `저는 긍정적이고 책임감이 강한 성격입니다. 팀 프로젝트에서 소통을 중요하게 생각하며, 문제 상황에서도 침착하게 해결책을 찾으려 노력합니다.`,
  experience: `대학 시절 동아리 프로젝트, 인턴 경험 등 다양한 실무 경험을 쌓았습니다. 특히 웹 개발 관련 프로젝트에서 주도적으로 역할을 맡아 성과를 이끌어낸 경험이 있습니다.`,
};

const ViewPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [portfolioData, setPortfolioData] = useState<any>(null);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  // 포트폴리오 데이터 로드
  useEffect(() => {
    if (id) {
      loadPortfolioData(+id);
    } else {
      setError('포트폴리오 ID가 없습니다.');
      setLoading(false);
    }
  }, [id]);

  const loadPortfolioData = async (portfolioId: number) => {
    try {
      setLoading(true);
      console.log('포트폴리오 로드 시작:', portfolioId);
      
      const data = await portfolioApi.getPortfolio(portfolioId);
      console.log('로드된 포트폴리오 데이터:', data);
      
      if (data) {
        setPortfolioData(data);
      } else {
        setError('포트폴리오를 찾을 수 없습니다.');
      }
    } catch (error) {
      console.error('포트폴리오 로드 실패:', error);
      setError('포트폴리오를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 데이터 변환 (기존 컴포넌트 형식에 맞게)
  const getProfileData = () => {
    if (!portfolioData?.profile) return null;
    
    const profile = portfolioData.profile;
    return {
      name: profile.name || '',
      age: profile.birthDate ? new Date().getFullYear() - new Date(profile.birthDate).getFullYear() : 0,
      gender: profile.gender || '',
      email: profile.email || '',
      phone: profile.phone || '',
      introduction: profile.introduction || '',
      image: profile.image || '',
      sns: profile.sns || []
    };
  };

  // 이력 데이터 변환
  const getExperienceData = () => {
    if (!portfolioData) return [];
    
    const experiences: Array<{
      id: number;
      period: string;
      organization: string;
      role: string;
      description: string;
    }> = [];
    
    // 학력 데이터 추가
    if (portfolioData.educations && Array.isArray(portfolioData.educations)) {
      portfolioData.educations.forEach((edu: any, index: number) => {
        experiences.push({
          id: edu.id ? parseInt(edu.id) : Date.now() + index,
          period: `${edu.startDate} - ${edu.isAttending ? '현재' : edu.endDate}`,
          organization: edu.school,
          role: '학력',
          description: `${edu.degree} - ${edu.major}${edu.description ? ` - ${edu.description}` : ''}`
        });
      });
    }
    
    // 경력 데이터 추가
    if (portfolioData.careers && Array.isArray(portfolioData.careers)) {
      portfolioData.careers.forEach((career: any, index: number) => {
        experiences.push({
          id: career.id ? parseInt(career.id) : Date.now() + index + 1000,
          period: `${career.startDate} - ${career.isWorking ? '현재' : career.endDate}`,
          organization: career.company,
          role: '경력',
          description: `${career.position}${career.description ? ` - ${career.description}` : ''}`
        });
      });
    }
    
    return experiences;
  };
  
  // 자격증 데이터 변환
  const getCertificateData = () => {
    if (!portfolioData?.certificates || !Array.isArray(portfolioData.certificates)) return [];
    
    return portfolioData.certificates.map((cert: any, index: number) => ({
      id: cert.id ? parseInt(cert.id) : Date.now() + index,
      name: cert.name,
      issuer: cert.issuer,
      date: cert.date
    }));
  };
  
  // 어학능력 데이터 변환
  const getLanguageData = () => {
    if (!portfolioData?.languages || !Array.isArray(portfolioData.languages)) return [];
    
    return portfolioData.languages.map((lang: any, index: number) => ({
      id: lang.id ? parseInt(lang.id) : Date.now() + index,
      name: lang.language,
      level: lang.testName,
      score: lang.score,
      date: lang.date
    }));
  };
  
  // 수상내역 데이터 변환
  const getAwardData = () => {
    if (!portfolioData?.awards || !Array.isArray(portfolioData.awards)) return [];
    
    return portfolioData.awards.map((award: any, index: number) => ({
      id: award.id ? parseInt(award.id) : Date.now() + index,
      name: award.name,
      issuer: award.issuer,
      date: award.date
    }));
  };

  // 프로젝트 데이터 변환
  const getProjectData = () => {
    if (!portfolioData?.projects || !Array.isArray(portfolioData.projects)) return [];
    
    return portfolioData.projects.map((project: any, index: number) => ({
      id: project.id || `project-${index}`,
      title: project.title,
      period: project.period || `${project.startDate} - ${project.isOngoing ? '현재' : project.endDate}`,
      role: project.role,
      skills: project.skills || [],
      description: project.description || '',
      serviceUrl: project.serviceUrl || '',
      githubUrl: project.githubUrl || '',
      image: project.image || '',
      isTeamProject: project.scope === '팀' || project.scope === '팀 프로젝트' || project.projectScope === '팀' || project.projectScope === '팀 프로젝트'
    }));
  };

  const getAboutData = () => {
    return portfolioData?.about || {
      growth: '',
      personality: '',
      experience: ''
    };
  };

  // 휠 이벤트 처리
  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      // 클릭 가능한 요소나 버튼에서 이벤트가 발생한 경우 휠 스크롤 무시
      const target = event.target as HTMLElement;
      if (target.closest('button') || target.closest('a') || target.closest('[role="button"]')) {
        return;
      }
      
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

  // 뒤로가기 버튼 클릭 핸들러 (사용하지 않지만 혹시 몰라 유지)
  // const handleBackClick = () => {
  //   navigate("/");
  // };

  if (loading) {
    return (
      <PageLayout>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          fontSize: '1.5rem',
          color: '#666'
        }}>
          포트폴리오를 불러오는 중...
        </div>
      </PageLayout>
    );
  }

  if (error) {
    return (
      <PageLayout>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          gap: '20px'
        }}>
          <div style={{ fontSize: '1.5rem', color: '#e53e3e' }}>
            {error}
          </div>
          <button
            onClick={() => navigate('/')}
            style={{
              padding: '12px 24px',
              backgroundColor: '#3182ce',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            메인으로 돌아가기
          </button>
        </div>
      </PageLayout>
    );
  }

  const profileData = getProfileData();
  const experienceData = getExperienceData();
  const certificateData = getCertificateData();
  const languageData = getLanguageData();
  const awardData = getAwardData();
  const projectData = getProjectData();
  const aboutData = getAboutData();
  
  console.log('ViewPage 렌더링 데이터:', {
    profileData,
    experienceData,
    certificateData,
    languageData,
    awardData,
    projectData,
    aboutData
  });

  return (
    <PageLayout>
      <ScrollContainer ref={scrollContainerRef}>
        {/* 섹션 1: 헤더 + 개인정보 */}
        <Section ref={sectionRefs[0]}>
          <Header />
          {profileData && <ProfileSection profile={profileData} />}
        </Section>

        {/* 섹션 2: 이력 */}
        <Section ref={sectionRefs[1]}>
          <ExperienceSection
            experiences={experienceData}
            certificates={certificateData}
            languages={languageData}
            awards={awardData}
          />
        </Section>

        {/* 섹션 3: 프로젝트 */}
        <Section ref={sectionRefs[2]}>
          <ProjectSection projects={projectData} />
        </Section>

        {/* 섹션 4: 자기소개 + 푸터 */}
        <Section ref={sectionRefs[3]}>
          <AboutMeSection content={aboutData} />
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
