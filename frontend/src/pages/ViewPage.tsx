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
  name: "고재우",
  age: 25,
  gender: "남성",
  email: "hong@gmail.com",
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

const about = {
  growth: `어릴 적부터 저는 스스로 무언가를 해보는 것을 좋아했습니다. 장난감을 단순히 가지고 노는 것을 넘어서 분해하고 다시 조립하는 데 흥미를 느꼈고, 그 과정에서 구조나 원리에 대해 자연스럽게 관심을 갖게 되었습니다. 초등학교 시절부터는 책 읽는 것을 좋아해 다양한 분야의 책을 접하면서 사고의 폭을 넓혀갔습니다. 중학교에 진학한 이후에는 친구들과의 협업을 통해 공동의 목표를 이루는 즐거움을 알게 되었고, 책임감 있게 역할을 수행하는 자세를 배울 수 있었습니다. 고등학교에서는 진로에 대한 고민을 시작하며 다양한 활동에 참여했고, 실수를 두려워하지 않고 도전하는 법을 배웠습니다. 저는 이처럼 성장 과정 속에서 형성된 호기심, 주도성, 협업 능력, 성실함을 바탕으로 앞으로도 계속 발전해 나가고자 합니다.대학교에 입학한 이후에는 더 넓은 세상 속에서 다양한 사람들과의 관계를 경험하면서 나 자신을 객관적으로 바라보는 힘도 기르게 되었습니다. 이상으로 자기소개를 마치겠습니다. 감사합니다.`,
  personality: `저는 긍정적이고 책임감이 강한 성격입니다. 팀 프로젝트에서 소통을 중요하게 생각하며, 문제 상황에서도 침착하게 해결책을 찾으려 노력합니다.`,
  experience: `대학 시절 동아리 프로젝트, 인턴 경험 등 다양한 실무 경험을 쌓았습니다. 특히 웹 개발 관련 프로젝트에서 주도적으로 역할을 맡아 성과를 이끌어낸 경험이 있습니다.`
};

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
