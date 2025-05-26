import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import EditPageLayout from "../components/EditPageLayout";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { portfolioApi } from "../utils/api";
import {
  ProfileEditSection,
  ExperienceEditSection,
  ProjectEditSection,
  AboutEditSection,
} from "../components/portfolio/edit";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  min-height: calc(
    100vh - 250px
  ); /* 헤더와 푸터 높이를 고려한 최소 높이 설정 */
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 30px;
  color: #2d3748;
`;

const TabsContainer = styled.div`
  display: flex;
  margin-bottom: 30px;
  border-bottom: 2px solid #e2e8f0;
`;

const Tab = styled.button<{ active: boolean }>`
  padding: 15px 25px;
  background: none;
  border: none;
  border-bottom: 3px solid
    ${(props) => (props.active ? "#3182ce" : "transparent")};
  color: ${(props) => (props.active ? "#3182ce" : "#4a5568")};
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: #3182ce;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 30px;
`;

const Button = styled.button`
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
`;

const CancelButton = styled(Button)`
  background-color: #e2e8f0;
  color: #4a5568;
  border: none;

  &:hover {
    background-color: #cbd5e0;
  }
`;

const SaveButton = styled(Button)`
  background-color: #3182ce;
  color: white;
  border: none;

  &:hover {
    background-color: #2c5282;
  }
