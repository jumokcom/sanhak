import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageLayout from "../components/PageLayout";
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
          <ProfileSection profile={profile} />
        </Section>

        {/* 섹션 2: 이력 */}
        <Section ref={sectionRefs[1]}>
          <ExperienceSection experiences={experiences} />
        </Section>

        {/* 섹션 3: 프로젝트 */}
        <Section ref={sectionRefs[2]}>
          <ProjectSection projects={projects} />
        </Section>

        {/* 섹션 4: 자기소개 + 푸터 */}
        <Section ref={sectionRefs[3]}>
          <AboutMeSection content={about} />
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
