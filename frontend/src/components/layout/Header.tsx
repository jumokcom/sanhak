import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderContainer = styled.header`
  background-color: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: #2d3748;
  text-decoration: none;
  
  &:hover {
    color: #667eea;
  }
`;

const ProfileButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: white;
  border: 2px solid #667eea;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #f8fafc;
  }
  
  .profile-image {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
  }
  
  .profile-name {
    font-weight: 500;
    color: #2d3748;
  }
`;

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <Nav>
        <Logo to="/">산학협력</Logo>
        <ProfileButton>
          <img 
            src="/default-profile.png" 
            alt="프로필" 
            className="profile-image"
          />
          <span className="profile-name">내 프로필</span>
        </ProfileButton>
      </Nav>
    </HeaderContainer>
  );
};

export default Header; 