`;

interface SnsItem {
  type: string;
  url: string;
}

interface ProfileData {
  name: string;
  birthDate: string;
  gender: string;
  email: string;
  phone: string;
  introduction: string;
  image: string | null;
  sns: SnsItem[];
}

// 더미 프로필 데이터
const dummyProfileData: ProfileData = {
  name: "고재우",
  birthDate: "2000-01-01",
  gender: "남성",
  email: "jumokcom2001@gmail.com",
  phone: "010-9352-1321",
  introduction: "안녕하세요 풀스택 개발자 고재우입니다.",
  image: null,
  sns: [
    { type: "github", url: "https://github.com/honggildong" },
    { type: "instagram", url: "https://instagram.com/honggildong" },
  ],
};

const EditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 포트폴리오 데이터 상태
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "",
    birthDate: "",
    gender: "",
    email: "",
    phone: "",
    introduction: "",
    image: null,
    sns: [],
  });
  
  // 다른 섹션들의 데이터 상태
  const [experienceData, setExperienceData] = useState({
    educations: [],
    careers: [],
    certificates: [],
    languages: [],
    awards: []
  });
  
  const [projectData, setProjectData] = useState([]);
  
  const [aboutData, setAboutData] = useState({
    growth: '',
    personality: '',
    experience: ''
  });

  // 포트폴리오 ID가 있으면 데이터 로드
  useEffect(() => {
    if (id) {
      loadPortfolioData(+id);
    }
  }, [id]);

  // 포트폴리오 데이터 로드
  const loadPortfolioData = async (portfolioId: number) => {
    try {
      setLoading(true);
      const portfolio = await portfolioApi.getPortfolio(portfolioId);
      
      if (portfolio) {
        // 프로필 데이터 로드
        if (portfolio.profile) {
          setProfileData(portfolio.profile);
        }
        
        // 이력 데이터 로드
        setExperienceData({
          educations: portfolio.educations || [],
          careers: portfolio.careers || [],
          certificates: portfolio.certificates || [],
          languages: portfolio.languages || [],
          awards: portfolio.awards || []
        });
        
        // 프로젝트 데이터 로드 (비어 있으면 빈 배열로 초기화)
        const transformedProjects = portfolio.projects ? portfolio.projects.map((project: any) => ({
          ...project,
          projectScope: project.scope || project.projectScope // scope를 projectScope로 변환
        })) : [];
        
        setProjectData(transformedProjects);
        
        // 자기소개 데이터 로드
        setAboutData(portfolio.about || {
          growth: '',
          personality: '',
          experience: ''
        });
      }
    } catch (error) {
      console.error('포트폴리오 로드 실패:', error);
      setError('포트폴리오를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 프로필 데이터 저장 핸들러
  const handleSaveProfile = (data: ProfileData) => {
    setProfileData(data);
    console.log("저장된 프로필 데이터:", data);
  };
  
  // 이력 데이터 저장 핸들러
  const handleSaveExperience = (data: any) => {
    setExperienceData(data);
    console.log("저장된 이력 데이터:", data);
  };
  
  // 프로젝트 데이터 저장 핸들러
  const handleSaveProject = (data: any) => {
    setProjectData(data);
    console.log("저장된 프로젝트 데이터:", data);
  };
  
  // 자기소개 데이터 저장 핸들러
  const handleSaveAbout = (data: any) => {
    setAboutData(data);
    console.log("저장된 자기소개 데이터:", data);
  };

  // 취소 버튼 핸들러
  const handleCancel = () => {
    navigate("/");
  };

  // 전체 저장 버튼 핸들러
  const handleSaveAll = async () => {
    console.log('저장 시작 - profileData:', profileData);
    
    if (!profileData.name || !profileData.email) {
      setError('이름과 이메일은 필수 항목입니다.');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // 프로젝트 데이터 변환 (projectScope -> scope)
      const transformedProjects = projectData.map((project: any) => ({
        ...project,
        scope: project.projectScope || project.scope // projectScope를 scope로 변환
      }));

      const portfolioData = {
        title: `${profileData.name}의 포트폴리오`,
        profile: profileData,
        educations: experienceData.educations,
        careers: experienceData.careers,
        certificates: experienceData.certificates,
        languages: experienceData.languages,
        awards: experienceData.awards,
        projects: transformedProjects,
        about: aboutData
      };
      
      console.log('전송할 데이터:', portfolioData);

      let result;
      if (id) {
        console.log('수정 모드 - ID:', id);
        result = await portfolioApi.updatePortfolio(+id, portfolioData);
        console.log('포트폴리오 수정 성공:', result);
      } else {
        console.log('생성 모드');
        result = await portfolioApi.createPortfolio(portfolioData);
        console.log('포트폴리오 생성 성공:', result);
      }

      navigate('/');
    } catch (error) {
      console.error('포트폴리오 저장 실패 상세:', error);
      const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다';
      setError(`포트폴리오 저장에 실패했습니다: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  // 뒤로가기 버튼 핸들러
  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <EditPageLayout>
      <Header />
      <Container>
        {error && (
          <div style={{ 
            backgroundColor: '#fed7d7', 
            color: '#c53030', 
            padding: '12px', 
            borderRadius: '8px', 
            marginBottom: '20px' 
          }}>
            {error}
          </div>
        )}
        
        <Title>{id ? "포트폴리오 수정" : "새 포트폴리오 만들기"}</Title>

        {loading && id ? (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '300px',
            fontSize: '1.2rem',
            color: '#666'
          }}>
            포트폴리오를 불러오는 중...
          </div>
        ) : (
          <>
            <TabsContainer>
              <Tab
                active={activeTab === "profile"}
                onClick={() => setActiveTab("profile")}
              >
                프로필
              </Tab>
              <Tab
                active={activeTab === "experience"}
                onClick={() => setActiveTab("experience")}
              >
                이력
              </Tab>
              <Tab
                active={activeTab === "projects"}
                onClick={() => setActiveTab("projects")}
              >
                프로젝트
              </Tab>
              <Tab
                active={activeTab === "about"}
                onClick={() => setActiveTab("about")}
              >
                자기소개
              </Tab>
            </TabsContainer>

            {activeTab === "profile" && (
              <ProfileEditSection
                initialData={profileData}
                onSave={handleSaveProfile}
              />
            )}

            {activeTab === "experience" && (
              <ExperienceEditSection 
                initialData={experienceData}
                onSave={handleSaveExperience}
              />
            )}

            {activeTab === "projects" && (
              <ProjectEditSection 
                initialData={projectData}
                onSave={handleSaveProject}
              />
            )}

            {activeTab === "about" && (
              <AboutEditSection 
                initialData={aboutData}
                onSave={handleSaveAbout}
              />
            )}

            <ActionButtons>
              <CancelButton onClick={handleCancel} disabled={loading}>취소</CancelButton>
              <SaveButton onClick={handleSaveAll} disabled={loading}>
                {loading ? '저장 중...' : '모두 저장'}
              </SaveButton>
            </ActionButtons>
          </>
        )}
      </Container>
      <Footer />
    </EditPageLayout>
  );
};

export default EditPage;
