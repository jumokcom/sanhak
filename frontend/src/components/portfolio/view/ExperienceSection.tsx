import React from "react";
import styled from "styled-components";
import { ContentArea, ContentContainer, SectionTitle } from "./CommonStyles";

const ExperienceContentContainer = styled(ContentContainer)`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(15px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  box-shadow: 
    0 35px 70px rgba(0, 0, 0, 0.2),
    0 15px 35px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
  transition: all 0.4s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 
      0 45px 90px rgba(0, 0, 0, 0.25),
      0 20px 45px rgba(0, 0, 0, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 1);
  }
`;

const ExperienceLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  padding: 10px;
  max-height: calc(100vh - 200px);
  overflow: hidden;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 15px;
    max-height: none;
  }
`;

// 왼쪽 영역 스타일
const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 100%;
  overflow: hidden;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  padding: 10px;
  border-radius: 12px;
  box-shadow: 
    0 6px 20px rgba(0, 0, 0, 0.06),
    0 3px 8px rgba(0, 0, 0, 0.04),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
  flex: 1;
  min-height: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 
      0 10px 25px rgba(0, 0, 0, 0.08),
      0 4px 12px rgba(0, 0, 0, 0.06),
      inset 0 1px 0 rgba(255, 255, 255, 1);
  }
`;

const CardTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 12px;
  padding-bottom: 6px;
  position: relative;
  flex-shrink: 0;
  
  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 20px;
    height: 2px;
    background: linear-gradient(90deg, #667eea, #764ba2);
    border-radius: 2px;
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  
  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(102, 126, 234, 0.1);
    border-radius: 2px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #667eea, #764ba2);
    border-radius: 2px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, #5a6fd8, #6a4190);
  }
`;

const CardItem = styled.div`
  padding: 12px 14px;
  border-radius: 10px;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
  border: 1px solid rgba(102, 126, 234, 0.1);
  display: flex;
  flex-direction: column;
  gap: 5px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
  
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(135deg, #667eea, #764ba2);
  }
  
  &:hover {
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.08) 100%);
    transform: translateX(2px);
    box-shadow: 0 2px 10px rgba(102, 126, 234, 0.1);
  }
`;

const ItemTitle = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: #334155;
  line-height: 1.3;
`;

const ItemSubtitle = styled.div`
  font-size: 0.9rem;
  color: #64748b;
  font-weight: 500;
  line-height: 1.3;
`;

const ItemDate = styled.div`
  font-size: 0.85rem;
  color: #667eea;
  font-weight: 600;
  padding: 4px 10px;
  background: rgba(102, 126, 234, 0.1);
  border-radius: 10px;
  display: inline-block;
  width: fit-content;
  margin-top: 4px;
`;

// 오른쪽 타임라인 영역 스타일
const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 100%;
  overflow: hidden;
`;

// 타임라인 전용 카드 (더 큰 높이)
const TimelineCard = styled(Card)`
  min-height: 300px; /* 타임라인 카드의 최소 높이 대폭 증가 */
  
  @media (max-width: 1024px) {
    min-height: 240px;
  }
`;

const TimelineContainer = styled.div`
  position: relative;
  padding: 6px 0 6px 16px;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;

  &:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    border-radius: 2px;
  }
  
  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(102, 126, 234, 0.1);
    border-radius: 2px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #667eea, #764ba2);
    border-radius: 2px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, #5a6fd8, #6a4190);
  }
