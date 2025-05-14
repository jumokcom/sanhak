import React from "react";
import styled, { createGlobalStyle } from "styled-components";

const Header = () => {
  const HeaderContainer = styled.header`
    height: 160px;
    background-color: #1a202c;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `;

  const Title = styled.h1`
    color: white;
    font-size: 3rem;
    font-weight: bold;
    margin-left: 200px;
  `;

  const RightContainer = styled.div`
    display: flex;
    gap: 20px;
    margin-right: 200px;
  `;

  const UserName = styled.div`
    color: white;
  `;

  const LoginButton = styled.button``;

  return (
    <HeaderContainer>
      <Title>포트폴리오 관리</Title>
      <RightContainer>
        <UserName>guest</UserName>
        <LoginButton>로그인</LoginButton>
      </RightContainer>
    </HeaderContainer>
  );
};

export default Header;
