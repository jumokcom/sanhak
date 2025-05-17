import React from "react";
import styled from "styled-components";
import { ContentArea, ContentContainer } from "./CommonStyles";

// 프로필 섹션 스타일 (첫 번째 섹션)
const ProfileSectionContainer = styled(ContentArea)`
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

interface ProfileSectionProps {
  profile: {
    name: string;
    affiliation: string;
    position: string;
    email: string;
    phone: string;
    github: string;
    image: string;
  };
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ profile }) => {
  return (
    <ProfileSectionContainer>
      <ContentContainer>
        <ProfileContainer>
          <ProfileImage>
            {profile.image ? (
              <Image src={profile.image} alt={profile.name} />
            ) : (
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="#A0AEC0"/>
                <path d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z" fill="#A0AEC0"/>
              </svg>
            )}
          </ProfileImage>
          <ProfileInfo>
            <Name>{profile.name}</Name>
            <Affiliation>{profile.affiliation}</Affiliation>
            <Affiliation>{profile.position}</Affiliation>
            <ContactInfo>
              <ContactItem>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 8L10.8906 13.2604C11.5624 13.7083 12.4376 13.7083 13.1094 13.2604L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z" stroke="#4A5568" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {profile.email}
              </ContactItem>
              <ContactItem>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 5C3 3.89543 3.89543 3 5 3H8.27924C8.70967 3 9.09181 3.27543 9.22792 3.68377L10.7257 8.17721C10.8831 8.64932 10.6694 9.16531 10.2243 9.38787L7.96701 10.5165C9.06925 12.9612 11.0388 14.9308 13.4835 16.033L14.6121 13.7757C14.8347 13.3306 15.3507 13.1169 15.8228 13.2743L20.3162 14.7721C20.7246 14.9082 21 15.2903 21 15.7208V19C21 20.1046 20.1046 21 19 21H18C9.71573 21 3 14.2843 3 6V5Z" stroke="#4A5568" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {profile.phone}
              </ContactItem>
              <ContactItem>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5229 6.47715 22 12 22C17.5229 22 22 17.5229 22 12C22 6.47715 17.5229 2 12 2Z" stroke="#4A5568" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 12L11 15L16 10" stroke="#4A5568" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {profile.github}
              </ContactItem>
            </ContactInfo>
          </ProfileInfo>
        </ProfileContainer>
      </ContentContainer>
    </ProfileSectionContainer>
  );
};

export default ProfileSection;