`;

const TimelineItem = styled.div`
  margin-bottom: 15px;
  padding-left: 20px;
  position: relative;
  flex-shrink: 0;

  &:before {
    content: "";
    position: absolute;
    left: -7px;
    top: 4px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea, #764ba2);
    border: 2px solid white;
    box-shadow: 
      0 2px 8px rgba(102, 126, 234, 0.2),
      0 0 0 1px rgba(102, 126, 234, 0.1);
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const Period = styled.div`
  font-size: 0.85rem;
  font-weight: 600;
  color: #667eea;
  margin-bottom: 5px;
  padding: 4px 10px;
  background: rgba(102, 126, 234, 0.1);
  border-radius: 10px;
  display: inline-block;
`;

const Organization = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 5px;
  color: #334155;
  line-height: 1.2;
`;

const DetailItem = styled.div`
  font-size: 0.85rem;
  color: #64748b;
  line-height: 1.3;
  margin-bottom: 4px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

interface Experience {
  id: number;
  period: string;
  organization: string;
  role: string;
  description: string;
}

interface Certificate {
  id: number;
  name: string;
  issuer: string;
  date: string;
}

interface Language {
  id: number;
  name: string;
  level: string;
  score?: string;
  date?: string;
}

interface Award {
  id: number;
  name: string;
  issuer: string;
  date: string;
}

interface ExperienceSectionProps {
  experiences: Experience[];
  certificates: Certificate[];
  languages: Language[];
  awards: Award[];
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experiences,
  certificates,
  languages,
  awards,
}) => {
  return (
    <ContentArea>
      <ExperienceContentContainer>
        <SectionTitle>이력</SectionTitle>
        <ExperienceLayout>
          <LeftSection>
            {certificates.length > 0 && (
              <Card>
                <CardTitle>자격증</CardTitle>
                <CardContent>
                  {certificates.map((cert) => (
                    <CardItem key={cert.id}>
                      <ItemTitle>{cert.name}</ItemTitle>
                      <ItemSubtitle>발급기관: {cert.issuer}</ItemSubtitle>
                      <ItemDate>취득일: {cert.date}</ItemDate>
                    </CardItem>
                  ))}
                </CardContent>
              </Card>
            )}
            
            {languages.length > 0 && (
              <Card>
                <CardTitle>어학능력</CardTitle>
                <CardContent>
                  {languages.map((lang) => (
                    <CardItem key={lang.id}>
                      <ItemTitle>{lang.name}</ItemTitle>
                      <ItemSubtitle>시험명: {lang.level}</ItemSubtitle>
                      {lang.score && <ItemSubtitle>점수: {lang.score}</ItemSubtitle>}
                      <ItemDate>취득일: {lang.date || '미정'}</ItemDate>
                    </CardItem>
                  ))}
                </CardContent>
              </Card>
            )}
            
            {awards.length > 0 && (
              <Card>
                <CardTitle>수상내역</CardTitle>
                <CardContent>
                  {awards.map((award) => (
                    <CardItem key={award.id}>
                      <ItemTitle>{award.name}</ItemTitle>
                      <ItemSubtitle>수여기관: {award.issuer}</ItemSubtitle>
                      <ItemDate>수상일: {award.date}</ItemDate>
                    </CardItem>
                  ))}
                </CardContent>
              </Card>
            )}
          </LeftSection>
          
          <RightSection>
            {experiences.filter((exp) => exp.role === "학력").length > 0 && (
              <TimelineCard>
                <CardTitle>학력</CardTitle>
                <TimelineContainer>
                  {experiences
                    .filter((exp) => exp.role === "학력")
                    .map((exp) => {
                      // description에서 정보 분리 (예: "고등학교 - 없음 - 고등학교임" -> 분야, 전공, 설명)
                      const parts = exp.description.split(' - ');
                      const degree = parts[0] || ''; // 학위 (고등학교, 학사 등)
                      const major = parts[1] || ''; // 전공
                      const detail = parts[2] || ''; // 상세 설명
                      
                      return (
                        <TimelineItem key={exp.id}>
                          <Period>{exp.period}</Period>
                          <Organization>{exp.organization}</Organization>
                          {degree && degree !== '없음' && (
                            <DetailItem><strong>학위:</strong> {degree}</DetailItem>
                          )}
                          {major && major !== '없음' && (
                            <DetailItem><strong>전공:</strong> {major}</DetailItem>
                          )}
                          {detail && detail !== '없음' && detail !== degree && (
                            <DetailItem><strong>설명:</strong> {detail}</DetailItem>
                          )}
                        </TimelineItem>
                      );
                    })}
                </TimelineContainer>
              </TimelineCard>
            )}
            
            {experiences.filter((exp) => exp.role === "경력").length > 0 && (
              <TimelineCard>
                <CardTitle>경력</CardTitle>
                <TimelineContainer>
                  {experiences
                    .filter((exp) => exp.role === "경력")
                    .map((exp) => {
                      // description에서 정보 분리
                      const parts = exp.description.split(' - ');
                      const position = parts[0] || ''; // 직책
                      const detail = parts[1] || ''; // 상세 업무
                      
                      return (
                        <TimelineItem key={exp.id}>
                          <Period>{exp.period}</Period>
                          <Organization>{exp.organization}</Organization>
                          {position && position !== '없음' && (
                            <DetailItem><strong>직책:</strong> {position}</DetailItem>
                          )}
                          {detail && detail !== '없음' && detail !== position && (
                            <DetailItem><strong>업무:</strong> {detail}</DetailItem>
                          )}
                        </TimelineItem>
                      );
                    })}
                </TimelineContainer>
              </TimelineCard>
            )}
          </RightSection>
        </ExperienceLayout>
      </ExperienceContentContainer>
    </ContentArea>
  );
};

export default ExperienceSection;